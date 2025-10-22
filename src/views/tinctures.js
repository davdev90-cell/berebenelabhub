export async function Tinctures(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Tinture (w/v)</h3>
    <div class="grid g3">
      <label>Botanico (g)<br><input id="ti_g" type="number" value="10"></label>
      <label>ABV solvente %<br><input id="ti_abv" type="number" value="95"></label>
      <label>Target % w/v (es. 5)<br><input id="ti_pct" type="number" value="5"></label>
    </div>
    <div style="margin-top:8px"><button id="ti_calc">Calcola</button></div>
    <p id="ti_out" class="muted"></p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">Diluizione tintura</h3>
    <div class="grid g3">
      <label>Stock (% w/v)<br><input id="td_stock" type="number" value="10"></label>
      <label>Target (% w/v)<br><input id="td_target" type="number" value="2"></label>
      <label>Volume finale (ml)<br><input id="td_vol" type="number" value="100"></label>
    </div>
    <div style="margin-top:8px"><button id="td_calc">Calcola</button></div>
    <p id="td_out" class="muted"></p>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#ti_calc').addEventListener('click',()=>{ const g=parseFloat($('#ti_g').value||0), pct=parseFloat($('#ti_pct').value||0)/100; const vol = (g/pct); $('#ti_out').textContent=`Per ${g} g al ${pct*100}% w/v: porta a ~${vol.toFixed(0)} ml con solvente (ABV come desiderato).`; });
$('#td_calc').addEventListener('click',()=>{ const stock=parseFloat($('#td_stock').value||0)/100, target=parseFloat($('#td_target').value||0)/100, vol=parseFloat($('#td_vol').value||0); if(target<=0||stock<=0){ $('#td_out').textContent='Valori non validi.'; return;} const v_stock = vol * (target/stock); const v_dil = vol - v_stock; $('#td_out').textContent=`Usa ${v_stock.toFixed(0)} ml di stock + ${v_dil.toFixed(0)} ml diluente.`; });
return d; }