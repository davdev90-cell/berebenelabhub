export async function BatchCost(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">Costo batch (opzionale)</h3>
    <div id="rows" class="grid g3"></div>
    <div class="grid g3" style="margin-top:10px"><label>Volume finale (ml)<br><input id="bc_vol" type="number" value="1000"></label><label>IVA %<br><input id="bc_vat" type="number" value="22"></label><label>Markup %<br><input id="bc_mu" type="number" value="300"></label></div>
    <div style="margin-top:8px"><button id="bc_calc">Calcola</button></div>
    <p id="bc_out" class="muted"></p>
  </div>
</div>`; const $=s=>d.querySelector(s);
const rows=$('#rows'); for(let i=0;i<6;i++){ const el=document.createElement('div'); el.innerHTML=`<label>Ingrediente ${i+1} (costo €/u)<br><input class="bc_cost" type="number" step="0.01" value="0"></label><label>Quantità (u)<br><input class="bc_qty" type="number" step="0.01" value="0"></label><label>Note<br><input></label>`; rows.appendChild(el); }
$('#bc_calc').addEventListener('click',()=>{ const costs=[...d.querySelectorAll('.bc_cost')].map(x=>parseFloat(x.value||0)); const qtys=[...d.querySelectorAll('.bc_qty')].map(x=>parseFloat(x.value||0)); const tot=costs.reduce((s,c,i)=>s+c*qtys[i],0); const vol=parseFloat($('#bc_vol').value||0); const mu=parseFloat($('#bc_mu').value||0)/100; const vat=parseFloat($('#bc_vat').value||0)/100; const costPerMl=vol? tot/vol : 0; const priceNet = costPerMl*(1+mu); const priceIva = priceNet*(1+vat); $('#bc_out').textContent=`Costo batch: € ${tot.toFixed(2)} · Costo/ml: € ${costPerMl.toFixed(4)} · Prezzo netto/ml: € ${priceNet.toFixed(4)} · IVA incl.: € ${priceIva.toFixed(4)}`; });
return d; }