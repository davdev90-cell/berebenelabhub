export async function SuperJuice(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Super Juice (estrazione da zeste + acidi)</h3>
    <div class="grid g3">
      <label>Zeste (g)<br><input id="sj_peel" type="number" value="100"></label>
      <label>Acido citrico (g)<br><input id="sj_cit" type="number" value="20"></label>
      <label>Acido malico (g)<br><input id="sj_mal" type="number" value="10"></label>
      <label>Acqua (ml)<br><input id="sj_water" type="number" value="500"></label>
      <label>Zucchero opz. (g)<br><input id="sj_sugar" type="number" value="0"></label>
    </div>
    <div style="margin-top:8px"><button id="sj_calc">Stima resa</button></div>
    <p id="sj_out" class="muted"></p>
    <p class="muted">Metodo: frulla zeste con acidi + parte dell’acqua; macera 30–60 min; filtra; aggiungi acqua restante e zucchero (se desideri); regola acidità/dolcezza.</p>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#sj_calc').addEventListener('click',()=>{ const peel=parseFloat($('#sj_peel').value||0), water=parseFloat($('#sj_water').value||0), sugar=parseFloat($('#sj_sugar').value||0); const yieldEst = water + peel*0.3; const brixEst = sugar? (sugar / yieldEst * 100) : 0; $('#sj_out').textContent=`Resa stimata: ~${yieldEst.toFixed(0)} ml. Dolcezza stimata: ${brixEst.toFixed(1)}°Bx (se aggiungi ${sugar} g zucchero).`; });
return d; }