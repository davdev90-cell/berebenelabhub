
(function(){
  // Tabs
  const tabs = document.querySelectorAll('.tab');
  const panels = {
    abv: document.getElementById('tab-abv'),
    target: document.getElementById('tab-target'),
    batch: document.getElementById('tab-batch'),
    cost: document.getElementById('tab-cost'),
    ice: document.getElementById('tab-ice'),
    brix: document.getElementById('tab-brix'),
    recipes: document.getElementById('tab-recipes'),
  };
  tabs.forEach(btn=>btn.addEventListener('click',()=>{
    tabs.forEach(b=>b.classList.remove('active'));
    Object.values(panels).forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    const key = btn.dataset.tab;
    panels[key].classList.add('active');
  }));

  const num = (v)=> Number.parseFloat(v);
  const fmt = (n, d=2)=> (Number.isFinite(n) ? n.toFixed(d) : '–');
  const setOut = (id, html)=> document.getElementById(id).innerHTML = html;

  // ABV Dilution
  const abvCalc = ()=>{
    const Vi = num(document.getElementById('abv_vi').value);
    const Ai = num(document.getElementById('abv_ai').value);
    const At = num(document.getElementById('abv_at').value);
    if (!Vi || !Ai || !At) { setOut('abv_out', 'Inserisci tutti i valori.'); return; }
    if (At <= 0 || Ai <= 0) { setOut('abv_out', 'ABV deve essere > 0.'); return; }
    if (At >= Ai) { setOut('abv_out', 'Formula valida solo per diluizioni (Target < Initial).'); return; }
    const waterToAdd = Vi * (Ai/At - 1);
    const finalVol = Vi + waterToAdd;
    setOut('abv_out', `Acqua da aggiungere: <strong>${fmt(waterToAdd,1)} mL</strong><br/>Volume finale: <strong>${fmt(finalVol,1)} mL</strong>`);
  };
  document.getElementById('abv_calc').addEventListener('click', abvCalc);
  document.getElementById('abv_reset').addEventListener('click', ()=>{
    ['abv_vi','abv_ai','abv_at'].forEach(id=>document.getElementById(id).value='');
    setOut('abv_out','');
  });

  // Target ABV (blend)
  const tCalc = ()=>{
    const Va = num(document.getElementById('t_va').value);
    const Aa = num(document.getElementById('t_aa').value);
    const Vb = num(document.getElementById('t_vb').value);
    const Ab = num(document.getElementById('t_ab').value);
    if (!Va || !Aa || !Vb || (!Number.isFinite(Ab) && Ab!==0)) { setOut('t_out', 'Inserisci tutti i valori.'); return; }
    const pure = Va*(Aa/100) + Vb*(Ab/100);
    const Vt = Va + Vb;
    const At = (pure / Vt) * 100;
    setOut('t_out', `ABV finale: <strong>${fmt(At,2)} %</strong> — Volume totale: <strong>${fmt(Vt,1)} mL</strong>`);
  };
  document.getElementById('t_calc').addEventListener('click', tCalc);
  document.getElementById('t_reset').addEventListener('click', ()=>{
    ['t_va','t_aa','t_vb','t_ab'].forEach(id=>document.getElementById(id).value='');
    setOut('t_out','');
  });

  // Batching
  const bCalc = ()=>{
    const total = num(document.getElementById('b_total').value);
    const bottle = num(document.getElementById('b_bottle').value);
    const loss = num(document.getElementById('b_loss').value) || 0;
    if (!total || !bottle) { setOut('b_out','Inserisci batch e formato bottiglia.'); return; }
    const usable = total * (1 - loss/100);
    const bottles = Math.floor(usable / bottle);
    const remainder = usable - bottles*bottle;
    setOut('b_out', `Utilizzabile: <strong>${fmt(usable,0)} mL</strong><br/>Bottiglie piene: <strong>${bottles}</strong><br/>Resto: <strong>${fmt(remainder,0)} mL</strong>`);
  };
  document.getElementById('b_calc').addEventListener('click', bCalc);
  document.getElementById('b_reset').addEventListener('click', ()=>{
    ['b_total','b_bottle','b_loss'].forEach(id=>document.getElementById(id).value='');
    setOut('b_out','');
  });

  // Cost per Drink
  const cCalc = ()=>{
    const price = num(document.getElementById('c_price').value);
    const vol = num(document.getElementById('c_volume').value);
    const pour = num(document.getElementById('c_pour').value);
    const other = num(document.getElementById('c_other').value) || 0;
    if (!price || !vol || !pour) { setOut('c_out','Inserisci costo, volume e dose.'); return; }
    const perMl = price / vol;
    const cost = perMl * pour + other;
    const servings = Math.floor(vol / pour);
    setOut('c_out', `Costo ingredienti per drink: <strong>€ ${fmt(cost,2)}</strong><br/>Porzioni per bottiglia: <strong>${servings}</strong>`);
  };
  document.getElementById('c_calc').addEventListener('click', cCalc);
  document.getElementById('c_reset').addEventListener('click', ()=>{
    ['c_price','c_volume','c_pour','c_other'].forEach(id=>document.getElementById(id).value='');
    setOut('c_out','');
  });

  // Ice Dilution (ABV balance)
  const iCalc = ()=>{
    const Ai = num(document.getElementById('i_ai').value);
    const At = num(document.getElementById('i_at').value);
    const Vi = num(document.getElementById('i_vi').value);
    if (!Ai || !At || !Vi) { setOut('i_out','Inserisci ABV iniziale, target e volume.'); return; }
    if (At >= Ai) { setOut('i_out','Target deve essere < ABV iniziale.'); return; }
    // Find water x such that (Ai% of Vi) = (At% of (Vi + x))
    const pure = Vi * (Ai/100);
    const Vf = pure / (At/100);
    const water = Vf - Vi;
    setOut('i_out', `Acqua (diluizione media): <strong>${fmt(water,1)} mL</strong><br/>Volume finale stimato: <strong>${fmt(Vf,1)} mL</strong>`);
  };
  document.getElementById('i_calc').addEventListener('click', iCalc);
  document.getElementById('i_reset').addEventListener('click', ()=>{
    ['i_ai','i_at','i_vi'].forEach(id=>document.getElementById(id).value='');
    setOut('i_out','');
  });

  // Brix
  const brixCalc = ()=>{
    const bx = num(document.getElementById('bx_target').value);
    const waterMl = num(document.getElementById('bx_water').value);
    if (!bx || !waterMl) { setOut('bx_out', 'Inserisci Target Brix e Volume acqua.'); return; }
    if (bx <= 0 || bx >= 85) { setOut('bx_out', 'Target Brix deve essere tra 1 e 84%.'); return; }
    const sugarG = (bx * waterMl) / (100 - bx);
    const finalMl = waterMl + sugarG;
    setOut('bx_out', `Zucchero da aggiungere: <strong>${fmt(sugarG,1)} g</strong><br/>Volume finale stimato: <strong>${fmt(finalMl,1)} mL</strong>`);
  };
  document.getElementById('bx_calc').addEventListener('click', brixCalc);
  document.getElementById('bx_reset').addEventListener('click', ()=>{
    ['bx_target','bx_water'].forEach(id=>document.getElementById(id).value='');
    setOut('bx_out','');
  });

  // Recipes
  const grid = document.getElementById('r_grid');
  const search = document.getElementById('r_search');
  const spirit = document.getElementById('r_spirit');
  let recipes = [];
  let filtered = [];

  function card(r){
    const ing = r.ingredients.map(i=>`${i.qty?i.qty+' ':''}${i.item}`).join(', ');
    return `<div class="recipe-card">
      <h3>${r.name}</h3>
      <div class="small">${r.category || ''} ${r.iba ? '<span class="badge">IBA</span>':''}</div>
      <div class="details"><strong>Bicchiere:</strong> ${r.glass || '—'}</div>
      <div class="details"><strong>Ingredienti:</strong> ${ing}</div>
      <div class="details"><strong>Metodo:</strong> ${r.method || '—'}</div>
      ${r.garnish?`<div class="details"><strong>Garnish:</strong> ${r.garnish}</div>`:''}
      ${r.note?`<div class="details small">${r.note}</div>`:''}
    </div>`;
  }
  function render(){
    grid.innerHTML = filtered.map(card).join('');
  }
  function applyFilter(){
    const q = (search.value || '').toLowerCase();
    const s = spirit.value;
    filtered = recipes.filter(r=>{
      const matchQ = !q || r.name.toLowerCase().includes(q) || r.ingredients.some(i=>i.item.toLowerCase().includes(q));
      const matchS = !s || (r.base && r.base.includes(s));
      return matchQ && matchS;
    });
    render();
  }

  fetch('data/cocktails.json')
    .then(r=>r.json())
    .then(data=>{
      recipes = data;
      filtered = recipes.slice(0, 100);
      render();
    });

  search.addEventListener('input', applyFilter);
  spirit.addEventListener('change', applyFilter);
})();
