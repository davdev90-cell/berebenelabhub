export async function Liqueurs(){ const d=document.createElement('div'); d.innerHTML=`
<div class="card"><h3 style="margin:0 0 8px 0">Liquore home‑made — ABV e zucchero</h3>
<div class="grid g3">
  <label>Base %ABV<br><input id="l_abv" type="number" value="95"></label>
  <label>Base (ml)<br><input id="l_base" type="number" value="500"></label>
  <label>Acqua (ml)<br><input id="l_water" type="number" value="300"></label>
  <label>Sciroppo 1:1 (ml)<br><input id="l_s11" type="number" value="200"></label>
  <label>Sciroppo 2:1 (ml)<br><input id="l_s21" type="number" value="0"></label>
  <label>Zucchero extra (g)<br><input id="l_sugar" type="number" value="0"></label>
</div>
<div style="margin-top:8px"><button id="l_calc">Calcola</button></div>
<p id="l_out" class="muted"></p></div>`; const $=s=>d.querySelector(s);
$('#l_calc').addEventListener('click',()=>{ const abv=parseFloat($('#l_abv').value||0)/100, base=parseFloat($('#l_base').value||0), water=parseFloat($('#l_water').value||0), s11=parseFloat($('#l_s11').value||0), s21=parseFloat($('#l_s21').value||0), extra=parseFloat($('#l_sugar').value||0); const pure=base*abv; const sugar=s11*0.5*0.85 + s21*(2/3)*0.85 + extra; const vol=base+water+s11+s21; const abvF=(pure/vol)*100; const gL=(sugar/vol)*1000; $('#l_out').textContent=`Volume ~${vol.toFixed(0)} ml | ABV ≈ ${abvF.toFixed(1)}% | Zucchero ≈ ${gL.toFixed(0)} g/L`; });
return d; }