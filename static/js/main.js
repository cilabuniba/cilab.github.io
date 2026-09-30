(()=>{
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Mobile navigation */
const toggle=document.querySelector('.nav-toggle'),nav=document.querySelector('.site-nav');
if(toggle&&nav){
  const set=o=>{nav.classList.toggle('open',o);toggle.classList.toggle('open',o);toggle.setAttribute('aria-expanded',String(o));};
  toggle.addEventListener('click',()=>set(!nav.classList.contains('open')));
  addEventListener('keydown',e=>{if(e.key==='Escape')set(false);});
}

/* Theme toggle (light by default, choice remembered) */
const tt=document.querySelector('.theme-toggle');
if(tt){tt.addEventListener('click',()=>{const r=document.documentElement,d=r.getAttribute('data-theme')!=='dark';
  if(d)r.setAttribute('data-theme','dark');else r.removeAttribute('data-theme');
  try{localStorage.setItem('theme',d?'dark':'light');}catch(e){}});}

/* Header elevation on scroll */
const header=document.querySelector('.site-header');
if(header){const f=()=>header.classList.toggle('scrolled',scrollY>8);f();addEventListener('scroll',f,{passive:true});}

/* Reveal on scroll */
const items=document.querySelectorAll('[data-reveal]');
if('IntersectionObserver' in window&&!reduce){
  document.documentElement.classList.add('reveal-on');
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{rootMargin:'0px 0px -8% 0px'});
  items.forEach((el,i)=>{el.style.setProperty('--d',(i%3)*70+'ms');io.observe(el);});
}

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

/* Hero: lightweight animated neural network */
const cv=document.querySelector('.hero-net');
if(cv){
  const ctx=cv.getContext('2d');let W,H,pts=[],raf,vis=true;
  const mouse={x:-999,y:-999};
  const size=()=>{const r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
    const n=Math.round(Math.min(70,Math.max(22,W*H/16000)));
    pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()*1.6+1}));};
  const draw=()=>{
    ctx.clearRect(0,0,W,H);
    for(const p of pts){if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;}}
    const L=130;
    for(let i=0;i<pts.length;i++){const a=pts[i];
      for(let j=i+1;j<pts.length;j++){const b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=dx*dx+dy*dy;
        if(d<L*L){ctx.strokeStyle='rgba(140,220,255,'+(.22*(1-Math.sqrt(d)/L))+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
      const mx=a.x-mouse.x,my=a.y-mouse.y,md=mx*mx+my*my;
      if(md<170*170){ctx.strokeStyle='rgba(80,235,205,'+(.5*(1-Math.sqrt(md)/170))+')';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();}
      ctx.fillStyle='rgba(190,235,255,.75)';ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,7);ctx.fill();}
    if(!reduce&&vis)raf=requestAnimationFrame(draw);
  };
  size();draw();
  addEventListener('resize',()=>{size();if(reduce)draw();});
  const hero=cv.parentElement;
  hero.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
  hero.addEventListener('pointerleave',()=>{mouse.x=mouse.y=-999;});
  if('IntersectionObserver' in window&&!reduce)new IntersectionObserver(([e])=>{vis=e.isIntersecting;cancelAnimationFrame(raf);if(vis)draw();}).observe(hero);
}
})();
