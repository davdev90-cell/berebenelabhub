export async function Bitters(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Pianificatore Bitters</h3>
    <div class="grid g3">
      <label>Alcol base %ABV<br><input id="b_abv" type="number" value="95"></label>
      <label>Alcol base (ml)<br><input id="b_vol" type="number" value="500"></label>
      <label>Botanici (g)<br><input id="b_bot" type="number" value="50"></label>
      <label>Acqua finale (ml)<br><input id="b_water" type="number" value="250"></label>
      <label>Giorni<br><input id="b_days" type="number" value="7"></label>
      <label>Note<br><input id="b_note"></label>
    </div>
    <div style="margin-top:8px"><button id="b_calc">Calcola</button></div>
    <p id="b_out" class="muted"></p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">Timer</h3>
    <div class="grid g3"><label>Minuti<br><input id="t_min" type="number" value="10"></label><label>Secondi<br><input id="t_sec" type="number" value="0"></label></div>
    <div style="margin-top:8px"><button id="t_start">Avvia</button> <button id="t_stop">Stop</button></div>
    <h2 id="t_disp" style="margin:8px 0">00:00</h2>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#b_calc').addEventListener('click',()=>{ const abv=parseFloat($('#b_abv').value||0)/100, vol=parseFloat($('#b_vol').value||0), water=parseFloat($('#b_water').value||0); const pure=vol*abv, tot=vol+water; const abvF=(pure/tot)*100; $('#b_out').textContent=`Finale ~${tot} ml | ABV ≈ ${abvF.toFixed(1)}% | Filtra dopo ${$('#b_days').value} giorni.`; });
let timer=null,remain=0; const disp=$('#t_disp'); function render(){ const m=Math.floor(remain/60),s=remain%60; disp.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
$('#t_start').addEventListener('click',()=>{ remain=parseInt($('#t_min').value||0)*60+parseInt($('#t_sec').value||0); if(timer) clearInterval(timer); timer=setInterval(()=>{ remain--; render(); if(remain<=0){ clearInterval(timer); alert('Tempo!'); } },1000); render(); });
$('#t_stop').addEventListener('click',()=>{ if(timer) clearInterval(timer); });
render(); return d; }