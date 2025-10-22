import { Dashboard } from './views/dashboard.js';
import { Syrups } from './views/syrups.js';
import { Liqueurs } from './views/liqueurs.js';
import { Bitters } from './views/bitters.js';
import { Infusions } from './views/infusions.js';
import { ABVTools } from './views/abv.js';
import { Acids } from './views/acids.js';
import { Carbonation } from './views/carbonation.js';
import { Conversions } from './views/conversions.js';
import { Recipes } from './views/recipes.js';
import { Oleo } from './views/oleo.js';
import { Cordial } from './views/cordial.js';
import { SuperJuice } from './views/superjuice.js';
import { Brix } from './views/brix.js';
import { Tinctures } from './views/tinctures.js';
import { BatchCost } from './views/batchcost.js';

const routes={'#/':Dashboard,'#/syrups':Syrups,'#/liqueurs':Liqueurs,'#/bitters':Bitters,'#/infusions':Infusions,'#/abv':ABVTools,'#/acids':Acids,'#/carb':Carbonation,'#/conv':Conversions,'#/recipes':Recipes,'#/oleo':Oleo,'#/cordial':Cordial,'#/superjuice':SuperJuice,'#/brix':Brix,'#/tinctures':Tinctures,'#/batchcost':BatchCost};

const navItems=[
  {href:'#/',label:'🏠 Dashboard'},
  {href:'#/syrups',label:'🍯 Sciroppi'},
  {href:'#/oleo',label:'🍋 Oleo‑saccharum'},
  {href:'#/cordial',label:'🍊 Cordiali'},
  {href:'#/superjuice',label:'🧪 Super Juice'},
  {href:'#/liqueurs',label:'🥃 Liquori HM'},
  {href:'#/bitters',label:'🌿 Bitters'},
  {href:'#/infusions',label:'🧉 Infusioni'},
  {href:'#/abv',label:'📏 ABV & Batch'},
  {href:'#/acids',label:'🍋 Acidi/Saline'},
  {href:'#/brix',label:'📈 Brix/Densità'},
  {href:'#/carb',label:'🫧 Carbonazione'},
  {href:'#/conv',label:'🔁 Conversioni'},
  {href:'#/tinctures',label:'🌱 Tinture'},
  {href:'#/batchcost',label:'💶 Costo batch'},
  {href:'#/recipes',label:'📚 Ricettario'}
];
function renderNav(){ const nav=document.getElementById('nav'); nav.innerHTML=navItems.map(i=>`<a href="${i.href}" data-href="${i.href}">${i.label}</a>`).join('');
  const setActive=()=>{ const cur=location.hash||'#/'; nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('data-href')===cur)); };
  window.addEventListener('hashchange',setActive); setActive(); }
renderNav();
async function mount(){ const app=document.getElementById('app'); const key=location.hash||'#/'; const View=routes[key]||Dashboard; const el=await View(); app.innerHTML=''; app.appendChild(el); }
window.addEventListener('hashchange',mount); mount();