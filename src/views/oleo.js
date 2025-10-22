export async function Oleo(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Oleo‑saccharum (zeste + zucchero)</h3>
    <div class="grid g3">
      <label>Zeste (g)<br><input id="o_peel" type="number" value="100"></label>
      <label>Zucchero (rapporto g/g)<br><input id="o_ratio" type="number" value="1.5"></label>
      <label>Tempo macerazione (h)<br><input id="o_time" type="number" value="12"></label>
    </div>
    <div style="margin-top:8px"><button id="o_calc">Calcola</button></div>
    <p id="o_out" class="muted"></p>
    <p class="muted">Linee guida: Rapporto zucchero:peel 1:1–2:1; massaggia, copri, 6–24h; opzionale splash succo/alcool per aiutare estrazione; filtra finemente.</p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">Emulsione con succo (oleo‑cordial)</h3>
    <div class="grid g3">
      <label>Succo (ml)<br><input id="o_juice" type="number" value="200"></label>
      <label>Target °Bx<br><input id="o_brix" type="number" value="50"></label>
      <label>Acidità (cit:mal, % totale)<br><input id="o_acid" placeholder="70:30 @ 10%"></label>
    </div>
    <p class="muted">Aggiungi succo all’oleo in parti fino a raggiungere dolcezza/acidità desiderata, poi stabilizza a freddo.</p>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#o_calc').addEventListener('click',()=>{ const peel=parseFloat($('#o_peel').value||0), ratio=parseFloat($('#o_ratio').value||0), t=parseFloat($('#o_time').value||0); const sugar=peel*ratio; const yieldEst= Math.max(0, peel*0.6 + sugar*0.1); $('#o_out').textContent=`Usa ~${sugar.toFixed(0)} g zucchero. Resa stimata sciroppo: ~${yieldEst.toFixed(0)} ml (dipende da agrumi/tempo).`; });
return d; }