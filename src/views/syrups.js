export async function Syrups(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Rapporto (1:1 / 2:1 / custom)</h3>
    <div class="grid g3">
      <label>Rapporto zucchero:acqua<br><input id="r_ratio" value="1:1"></label>
      <label>Volume finale (ml)<br><input id="r_vol" type="number" value="1000"></label>
      <label>Tipo zucchero<br><select id="r_type"><option>Saccarosio</option><option>Demerara</option><option>Fruttosio</option></select></label>
    </div>
    <div style="margin-top:8px"><button id="r_calc">Calcola</button></div>
    <p id="r_out" class="muted"></p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">Brix target</h3>
    <div class="grid g3">
      <label>Brix (°Bx)<br><input id="b_brix" type="number" step="0.1" value="50"></label>
      <label>Volume finale (ml)<br><input id="b_vol" type="number" value="1000"></label>
      <label>Perdite %<br><input id="b_loss" type="number" value="0"></label>
    </div>
    <div style="margin-top:8px"><button id="b_calc">Calcola</button></div>
    <p id="b_out" class="muted"></p>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#r_calc').addEventListener('click',()=>{ const ratio=($('#r_ratio').value||'1:1').split(':').map(Number); const vol=parseFloat($('#r_vol').value||0); if(ratio.length!==2||!ratio[0]||!ratio[1]||!vol){ $('#r_out').textContent='Valori non validi.'; return;} const parts=ratio[0]+ratio[1]; const sugar_ml=vol*(ratio[0]/parts); const water_ml=vol*(ratio[1]/parts); const sugar_g=sugar_ml*0.85; $('#r_out').textContent=`Per ~${vol} ml: zucchero ≈ ${sugar_g.toFixed(0)} g, acqua ≈ ${water_ml.toFixed(0)} ml.`; });
$('#b_calc').addEventListener('click',()=>{ const bx=parseFloat($('#b_brix').value||0), vol=parseFloat($('#b_vol').value||0), loss=parseFloat($('#b_loss').value||0); if(!bx||!vol){ $('#b_out').textContent='Inserisci Brix e volume.'; return;} const mass=vol, sugar=mass*(bx/100), water=vol - sugar, post=vol*(1-(loss/100)); $('#b_out').textContent=`${sugar.toFixed(0)} g zucchero + ${water.toFixed(0)} ml acqua → ${vol} ml @ ${bx}°Bx. Resa dopo perdite: ~${post.toFixed(0)} ml.`; });
return d; }