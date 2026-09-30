(()=>{
/* Mobile navigation */
const toggle=document.querySelector('.nav-toggle'),nav=document.querySelector('.site-nav');
if(toggle&&nav){
  const set=o=>{nav.classList.toggle('open',o);toggle.classList.toggle('open',o);toggle.setAttribute('aria-expanded',String(o));};
  toggle.addEventListener('click',()=>set(!nav.classList.contains('open')));
  addEventListener('keydown',e=>{if(e.key==='Escape')set(false);});
}

/* Theme toggle: light by default, choice remembered */
const tt=document.querySelector('.theme-toggle');
if(tt){tt.addEventListener('click',()=>{const r=document.documentElement,d=r.getAttribute('data-theme')!=='dark';
  if(d)r.setAttribute('data-theme','dark');else r.removeAttribute('data-theme');
  try{localStorage.setItem('theme',d?'dark':'light');}catch(e){}});}

/* Publications: search + year filter */
const bar=document.querySelector('.pub-toolbar');
if(bar){
  bar.hidden=false;
  const cards=[...document.querySelectorAll('.pub-card')],input=bar.querySelector('#pub-search'),
    chips=[...bar.querySelectorAll('.filter-chip')],count=bar.querySelector('.pub-count'),
    empty=document.querySelector('.pub-empty'),groups=[...document.querySelectorAll('.pub-group')];
  let year='';
  const apply=()=>{
    const q=input.value.trim().toLowerCase();let n=0;
    cards.forEach(c=>{const ok=(!year||c.dataset.year===year)&&(!q||c.dataset.search.includes(q));c.hidden=!ok;if(ok)n++;});
    groups.forEach(g=>g.hidden=!g.querySelector('.pub-card:not([hidden])'));
    empty.hidden=n>0;
    count.textContent=(q||year)?n+' of '+cards.length+' publications':'';
  };
  input.addEventListener('input',apply);
  chips.forEach(b=>b.addEventListener('click',()=>{year=b.dataset.year;chips.forEach(x=>x.classList.toggle('is-on',x===b));apply();}));
}
})();
