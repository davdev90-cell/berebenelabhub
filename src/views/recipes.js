import { db } from '../db.js'; export async function Recipes(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Nuova ricetta</h3>
    <div class="grid g3"><label>Nome<br><input id="r_name"></label><label>Tag<br><input id="r_tags" placeholder="sour, signature"></label><label>ABV % (opz.)<br><input id="r_abv" type="number"></label></div>
    <label>Ingredienti (uno per riga)<br><textarea id="r_ing" rows="6" placeholder="50 ml Gin\n25 ml Vermouth Dry\n10 ml Sciroppo 2:1"></textarea></label>
    <label>Procedura<br><textarea id="r_steps" rows="5" placeholder="Stir con ghiaccio, filtra in coppetta..."></textarea></label>
    <div style="margin-top:8px"><button id="r_save">Salva</button></div><p id="r_out" class="muted"></p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">Ricettario</h3><input id="f_q" placeholder="Cerca..."/><div id="list" style="margin-top:8px"></div></div>
</div>`; const $=s=>d.querySelector(s);
async function load(){ const q=($('#f_q').value||'').toLowerCase(); const rows=await db.recipes.toArray(); const view=rows.filter(r=>!q || r.name.toLowerCase().includes(q) || (r.tags||'').toLowerCase().includes(q)); $('#list').innerHTML=view.map(r=>`<div class="card" style="margin-bottom:8px"><b>${r.name}</b> <span class="muted">[${r.tags||''}]</span><br/><small>${(r.ing||'').split('\n').slice(0,3).join(' · ')}...</small></div>`).join('') || '<p class="muted">Nessuna ricetta.</p>'; }
$('#r_save').addEventListener('click', async ()=>{ const rec={ name:$('#r_name').value.trim(), tags:$('#r_tags').value.trim(), abv:$('#r_abv').value||null, ing:$('#r_ing').value, steps:$('#r_steps').value }; if(!rec.name){ $('#r_out').textContent='Inserisci un nome.'; return; } await db.recipes.add(rec); $('#r_out').textContent='Salvata!'; $('#r_name').value=''; $('#r_tags').value=''; $('#r_abv').value=''; $('#r_ing').value=''; $('#r_steps').value=''; load(); });
$('#f_q').addEventListener('input', load); load(); return d; }