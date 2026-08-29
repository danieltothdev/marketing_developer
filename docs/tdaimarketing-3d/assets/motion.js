/* ============================================================
   TD-AI & Marketing — MOZGÁSRÉTEG (vezérlés)
   Technikák: HeyGen HyperFrames nyílt katalógus (Apache-2.0) receptjei
   alapján, saját implementációban. Minden hatás kikapcsol reduced motion mellett.
   ============================================================ */
(function(){
'use strict';
var d=document, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 0b. görgetősáv szélessége a teljes szélességű sávokhoz ---------- */
function sbw(){ d.documentElement.style.setProperty('--sbw',(innerWidth-d.documentElement.clientWidth)+'px'); }
sbw(); addEventListener('resize',sbw,{passive:true});

/* ---------- 0. vignetta + szemcse (ha még nincs) ---------- */
if(!d.getElementById('grain')){ var g=d.createElement('div'); g.id='grain2'; d.body.appendChild(g); }
if(!d.getElementById('vignette')){ var v=d.createElement('div'); v.id='vignette'; d.body.appendChild(v); }

/* ---------- 1. belépéskor induló hatások: outline draw, marker, szó-emelkedés ---------- */
function autoTag(){
  /* a kiemelt kártyák keretet rajzolnak */
  ['.cta-box','.compcard','.pcard.hot','.form-card','.tool','.audit'].forEach(function(sel){
    [].slice.call(d.querySelectorAll(sel)).forEach(function(el){ el.classList.add('draw'); });
  });
  /* az answer-first blokkok félkövér kiemelései kapnak kézzel húzott aláhúzást */
  [].slice.call(d.querySelectorAll('.answer b, .answer strong')).forEach(function(el){ el.classList.add('mark'); });
  /* kártyák kurzorfényt kapnak */
  [].slice.call(d.querySelectorAll('.card,.compcard,.quote,.pcard,.step,.rel a')).forEach(function(el){ el.classList.add('spot'); });
}
autoTag();

/* szavankénti emelkedés a fő címeken (a főoldali H1-et kihagyjuk, ott saját megoldás van) */
if(!reduce){
  [].slice.call(d.querySelectorAll('.phead h1, .sec h2, .cta-box h2')).forEach(function(h){
    if(h.dataset.split || h.closest('#h1')) return;
    h.dataset.split='1'; h.classList.add('wsplit');
    var i=0;
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          var frag=d.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(t){
            if(!t) return;
            if(/^\s+$/.test(t)){ frag.appendChild(d.createTextNode(t)); return; }
            var w=d.createElement('span'); w.className='w';
            var it=d.createElement('i'); it.textContent=t; it.style.setProperty('--i',i++);
            w.appendChild(it); frag.appendChild(w);
          });
          node.replaceChild(frag,n);
        } else if(n.nodeType===1 && !n.classList.contains('w')){ walk(n); }
      });
    })(h);
  });
}

/* egyetlen megfigyelő gyújtja meg a hatásokat */
var lit=[].slice.call(d.querySelectorAll('.draw,.mark,.wsplit'));
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('lit'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -8% 0px',threshold:.15});
  lit.forEach(function(el){ io.observe(el); });
} else { lit.forEach(function(el){ el.classList.add('lit'); }); }

/* ---------- 2. tracing beam: a lépéslisták mellett futó fénysáv ---------- */
var beams=[].slice.call(d.querySelectorAll('.steps,.q'));
beams.forEach(function(b){
  b.classList.add('beam');
  if(getComputedStyle(b).position==='static') b.style.position='relative';
  if(parseFloat(getComputedStyle(b).paddingLeft) < 24) b.style.paddingLeft='26px';
});
function beamTick(){
  beams.forEach(function(b){
    var r=b.getBoundingClientRect();
    var p=(innerHeight*0.75 - r.top)/(r.height||1)*100;
    b.style.setProperty('--bp', Math.max(0,Math.min(100,p)).toFixed(1));
  });
}
if(beams.length && !reduce){ addEventListener('scroll',beamTick,{passive:true}); addEventListener('resize',beamTick,{passive:true}); beamTick(); }

/* ---------- 3. spotlight kártyák ---------- */
if(!reduce && matchMedia('(hover:hover)').matches){
  d.addEventListener('pointermove',function(e){
    var c=e.target.closest && e.target.closest('.spot'); if(!c) return;
    var r=c.getBoundingClientRect();
    c.style.setProperty('--sx',((e.clientX-r.left)/r.width*100).toFixed(1)+'%');
    c.style.setProperty('--sy',((e.clientY-r.top)/r.height*100).toFixed(1)+'%');
  },{passive:true});
}

/* ---------- 4. press ripple a gombokon ---------- */
if(!reduce){
  d.addEventListener('pointerdown',function(e){
    var b=e.target.closest && e.target.closest('.btn,.btn-ghost'); if(!b) return;
    var r=b.getBoundingClientRect(), s=Math.max(r.width,r.height);
    var el=d.createElement('span'); el.className='ripple';
    el.style.width=el.style.height=s+'px';
    el.style.left=(e.clientX-r.left-s/2)+'px';
    el.style.top=(e.clientY-r.top-s/2)+'px';
    b.appendChild(el); setTimeout(function(){ el.remove(); },620);
  },{passive:true});
}

/* ---------- 5. perspektivikus marquee feltöltése ---------- */
[].slice.call(d.querySelectorAll('.mq-track[data-items]')).forEach(function(t){
  var items=t.dataset.items.split('|');
  var html=items.map(function(s){ return '<span class="mq-item">'+s+'</span>'; }).join('');
  t.innerHTML=html+html;   /* duplázva, hogy a ciklus varrat nélkül fusson */
});

/* ---------- 6. gyűrű-kitöltés API (önteszt, mini-audit) ---------- */
window.tdRing=function(el,pct){ if(el) el.style.setProperty('--ringp', Math.max(0,Math.min(100,pct))); };
})();
