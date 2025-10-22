export async function Carbonation(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Sciroppo per soda</h3>
    <div class="grid g3"><label>Dolcezza target g/L<br><input id="c_gL" type="number" value="80"></label><label>Volume finale L<br><input id="c_L" type="number" value="1"></label><label>Base succo %<br><input id="c_base" type="number" value="10"></label></div>
    <div style="margin-top:8px"><button id="c_calc">Calcola</button></div><p id="c_out" class="muted"></p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">CO₂ forzata (indicativa)</h3>
    <table><thead><tr><th>T °C</th><th>2.0 vol</th><th>2.4 vol</th><th>2.8 vol</th></tr></thead><tbody>
      <tr><td>0–2</td><td>~6 psi</td><td>~10 psi</td><td>~14 psi</td></tr>
      <tr><td>3–5</td><td>~8 psi</td><td>~12 psi</td><td>~16 psi</td></tr>
      <tr><td>6–8</td><td>~10 psi</td><td>~14 psi</td><td>~18 psi</td></tr>
      <tr><td>9–12</td><td>~12 psi</td><td>~16 psi</td><td>~20 psi</td></tr>
    </tbody></table>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#c_calc').addEventListener('click',()=>{ const gL=parseFloat($('#c_gL').value||0), L=parseFloat($('#c_L').value||0), basePct=parseFloat($('#c_base').value||0)/100; const sugar=gL*L, baseVol=L*basePct*1000; $('#c_out').textContent=`Per ${L} L: zucchero ≈ ${sugar.toFixed(0)} g · base ≈ ${baseVol.toFixed(0)} ml · completa a volume e carbonare a freddo.`; });
return d; }