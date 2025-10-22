export async function Acids(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Soluzione SALINA</h3>
    <div class="grid g3"><label>% w/v<br><input id="s_pct" type="number" value="20"></label><label>Volume finale (ml)<br><input id="s_vol" type="number" value="100"></label><label>Sale<br><input id="s_type" placeholder="fino/kosher"></label></div>
    <div style="margin-top:8px"><button id="s_calc">Calcola</button></div><p id="s_out" class="muted"></p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">Soluzione acida (citrico/malico)</h3>
    <div class="grid g3"><label>Concentrazione totale %<br><input id="a_pct" type="number" value="10"></label><label>Citric %<br><input id="a_cit" type="number" value="70"></label><label>Malic %<br><input id="a_mal" type="number" value="30"></label><label>Volume (ml)<br><input id="a_vol" type="number" value="1000"></label></div>
    <div style="margin-top:8px"><button id="a_calc">Calcola</button></div><p id="a_out" class="muted"></p>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#s_calc').addEventListener('click',()=>{ const pct=parseFloat($('#s_pct').value||0)/100, vol=parseFloat($('#s_vol').value||0); const salt=vol*pct, water=vol - salt; $('#s_out').textContent=`${salt.toFixed(1)} g sale in ${water.toFixed(0)} ml acqua → ${vol} ml al ${(pct*100).toFixed(1)}%`; });
$('#a_calc').addEventListener('click',()=>{ const pct=parseFloat($('#a_pct').value||0)/100, cit=parseFloat($('#a_cit').value||0)/100, mal=parseFloat($('#a_mal').value||0)/100, vol=parseFloat($('#a_vol').value||0); if(Math.abs(cit+mal-1)>0.001){ $('#a_out').textContent='Citric% + Malic% devono fare 100.'; return;} const total=vol*pct, gCit=total*cit, gMal=total*mal, water=vol - total; $('#a_out').textContent=`${gCit.toFixed(1)} g citrico + ${gMal.toFixed(1)} g malico in ${water.toFixed(0)} ml acqua`; });
return d; }