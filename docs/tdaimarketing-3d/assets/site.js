/* ============================================================
   TD-AI & Marketing — közös JS az aloldalakhoz
   fejléc, reveal, GYIK, űrlap, határidők, cookie/Consent Mode, GA4
   ============================================================ */
(function(){
'use strict';
var d=document, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
function track(ev,extra){ var o={event:ev}; if(extra) for(var k in extra) o[k]=extra[k]; dataLayer.push(o); }
window.tdTrack = track;

/* --- Consent Mode v2: alapból minden tiltva, amíg a látogató nem dönt --- */
try{
  var stored = localStorage.getItem('tdai_consent');
  gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',
    analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
  if(stored==='all'){
    gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
  }
}catch(e){}

/* --- cookie-sáv --- */
(function(){
  var bar=d.getElementById('cookiebar'); if(!bar) return;
  var choice=null; try{ choice=localStorage.getItem('tdai_consent'); }catch(e){}
  if(!choice) setTimeout(function(){ bar.classList.add('on'); }, 900);
  bar.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return;
    var v=b.dataset.c;
    try{ localStorage.setItem('tdai_consent',v); }catch(e){}
    if(v==='all') gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
    track('cookie_dontes',{dontes:v});
    bar.classList.remove('on');
  });
})();

/* --- fejléc árnyék --- */
var hdr=d.getElementById('hdr');
if(hdr) addEventListener('scroll',function(){ hdr.classList.toggle('stuck', (scrollY||0)>20); },{passive:true});

/* --- reveal --- */
var rvs=[].slice.call(d.querySelectorAll('.rv'));
if('IntersectionObserver' in window && !reduce){
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -10% 0px',threshold:.1});
  rvs.forEach(function(el){ io.observe(el); });
} else { rvs.forEach(function(el){ el.classList.add('in'); }); }

/* --- GYIK --- */
[].slice.call(d.querySelectorAll('.faq-item')).forEach(function(item){
  var b=item.querySelector('.faq-q'), a=item.querySelector('.faq-a');
  if(!b||!a) return;
  b.setAttribute('aria-expanded','false');
  b.addEventListener('click',function(){
    var open=item.classList.toggle('open');
    b.setAttribute('aria-expanded',open?'true':'false');
    a.style.maxHeight=open?(a.scrollHeight+40)+'px':'0px';
    if(open) track('gyik_nyit',{kerdes:b.textContent.trim().slice(0,60)});
  });
});

/* --- valós határidők a ribbonban --- */
(function(){
  var el=d.getElementById('cdNyugta'); if(!el) return;
  function upd(){
    var ms=new Date('2026-09-01T00:00:00+02:00')-new Date();
    el.textContent = ms<=0 ? 'lejárt (2026. 09. 01.)'
      : (ms>864e5 ? Math.floor(ms/864e5)+' nap' : Math.floor(ms/36e5)+' óra');
  }
  upd(); setInterval(upd,60000);
})();

/* --- CTA események --- */
[].slice.call(d.querySelectorAll('[data-cta]')).forEach(function(el){
  el.addEventListener('click',function(){ track('cta_kattintas',{hely:el.dataset.cta, oldal:location.pathname}); });
});

/* --- görgetési mélység --- */
(function(){
  var marks=[25,50,75,100], hit={};
  addEventListener('scroll',function(){
    var max=d.documentElement.scrollHeight-innerHeight, p=max>0?Math.round(scrollY/max*100):0;
    marks.forEach(function(m){ if(p>=m && !hit[m]){ hit[m]=1; track('gorgetes_melyseg',{szazalek:m}); } });
  },{passive:true});
})();

/* --- ajánlatkérő űrlap --- */
(function(){
  var form=d.getElementById('leadForm'); if(!form) return;
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!form.checkValidity()){ form.reportValidity(); return; }
    var btn=form.querySelector('button[type=submit]');
    btn.disabled=true; btn.querySelector('span').textContent='Küldés…';
    var payload=Object.fromEntries(new FormData(form).entries());
    payload.forras=location.pathname; payload.idopont=new Date().toISOString();
    track('lead_urlap_bekuldes',{tema:payload.tema||'', oldal:location.pathname});

    /* === Make.com webhook — ide jön Dániel scenario URL-je ===
    fetch('https://hook.eu2.make.com/AZ_EN_WEBHOOK_AZONOSITOM',{method:'POST',
      headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      .then(function(){ location.href='/koszonjuk'; })
      .catch(function(){ btn.disabled=false; btn.querySelector('span').textContent='Küldés';
        alert('Hiba történt. Hívj minket: +36 30 352 7975'); });
    */

    /* Webhook nélküli viselkedés — a fenti blokk élesítésekor törölhető: */
    console.log('Lead payload (Make.com webhook helye):',payload);
    setTimeout(function(){ location.href='koszonjuk.html'; },400);
  });
})();
})();
