export async function Infusions(){ const d=document.createElement('div'); d.innerHTML=`
<div class="card"><h3 style="margin:0 0 8px 0">Planner infusioni</h3>
<div class="grid g3"><label>Base (es. Gin 40%)<br><input id="i_base"></label><label>Volume (ml)<br><input id="i_vol" type="number" value="700"></label><label>Ingredienti (g)<br><input id="i_ing" type="number" value="50"></label><label>Giorni<br><input id="i_days" type="number" value="3"></label><label>Note<br><input id="i_note"></label></div>
<div style="margin-top:8px"><button id="i_start">Crea promemoria locale</button></div>
<p id="i_out" class="muted"></p></div>`; const $=s=>d.querySelector(s);
$('#i_start').addEventListener('click',()=>{ const days=parseInt($('#i_days').value||0); const when=new Date(Date.now()+days*24*3600*1000); $('#i_out').textContent=`Segna: filtrare il ${when.toLocaleString('it-IT')}.`; });
return d; }