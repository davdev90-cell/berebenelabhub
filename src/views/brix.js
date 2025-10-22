export async function Brix(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Brix ↔ g zucchero</h3>
    <div class="grid g3"><label>°Brix<br><input id="bx_brix" type="number" step="0.1" value="50"></label><label>Volume (ml, densità ~1)<br><input id="bx_vol" type="number" value="1000"></label></div>
    <div style="margin-top:8px"><button id="bx_calc">Calcola</button></div><p id="bx_out" class="muted"></p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">Stima densità sciroppi</h3>
    <table><thead><tr><th>Soluzione</th><th>g/ml (approx)</th></tr></thead><tbody>
      <tr><td>Acqua</td><td>1.00</td></tr><tr><td>1:1</td><td>~1.15</td></tr><tr><td>2:1</td><td>~1.25</td></tr><tr><td>50°Bx</td><td>~1.23</td></tr>
    </tbody></table>
    <p class="muted">Nota: valori indicativi per calcoli bar, non per laboratorio.</p>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#bx_calc').addEventListener('click',()=>{ const bx=parseFloat($('#bx_brix').value||0), vol=parseFloat($('#bx_vol').value||0); const sugar=vol*(bx/100); const water=vol - sugar; $('#bx_out').textContent=`Zucchero ≈ ${sugar.toFixed(0)} g · Acqua ≈ ${water.toFixed(0)} ml (stima)`; });
return d; }