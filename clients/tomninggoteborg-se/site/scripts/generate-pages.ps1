function Write-Utf8NoBom($path, $content) {
  $utf8 = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText($path, $content, $utf8)
}
$root = "c:\Users\User\Desktop\Cursor\tomning-goteborg"
function Get-NavDropdown($prefix) {
  $items = @(
    'tomning-i-goteborg','bortforsling-i-goteborg','dodsbotomning-i-goteborg','lagenhetstomning-i-goteborg','forradstomning-i-goteborg','akut-hjalp-tomning','grovsopor-foreningar'
  )
  $labels = @('Tömning i Göteborg','Bortforsling i Göteborg','Dödsbotömning i Göteborg','Lägenhetstömning','Förrådstömning','Akut hjälp & tömning','Grovsopor för föreningar')
  $html = ''
  for ($i=0; $i -lt $items.Count; $i++) {
    $html += "            <li><a href=`"${prefix}tjanster/$($items[$i]).html`">$($labels[$i])</a></li>`n"
  }
  return $html
}

function Get-Nav($prefix, $current) {
  $dropdown = Get-NavDropdown $prefix
  return @"
  <header class="site-header">
    <div class="container nav-bar">
      <a href="${prefix}index.html" class="nav-brand"><img src="${prefix}assets/favicon.svg" alt="" width="36" height="36" /><span>Alfa Tömning</span></a>
      <button type="button" class="nav-toggle" id="navToggle" aria-label="Meny"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h12M4 10h12M4 14h12"/></svg></button>
      <ul class="nav-links" id="primaryNav">
        <li><a href="${prefix}index.html">Hem</a></li>
        <li class="nav-dropdown">
          <button type="button" class="nav-dropdown-toggle" aria-expanded="false">Tjänster</button>
          <ul class="nav-dropdown-menu">$dropdown</ul>
        </li>
        <li><a href="${prefix}priser.html">Priser</a></li>
        <li><a href="${prefix}omraden.html">Områden</a></li>
        <li><a href="${prefix}kontakt.html">Kontakt</a></li>
      </ul>
      <div class="nav-actions"><a class="nav-phone" href="tel:+46707293986">070 729 39 86</a><a class="btn btn-primary" href="${prefix}offert.html">Begär Offert</a></div>
    </div>
  </header>
"@
}

function Get-Scripts($prefix) {
  return @"
  <script src="${prefix}js/services-data.js"></script>
  <script src="${prefix}js/config.js"></script>
  <script src="${prefix}js/form-mount.js"></script>
  <script src="${prefix}js/form-submit.js"></script>
  <script src="${prefix}js/main.js"></script>
"@
}

function Get-FormCta($prefix, $defaultService, $defaultCity) {
  return @"
    <section class="section final-offer" id="offert">
      <div class="container final-offer-grid">
        <div>
          <p class="eyebrow">Alltid gratis offert</p>
          <h2>Begär offert nu</h2>
          <p class="hero-lead">Fyll i formuläret så återkommer vi med fast pris utan dolda avgifter. Ju mer information du anger, desto snabbare kan vi ge ett korrekt prisförslag.</p>
          <ul class="final-offer-bullets">
            <li>Svar inom 5 minuter</li>
            <li>Försäkrad &amp; trygg service</li>
            <li>Inga dolda avgifter</li>
          </ul>
        </div>
        <div data-offert-form data-default-service="$defaultService" data-default-city="$defaultCity"></div>
      </div>
    </section>
"@
}

$services = @(
  @{ slug='tomning-i-goteborg'; title='Tömning i Göteborg'; pageTitle='Tömning Göteborg – Snabb Hjälp, Flytt & Städ | Alfa Tömning'; meta='Professionell tömning av lägenhet, villa, förråd, källare och vind i Göteborg.'; service='Tömning i Göteborg'; h1='Tömning i Göteborg – snabb hjälp med bohag, förråd och dödsbo'; lead='Vi hjälper privatpersoner, BRF och företag med tömning i hela Göteborgsregionen.' },
  @{ slug='bortforsling-i-goteborg'; title='Bortforsling i Göteborg'; pageTitle='Bortforsling Göteborg | Snabb hämtning & fast pris | Alfa Tömning'; meta='Bortforsling av möbler, vitvaror och grovsopor i Göteborg.'; service='Bortforsling i Göteborg'; h1='Bortforsling i Göteborg'; lead='Snabb hämtning av möbler, vitvaror och grovsopor i hela regionen.' },
  @{ slug='dodsbotomning-i-goteborg'; title='Dödsbotömning i Göteborg'; pageTitle='Dödsbotömning Göteborg | Respektfull hjälp | Alfa Tömning'; meta='Dödsbotömning i Göteborg med respekt och diskretion.'; service='Dödsbotömning i Göteborg'; h1='Dödsbotömning i Göteborg'; lead='Respektfull och professionell hjälp vid tömning av dödsbon.' },
  @{ slug='lagenhetstomning-i-goteborg'; title='Lägenhetstömning'; pageTitle='Lägenhetstömning Göteborg | Hyresrätt & bostadsrätt | Alfa Tömning'; meta='Lägenhetstömning i Göteborg inför flytt eller försäljning.'; service='Lägenhetstömning'; h1='Lägenhetstömning i Göteborg'; lead='Effektiv tömning av lägenheter oavsett våning och hiss-tillgång.' },
  @{ slug='forradstomning-i-goteborg'; title='Förrådstömning'; pageTitle='Förrådstömning Göteborg | Källare & vind | Alfa Tömning'; meta='Förrådstömning i Göteborg – källare, vind och garage.'; service='Förrådstömning'; h1='Förrådstömning i Göteborg'; lead='Vi rensar förråd, källare och vind så du får ordning igen.' },
  @{ slug='akut-hjalp-tomning'; title='Akut hjälp & tömning'; pageTitle='Akut tömning Göteborg 24/7 | Alfa Tömning'; meta='Akut hjälp med tömning i Göteborg dygnet runt.'; service='Akut hjälp & tömning'; h1='Akut hjälp & tömning i Göteborg'; lead='Akutjour 24/7 för brådskande tömningsuppdrag.' },
  @{ slug='grovsopor-foreningar'; title='Grovsopor för föreningar'; pageTitle='Grovsopor för BRF & företag Göteborg | Alfa Tömning'; meta='Grovsopor och större bortforsling för BRF och företag.'; service='Grovsopor för föreningar'; h1='Grovsopor för föreningar & företag'; lead='Planerad eller akut hantering av grovsopor för BRF och företag.' }
)

$tjansterDir = Join-Path $root 'tjanster'
New-Item -ItemType Directory -Force -Path $tjansterDir | Out-Null

foreach ($s in $services) {
  $sections = @"
          <h2>Vad vi hjälper dig med</h2>
          <p>Vi erbjuder $($s.title) med fast pris, tydlig kommunikation och miljövänlig hantering av avfall i Göteborg och närliggande kommuner.</p>
          <h2>Fast pris &amp; snabb offert</h2>
          <p>Du får alltid ett prisförslag innan arbetet startar. Fyll i formuläret till höger så återkommer vi så snart som möjligt.</p>
          <h2>Hela Göteborgsregionen</h2>
          <p>Vi kör i Göteborg, Mölndal, Partille, Hisingen, Kungälv, Kungsbacka och fler orter i regionen.</p>
"@
  $html = @"
<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>$($s.pageTitle)</title>
  <meta name="description" content="$($s.meta)" />
  <link rel="canonical" href="https://tomninggoteborg.se/tjanster/$($s.slug)" />
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/main.css" />
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Service","name":"$($s.title)","areaServed":"Göteborg","provider":{"@type":"LocalBusiness","name":"Alfa Tömning Göteborg","telephone":"+46707293986"}}</script>
</head>
<body>
$(Get-Nav '../' '')
<main>
  <section class="section">
    <div class="container service-hero-grid">
      <div class="service-content">
        <p class="eyebrow">Tjänst · Göteborg</p>
        <h1>$($s.h1)</h1>
        <p class="hero-lead">$($s.lead)</p>
        $sections
      </div>
      <div data-offert-form data-default-service="$($s.service)" data-form-title="Begär offert" data-form-subtitle="Gratis prisförslag – vi återkommer snabbt."></div>
    </div>
  </section>
$(Get-FormCta '../' $($s.service) 'Göteborg')
</main>
<footer class="site-footer"><div class="container footer-grid"><p>© Alfa Tömning Göteborg</p><p><a href="../integritetspolicy.html">Integritetspolicy</a></p></div></footer>
$(Get-Scripts '../')
</body>
</html>
"@
  Write-Utf8NoBom (Join-Path $tjansterDir "$($s.slug).html") $html
}

# Update omraden pages with form CTA
$areas = @(
  @{ slug='vastra-goteborg'; name='Västra Göteborg' },
  @{ slug='hisingen'; name='Hisingen' },
  @{ slug='centrum'; name='Centrum' },
  @{ slug='majorna-linne'; name='Majorna-Linné' },
  @{ slug='orgryte-harlanda'; name='Örgryte-Härlanda' },
  @{ slug='molndal'; name='Mölndal' },
  @{ slug='partille'; name='Partille' },
  @{ slug='kungalv'; name='Kungälv' },
  @{ slug='lerum'; name='Lerum' },
  @{ slug='kungsbacka'; name='Kungsbacka' },
  @{ slug='molnlycke'; name='Mölnlycke' },
  @{ slug='landvetter'; name='Landvetter' }
)

$omradenDir = Join-Path $root 'omraden'
foreach ($a in $areas) {
  $html = @"
<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tömning $($a.name) | Alfa Tömning Göteborg</title>
  <meta name="description" content="Tömning, dödsbotömning och bortforsling i $($a.name). Snabb offert och fast pris." />
  <link rel="canonical" href="https://tomninggoteborg.se/omraden/$($a.slug)" />
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/main.css" />
</head>
<body>
$(Get-Nav '../' '')
<main>
  <section class="page-hero"><div class="container"><p class="eyebrow">Område</p><h1>Tömning i $($a.name)</h1><p>Professionell tömning och bortforsling i $($a.name) och närliggande delar av Göteborgsregionen.</p></div></section>
  <section class="section"><div class="container service-content"><h2>Vi täcker $($a.name)</h2><p>Behöver du tömning av lägenhet, förråd, dödsbo eller bortforsling av möbler i $($a.name)? Vi erbjuder snabb offert och fast pris.</p></div></section>
$(Get-FormCta '../' 'Tömning i Göteborg' $($a.name))
</main>
<footer class="site-footer"><div class="container"><p>© Alfa Tömning Göteborg · <a href="../omraden.html">Alla områden</a></p></div></footer>
$(Get-Scripts '../')
</body>
</html>
"@
  Write-Utf8NoBom (Join-Path $omradenDir "$($a.slug).html") $html
}

# offert.html
$offert = @"
<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Begär offert för tömning i Göteborg | Alfa Tömning – Alfa Tömning Göteborg</title>
  <meta name="description" content="Begär gratis offert för tömning, bortforsling och dödsbotömning i Göteborg. Fast pris och snabb återkoppling." />
  <link rel="canonical" href="https://tomninggoteborg.se/offert" />
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/main.css" />
</head>
<body>
$(Get-Nav '' '')
<main>
  <section class="page-hero"><div class="container"><h1>Begär offert för tömning i Göteborg</h1><p class="hero-lead">Fyll i formuläret nedan så återkommer vi med offert så snart som möjligt. Ju mer information du fyller i, desto lättare blir det för oss att ge ett korrekt pris.</p></div></section>
  <section class="section"><div class="container" style="max-width:920px"><div data-offert-form data-form-title="Offertförfrågan" data-form-subtitle="Vi hjälper privatpersoner och företag med tömning, bortforsling, förråd, källare, vind, garage och lägenheter i Göteborg med omnejd."></div></div></section>
</main>
<footer class="site-footer"><div class="container footer-grid"><p>© Alfa Tömning Göteborg</p><p><a href="integritetspolicy.html">Integritetspolicy</a></p></div></footer>
$(Get-Scripts '')
</body>
</html>
"@
Write-Utf8NoBom (Join-Path $root 'offert.html') $offert
Write-Output 'Pages generated'
