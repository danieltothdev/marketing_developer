# tomninggoteborg.se — ügyfélbrief és végrehajtási terv

**Ügyfél kapcsolattartó:** Tamás (Alfa Tömning Göteborg)
**Beérkezett:** 2026. szeptember, e-mailben
**Rögzítve:** 2026-09-07

---

## 1. Amit az ügyfél kért (tartalmi összefoglaló)

| # | Terület | Kérés |
|---|---|---|
| 1 | Főoldalak | 11 központi oldal: Startsida, Tjänster, Områden, Priser, Så fungerar det, Om oss, Referenser, Vanliga frågor, Begär offert, Kontakt, Integritetspolicy |
| 2 | Szolgáltatási oldalak | 19 külön oldal (lägenhet, villa, dödsbo, förråd, källare, vind, garage, kontor, företag, lokal, fastighet, kontorsröjning, fastighetsröjning, bortforsling, möbelbortforsling, grovsopor, röjning/sortering, akut, återbruk) — egyedi címmel, szöveggel, FAQ-val, metával |
| 3 | Célcsoport-oldalak | 8 db: BRF, fastighetsägare, fastighetsförvaltare, mäklare, god man/förvaltare, boutredare, äldreboende-flytt, företag |
| 4 | Göteborg + környék | ~25 helyi oldal, arányosan É/K/NY/D lefedéssel |
| 5 | Halland + további városok | Varberg, Falkenberg, Halmstad; Borås, Jönköping, Värnamo; Trollhättan, Lilla Edet, Vänersborg, Uddevalla |
| 6 | Információs oldalak | 14 útmutató (költség, időtartam, folyamatok, återbruk, grovavfall, checklista, RUT-avdrag, farligt avfall, nyckelhantering…) |
| 7 | Ajánlatkérő űrlap | 14 mező + képfeltöltés, SMTP, spamvédelem, visszaigazolás, mobilbarát |
| 8 | Tartalmi tilalmak | Nincs: „kostnadsfri värdering", „vi värderar dödsbon", „vi köper hela dödsbon", „boka kostnadsfritt hembesök", kitalált iroda/referencia/vélemény, „billigast/bäst" bizonyíték nélkül, automatikus „fast pris", generált városoldalak |
| 9 | Technikai SEO | Schema, inLanguage, breadcrumb, canonical, hreflang, www/non-www, HTTPS, redirect-láncok, sitemap, duplikátumok, vékony tartalom, CWV, GSC/Analytics |
| 10 | Kereszt-linkelés | alfaflyttstad.se ↔ tomninggoteborg.se ↔ dodsbojourengoteborg.se — természetesen, nem tömegesen |
| 11 | Célállapot | ~80–100 egyedi, indexelhető oldal |

**Kiemelt elvárások:**
- „Nem új weboldalt szeretnék építeni, hanem a meglévőt továbbfejleszteni."
- „A már megszerzett jó Google-helyezések ne sérüljenek. A meglévő URL-eket, tartalmakat és pozíciókat először fel kell mérni."
- Nem szabad azt állítani, hogy minden városban helyi iroda/telephely van.

---

## 2. Mért kiindulási állapot (2026-09-06)

```
Oldalak: 87  (SV 44 / EN 43)
SV szó összesen: 30 493 · átlag 693 szó · belső link/oldal: 25

hiányzó title 0 · hiányzó meta 0 · hiányzó canonical 0 · rossz H1 0
hibás JSON-LD 0 · duplikált title 0 · duplikált meta 0 · noindex 0
300 szó alatti 0 · sérült hreflang 0
```

**A 9. pont (technikai SEO) nagy része már kész** — az ügyfél által felsorolt hibák egyike sem áll fenn.

Rögzítve: `baseline/2026-09-06-baseline.json`
Visszaállítási pont: commit `8e8d394`

---

## 3. A brief hibái, amiket jelezni kell

1. **Önellentmondás a „värdering" ügyében.** A 8. pont tiltja, a „Fő szolgáltatások" lista és a dödsbo-cluster viszont kéri. **Döntést igényel.**
2. **A 19 szolgáltatási oldal önkannibalizál.** `Kontorstömning`/`Företagstömning`/`Lokaltömning`/`Kontorsröjning` svédül 1–2 keresési szándék, nem 4. `Tömning av lägenhet` = `Lägenhetstömning`. Keresési validálás után reálisan 12–14 oldal marad.
3. **Két egymásnak ellentmondó városlista.** A 4–5. pont Hallandot rangsorolja előre, a lenti „HELYI SEO" rész Västra Götalandot, Hallandot meg sem említve. Göteborg→Halmstad ~145 km — nem kifizetődő egy 5 000 kr-os munkára.
4. **RUT-avdrag jogi kockázat.** Dödsbotömning a haláleset után általában NEM RUT-jogosult; grovsopor bortforsling sem. Kivétel: saját bútor elszállítása újrahasználatra átvevő helyre (25%). Csak Skatteverket-forrással írható meg.
5. **A 14 mezős űrlap a saját célja ellen dolgozik.** Helyette kétlépcsős: 1. lépés 3 mező (már lead), 2. lépés opcionális részletek + képek.
6. **Nulla szó a linkekről és a Google Cégemről.** Ez a legnagyobb hiányosság — a map pack viszi a kattintások többségét.
7. **Az angol verzió sorsáról nincs döntés.** 43 EN oldal; ha a SV 100-ra megy, 57 oldalon törik a hreflang. Javaslat: EN lezsugorítása 6–8 oldalra.

---

## 4. Blokkoló kérdések az ügyfélnek

1. Värdering: szabad vagy tilos?
2. Hány km-es sugárban éri meg kiszállni, és mekkora munkától?
3. Van valós referencia fotókkal? (kitalált nem lehet — ő maga tiltja)
4. Om oss oldalhoz: fotó, név, háttér, cégadat?
5. Google Cégem profil: létezik? hány értékelés? van hozzáférés?

---

## 5. Végrehajtási sorrend

**Alapelv: additív előbb, módosító utána.** Új oldal nem ronthatja el a meglévő pozíciót; meglévő átírása igen.

**Négy szabály:**
1. Minden feltöltés előtt lefut a `baseline/check-regression.py`. Piros → nem megy fel semmi.
2. URL soha nem változik külön engedély nélkül.
3. Rangsoroló oldal szövegét nem írjuk át — csak bővítjük.
4. Egy fázis = egy csomag = egy ellenőrzés.

| Fázis | Tartalom | Kockázat | Állapot |
|---|---|---|---|
| 0 | Alapállapot rögzítése + regressziós védőháló | nulla | ✅ kész |
| 1 | GA4 konverziós események, `/tack` oldal, GSC export | nulla | ⬅️ következik |
| 2 | Űrlap: kötelező mezők 7→3, kétlépcsős + kép; „hembesök" csere 8 oldalon | alacsony | |
| 3 | Additív tartalom: dödsbo cluster, validált szolgáltatásoldalak, útmutatók | nulla | |
| 4 | Meglévő vékony oldalak bővítése — **csak GSC-adat után** | közepes | |
| 5 | Helyi oldalak, kiszállási sugár szerint | közepes | |
| 6 | Angol verzió döntése | magas | |
| 7 | Célcsoport-oldalak + esettanulmányok — ügyfél-input függő | — | |

---

## 6. Nyitott tételek az oldalon

- **„kostnadsfritt hembesök" 8 oldalon szerepel** — az ügyfél kifejezetten tiltja. Cserélendő: „Offert efter bilder eller information", „Tydlig prisuppgift före arbetets start".
- **„fast pris" 41 oldalon** — nagyrészt „fast pris efter besiktning" formában, ami megfelel az ügyfél jóváhagyott megfogalmazásának. Egyedi átnézés kell a feltétel nélküli előfordulásokra.
- „billigast" 2 oldalon — **rendben**, csak saját szolgáltatások összehasonlításában szerepel, nem cégösszehasonlításban.
- **Nincs GA4 konverziós esemény** (0 db), pedig az alap tag mind a 87 oldalon fent van.
- **E-mail mező `NOT NULL` a `leads` táblában** — opcionálissá tétele migrációt igényel az ügyfél éles adatbázisában.

---

## 7. Üzemeltetési tanulság (2026-09-07)

Az `assets` mappa (57 fájl, 6 MB) **2026-08-08 után eltűnt a tárhelyről**, és kb. négy hétig észrevétlen maradt: mind a 87 oldal hivatkozott a `logo.png`-re és a tartalmi képekre, mind 404-et adott. A repó végig hibátlan volt — a hiba csak a szerveren létezett.

Visszaállítva a Hostinger `08.08` backupjából.

**Ebből következő védelem:**
- `.github/workflows/deploy-tomninggoteborg.yml` — teljes mappa-szinkron minden pushnál, nem lehet félbehagyni
- `.github/workflows/monitor-tomninggoteborg.yml` — napi ellenőrzés az **éles** oldalon (kulcsoldalak, képek, CSS/JS); hiba esetén azonnali értesítés

**Szabály innentől:** ne szerkessz fájlt közvetlenül a Hostinger File Managerben — a következő deploy felülírja. A git a forrás.
