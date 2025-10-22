export async function ABVTools(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">ABV cocktail / batch</h3>
    <p class="muted">Fino a 6 componenti con %ABV + diluizione shake/stir.</p>
    <div id="rows" class="grid g3"></div>
    <div class="grid g3" style="margin-top:10px"><label>Diluizione % (shake ~20)<br><input id="c_dil" type="number" value="20"></label><label>Output porzione (ml)<br><input id="c_out" type="number" value="120"></label></div>
    <div style="margin-top:8px"><button id="c_calc">Calcola</button></div>
    <p id="c_outp" class="muted"></p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">Blend alcol (taglio)</h3>
    <div class="grid g3"><label>A %ABV<br><input id="t_a" type="number" value="95"></label><label>Volume A (ml)<br><input id="t_va" type="number" value="500"></label><label>B %ABV<br><input id="t_b" type="number" value="0"></label><label>Volume B (ml)<br><input id="t_vb" type="number" value="500"></label></div>
    <div style="margin-top:8px"><button id="t_calc">Calcola</button></div>
    <p id="t_out" class="muted"></p>
  </div>
</div>`; const $=s=>d.querySelector(s);
const rows=$('#rows'); for(let i=0;i<6;i++){ const el=document.createElement('div'); el.innerHTML=`<label>Ingrediente ${i+1} (ml)<br><input class="v_ml" type="number" value="0"></label><label>%ABV<br><input class="v_abv" type="number" value="0"></label><label>Nome<br><input class="v_name" placeholder="Gin/Vermouth/Sciroppo"></label>`; rows.appendChild(el); }
$('#c_calc').addEventListener('click',()=>{ const mls=[...d.querySelectorAll('.v_ml')].map(x=>parseFloat(x.value||0)); const abvs=[...d.querySelectorAll('.v_abv')].map(x=>parseFloat(x.value||0)/100); const total=mls.reduce((s,v)=>s+v,0); const pure=mls.reduce((s,v,i)=>s+v*abvs[i],0); const dil=parseFloat($('#c_dil').value||0)/100; const final=total*(1+dil); const abv= final? (pure/final)*100 : 0; const per=parseFloat($('#c_out').value||0); const servings = per? (final/per) : 0; $('#c_outp').textContent=`Volume finale ~${final.toFixed(0)} ml | ABV ≈ ${abv.toFixed(1)}% | Porzioni ≈ ${servings.toFixed(1)}`; });
$('#t_calc').addEventListener('click',()=>{ const a=parseFloat($('#t_a').value||0)/100, va=parseFloat($('#t_va').value||0), b=parseFloat($('#t_b').value||0)/100, vb=parseFloat($('#t_vb').value||0); const pure=va*a+vb*b, tot=va+vb; const abv=tot? (pure/tot)*100:0; $('#t_out').textContent=`Blend finale ~${tot} ml | ABV ≈ ${abv.toFixed(1)}%`; });
return d; }