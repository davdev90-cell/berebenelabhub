export async function Conversions(){ const d=document.createElement('div'); d.innerHTML=`
<div class="grid g2">
  <div class="card"><h3 style="margin:0 0 8px 0">ml ↔ oz</h3>
    <div class="grid g3"><label>ml<br><input id="cv_ml" type="number" value="30"></label><label>oz<br><input id="cv_oz" type="number" value="1"></label></div>
    <div style="margin-top:8px"><button id="cv_mloz">ml → oz</button> <button id="cv_ozml">oz → ml</button></div><p id="cv_out" class="muted"></p>
  </div>
  <div class="card"><h3 style="margin:0 0 8px 0">Densità rapide (bar)</h3>
    <table><thead><tr><th>Liquido</th><th>g/ml</th></tr></thead><tbody>
      <tr><td>Acqua</td><td>1.00</td></tr><tr><td>Sciroppo 1:1</td><td>1.15</td></tr><tr><td>Sciroppo 2:1</td><td>1.25</td></tr><tr><td>Succo/Cordial</td><td>1.04</td></tr>
    </tbody></table>
  </div>
</div>`; const $=s=>d.querySelector(s);
$('#cv_mloz').addEventListener('click',()=>{ const ml=parseFloat($('#cv_ml').value||0); $('#cv_out').textContent=`${ml} ml ≈ ${(ml/29.5735).toFixed(2)} oz`; });
$('#cv_ozml').addEventListener('click',()=>{ const oz=parseFloat($('#cv_oz').value||0); $('#cv_out').textContent=`${oz} oz ≈ ${(oz*29.5735).toFixed(0)} ml`; });
return d; }