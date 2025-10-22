export async function Dashboard(){
  const d=document.createElement('div');
  d.innerHTML=`<div class="grid g2">
    <div class="card"><h3 style="margin:0 0 8px 0">Tutta la mixology in un’unica app</h3>
      <p class="muted">Sciroppi, oleo‑saccharum, cordiali e “super juice”, liquori home‑made, bitters, infusioni, ABV/batch, acidi/saline, Brix/densità, carbonazione, conversioni e ricettario.</p>
      <div class="grid g2">
        <a class="card" href="#/syrups">🍯 Sciroppi</a>
        <a class="card" href="#/oleo">🍋 Oleo‑saccharum</a>
        <a class="card" href="#/cordial">🍊 Cordiali</a>
        <a class="card" href="#/superjuice">🧪 Super Juice</a>
        <a class="card" href="#/abv">📏 ABV & Batch</a>
        <a class="card" href="#/acids">🍋 Acidi/Saline</a>
        <a class="card" href="#/brix">📈 Brix/Densità</a>
        <a class="card" href="#/recipes">📚 Ricettario</a>
      </div>
    </div>
    <div class="card"><h3 style="margin:0 0 8px 0">Note veloci</h3>
      <ul class="muted" style="line-height:1.7">
        <li>Shake ≈ <b>+20%</b> diluizione · Stir ≈ <b>+10%</b></li>
        <li>Sciroppo 1:1 ≈ <b>~50–57% zucchero</b> · 2:1 ≈ <b>~66–70%</b> (stima bar)</li>
        <li>Saline bar comune: <b>20% w/v</b> (20 g sale + acqua fino a 100 ml)</li>
      </ul>
    </div>
  </div>`;
  return d;
}