#!/usr/bin/env node
/* ============================================================
   TD-AI & Marketing — statikus oldalgenerátor
   Használat:  node scripts/build-site.js
   Bemenet:    content/*.json  +  templates/base.html
   Kimenet:    <slug>.html a gyökérben + sitemap.xml
   ============================================================ */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const SITE = 'https://tdaimarketing.hu';
const tpl = fs.readFileSync(path.join(ROOT, 'templates/base.html'), 'utf8');

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const strip = s => String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const url = slug => slug === 'index' ? SITE + '/' : `${SITE}/${slug}.html`;

/* ---------- blokk-renderelők ---------- */
const B = {
  answer: b => `<p class="answer rv">${b.html}</p>`,

  prose: b => `<div class="prose rv">${b.html}</div>`,

  html: b => b.html,

  cards: b => `${b.title ? `<h2 class="rv">${b.title}</h2>` : ''}
    <div class="cards ${b.cols === 3 ? 'c3' : ''}">${b.items.map(i => `
      <div class="card rv">${i.k ? `<div class="k">${i.k}</div>` : ''}
        <h3>${i.h}</h3><p>${i.p}</p>${i.price ? `<div class="price">${i.price}</div>` : ''}</div>`).join('')}
    </div>`,

  ticks: b => `${b.title ? `<h2 class="rv">${b.title}</h2>` : ''}
    <ul class="ticks rv">${b.items.map(i => typeof i === 'string'
      ? `<li>${i}</li>` : `<li class="${i.x ? 'x' : ''}">${i.t}</li>`).join('')}</ul>`,

  steps: b => `${b.title ? `<h2 class="rv">${b.title}</h2>` : ''}
    <div class="steps">${b.items.map((i, n) => `
      <div class="step rv"><div class="n">${n + 1}</div><h3>${i.h}</h3><p>${i.p}</p></div>`).join('')}</div>`,

  table: b => `${b.title ? `<h2 class="rv">${b.title}</h2>` : ''}
    <div class="tbl rv"><table><thead><tr>${b.head.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,

  faq: b => `${b.title ? `<h2 class="rv">${b.title}</h2>` : ''}
    <div class="faq">${b.items.map(i => `
      <div class="faq-item rv"><h3><button class="faq-q" type="button">${i.q}</button></h3>
      <div class="faq-a"><div>${i.a}</div></div></div>`).join('')}</div>`,

  cta: b => `<div class="cta-box rv"><h2>${b.title}</h2><p>${b.text}</p>
    <div class="row"><a class="btn" href="${b.href || 'ingyenes-konzultacio.html'}" data-cta="${b.id || 'cta'}"><span>${b.btn || 'Ingyenes konzultáció'}</span></a>
    <a class="btn-ghost" href="tel:+36303527975">☎ +36 30 352 7975</a></div></div>`,

  related: (b, pages) => `<h2 class="rv">${b.title || 'Kapcsolódó oldalak'}</h2>
    <div class="rel">${b.items.map(s => {
      const p = pages[s];
      return p ? `<a class="rv" href="${s}.html"><div class="t">${p.navTitle || p.h1}</div><div class="d">${p.short || strip(p.desc).slice(0, 90)}</div></a>` : '';
    }).join('')}</div>`,

  marquee: b => `<div class="mq" aria-hidden="true"><div class="mq-track" data-items="${b.items.join('|')}"></div></div>`,

  form: b => `<div class="form-card rv" id="formCard">
    <h2>${b.title || 'Kérj ingyenes konzultációt'}</h2>
    <p class="sub">${b.text || 'Kötelezettség nélkül, 24 órán belül válaszolunk. 2 perc az egész.'}</p>
    <form id="leadForm" novalidate>
      <div class="f-row two">
        <div class="field"><label for="nev">Neved <span class="req">*</span></label><input id="nev" name="nev" type="text" required autocomplete="name" placeholder="Kovács Péter"></div>
        <div class="field"><label for="ceg">Cégnév</label><input id="ceg" name="ceg" type="text" autocomplete="organization" placeholder="Példa Kft."></div>
      </div>
      <div class="f-row two">
        <div class="field"><label for="email">E-mail <span class="req">*</span></label><input id="email" name="email" type="email" required autocomplete="email" placeholder="peter@pelda.hu"></div>
        <div class="field"><label for="tel">Telefon <span class="req">*</span></label><input id="tel" name="tel" type="tel" required autocomplete="tel" placeholder="+36 30 123 4567"></div>
      </div>
      <div class="field"><label for="uzenet">Mi a legnagyobb gondod most?</label><textarea id="uzenet" name="uzenet" placeholder="Pl.: Megy a Google Ads, de nem tudom, jön-e belőle ügyfél."></textarea></div>
      <input type="hidden" name="tema" value="${b.tema || 'konzultacio'}">
      <label class="gdpr" for="gdpr"><input id="gdpr" name="gdpr" type="checkbox" required>
        <span>Hozzájárulok, hogy a megadott adataimat a TD-AI &amp; Marketing kapcsolatfelvétel céljából kezelje. <a href="adatvedelem.html" target="_blank" rel="noopener">Adatvédelmi tájékoztató</a></span></label>
      <div class="micro"><span><i>✓</i>Nincs kötelezettség</span><span><i>✓</i>Nem sablonos PDF</span><span><i>✓</i>2 perc az egész</span></div>
      <button class="btn" style="width:100%" type="submit" data-cta="urlap"><span>${b.btn || 'Kérem az ingyenes konzultációt'}</span></button>
      <div class="lock">🔒 Az adataidat nem adjuk tovább, és nem küldünk spamet.</div>
    </form></div>`
};

/* ---------- oldal renderelése ---------- */
function renderSections(page, pages) {
  return (page.sections || []).map((sec, i) => {
    const inner = (sec.blocks || []).map(b => {
      const fn = B[b.type];
      if (!fn) throw new Error(`Ismeretlen blokktípus: ${b.type} (${page.slug})`);
      return fn(b, pages);
    }).join('\n');
    return `<section class="sec ${sec.alt ? 'alt' : ''}"${sec.id ? ` id="${sec.id}"` : ''}>
      <div class="wrap">${inner}</div></section>`;
  }).join('\n');
}

function jsonld(page) {
  const g = [{
    '@type': 'WebPage', '@id': url(page.slug) + '#page', url: url(page.slug),
    name: page.h1, description: strip(page.desc), inLanguage: 'hu-HU',
    isPartOf: { '@id': SITE + '/#weboldal' },
    breadcrumb: { '@id': url(page.slug) + '#crumb' }
  }, {
    '@type': 'BreadcrumbList', '@id': url(page.slug) + '#crumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Főoldal', item: SITE + '/' },
      ...(page.slug === 'index' ? [] : [{ '@type': 'ListItem', position: 2, name: page.navTitle || page.h1, item: url(page.slug) }])
    ]
  }];
  if (page.service) {
    g.push(Object.assign({
      '@type': 'Service', serviceType: page.service, provider: { '@id': SITE + '/#szervezet' },
      areaServed: { '@type': 'Country', name: 'Magyarország' }, description: strip(page.desc)
    }, page.price ? { offers: { '@type': 'Offer', price: String(page.priceValue || ''), priceCurrency: 'HUF', description: page.price } } : {}));
  }
  const faqs = [];
  (page.sections || []).forEach(s => (s.blocks || []).forEach(b => {
    if (b.type === 'faq') b.items.forEach(i => faqs.push({ '@type': 'Question', name: strip(i.q), acceptedAnswer: { '@type': 'Answer', text: strip(i.a) } }));
  }));
  if (faqs.length) g.push({ '@type': 'FAQPage', mainEntity: faqs });
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': g })}</script>`;
}

function build() {
  const dir = path.join(ROOT, 'content');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const pages = {};
  files.forEach(f => { const p = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); pages[p.slug] = p; });

  const built = [];
  Object.values(pages).forEach(page => {
    if (page.draft) { console.log(`  – ${page.slug} (draft, kihagyva)`); return; }
    const emb = `<div class="pemb" aria-hidden="true"><div class="gl"></div><div class="st">
      <div class="l"><svg viewBox="0 0 100 100"><use href="#tree"/></svg></div>
      <div class="l"><svg viewBox="0 0 100 100"><use href="#tree"/></svg></div>
      <div class="l"><svg viewBox="0 0 100 100"><use href="#tree"/></svg></div>
      <div class="l"><svg viewBox="0 0 100 100"><use href="#tree"/></svg></div></div></div>`;
    const head = `<section class="phead">${emb}<div class="wrap">
      ${page.slug === 'index' ? '' : `<div class="crumb"><a href="index.html">Főoldal</a> › ${esc(page.navTitle || page.h1)}</div>`}
      ${page.eyebrow ? `<div class="eyebrow">${page.eyebrow}</div>` : ''}
      <h1>${page.h1}</h1>
      ${page.lead ? `<p class="lead">${page.lead}</p>` : ''}
      ${page.price ? `<div class="pricetag">💰 ${page.price}</div>` : ''}
      ${page.cta === false ? '' : `<div class="phead-cta">
        <a class="btn" href="${page.ctaHref || 'ingyenes-konzultacio.html'}" data-cta="fejlec-${page.slug}"><span>${page.ctaLabel || 'Ingyenes konzultáció'}</span></a>
        <a class="btn-ghost" href="tel:+36303527975">☎ +36 30 352 7975</a></div>`}
    </div></section>`;

    const html = tpl
      .replace('{{title}}', esc(page.title))
      .replace('{{desc}}', esc(strip(page.desc)))
      .replace('{{keywordsMeta}}', page.keywords ? `<meta name="keywords" content="${esc(page.keywords)}">` : '')
      .replace('{{robots}}', page.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1')
      .replace(/\{\{canonical\}\}/g, url(page.slug))
      .replace('{{ogTitle}}', esc(page.ogTitle || page.title))
      .replace('{{jsonld}}', page.noindex ? '' : jsonld(page))
      .replace('{{body}}', head + '\n' + renderSections(page, pages))
      .replace('{{extraJs}}', page.extraJs || '')
      .replace('{{navSzolg}}', page.nav === 'szolg' ? ' aria-current="page"' : '')
      .replace('{{navArak}}', page.nav === 'arak' ? ' aria-current="page"' : '')
      .replace('{{navMegf}}', page.nav === 'megf' ? ' aria-current="page"' : '')
      .replace('{{navEszk}}', page.nav === 'eszk' ? ' aria-current="page"' : '')
      .replace('{{navRolam}}', page.nav === 'rolam' ? ' aria-current="page"' : '')
      .replace('{{navBlog}}', page.nav === 'blog' ? ' aria-current="page"' : '');

    fs.writeFileSync(path.join(ROOT, page.slug + '.html'), html);
    built.push(page);
    console.log(`  ✓ ${page.slug}.html`);
  });

  /* sitemap: főoldal + generált oldalak + a meglévő blogcikk */
  const extra = [{ loc: SITE + '/', pr: '1.0', cf: 'weekly' }];
  const urls = extra.concat(built.filter(p => !p.noindex).map(p => ({
    loc: url(p.slug), pr: p.priority || '0.7', cf: p.changefreq || 'monthly'
  })));
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(u => `  <url><loc>${u.loc}</loc><changefreq>${u.cf}</changefreq><priority>${u.pr}</priority></url>`).join('\n') +
    `\n</urlset>\n`);
  console.log(`\n  ✓ sitemap.xml (${urls.length} URL)\n  Kész: ${built.length} oldal.`);
}
build();
