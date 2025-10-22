export async function Cordial(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Cordial agrumi (target dolcezza + acidità)</h3>
    <div class="grid g3">
      <label>Succo fresco (ml)<br><input id="c_j" type="number" value="500"></label>
      <label>Target °Bx (es. 50)<br><input id="c_bx" type="number" value="50"></label>
      <label>Blend acidi (cit % / mal % / totale % w/v)<br><input id="c_ac" placeholder="70 / 30 / 10"></label>
    </div>
    <div style="margin-top:8px"><button id="c_calc">Calcola</button></div>
    <p id="c_out" class="muted"></p>
    <p class="muted">Procedura tipica: zeste → oleo; aggiungi succo; sciogli zucchero fino al °Bx target; aggiungi acidi; filtra a 100–200µm; conserva freddo.</p>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#c_calc').addEventListener('click',()=>{ const j=parseFloat($('#c_j').value||0), bx=parseFloat($('#c_bx').value||0); const acidTxt=$('#c_ac').value||'70 / 30 / 10'; const m=acidTxt.split('/').map(x=>parseFloat(String(x).replace(/[^0-9.]/g,''))||0); const cit=m[0]||70, mal=m[1]||30, tot=m[2]||10; const sugarNeeded = j * (bx/100); const waterEstimate = j - sugarNeeded; const gCit = (j*tot/100)*(cit/100); const gMal = (j*tot/100)*(mal/100); $('#c_out').textContent=`Aggiungi ~${sugarNeeded.toFixed(0)} g zucchero; acidi: citrico ${gCit.toFixed(1)} g + malico ${gMal.toFixed(1)} g (totale ${(tot).toFixed(1)}% w/v). Completa a consistenza e filtra.`; });
return d; }