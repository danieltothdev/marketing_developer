# tdaimarketing.hu — 3D / WebGL főoldal

Új, teljesen 3D-s főoldal a TD-AI & Marketing márkához: WebGL (three.js) arany
részecskemező, CSS 3D perspektíva, görgetésvezérelt animációk és parallax.
A tartalom a `.claude/product-marketing-context.md` és a `td-ai-marketing-brand`
skill hivatalos adatait használja — kitalált szám, vélemény és ügyfélszám nincs benne.

## Fájlok

```
docs/tdaimarketing-3d/
├── index.html                     ← a teljes oldal (inline CSS + JS)
└── assets/
    ├── three.module.min.js        ← three.js r160 helyben (nincs CDN-függés)
    └── THREE-LICENSE.txt          ← MIT licenc
```

## Mi a 3D benne

| Réteg | Technika |
|-------|----------|
| Háttér részecskemező | WebGL / three.js — 2200 arany pont saját GLSL vertex + fragment shaderrel, additív blendinggel, canvasból generált sprite textúrával (nincs képfájl) |
| Drótváz mag + gyűrűk | three.js `IcosahedronGeometry` wireframe + két `TorusGeometry` gyűrű |
| Görgetés → kamera | A scroll pozíció forgatja a világot, viszi befelé a kamerát és halványítja a réteget, hogy a szöveg olvasható maradjon |
| Hero kártyatorony | CSS `perspective` + `translateZ` rétegek, egérrel dőlő `rotateX/rotateY` |
| Szolgáltatás kártyák | CSS 3D tilt egérpozíció szerint + fénycsóva (`radial-gradient` a kurzornál) |
| Folyamat szekció | Valódi CSS 3D kocka (6 lap), amit a görgetés forgat; közben a lépéskártyák sorra aktiválódnak |
| Kifogások | 3D flip kártyák (`rotateY(180deg)` + `backface-visibility`), hoverre és fókuszra is |
| Parallax | Több réteg eltérő sebességgel, egyetlen `requestAnimationFrame` ciklusban |
| Scroll reveal | `IntersectionObserver`, `translate3d` + `rotateX` belépéssel |

## Teljesítmény és hozzáférhetőség

- Minden görgetéshez kötött számítás **egy** rAF ciklusban fut (nincs layout thrash).
- `devicePixelRatio` 2-re vágva, mobilon 900 részecske 2200 helyett.
- Háttérfülön a render leáll (`visibilitychange`).
- `prefers-reduced-motion: reduce` esetén a WebGL réteg **el sem indul**, és minden animáció kikapcsol — csak a statikus oldal marad.
- Ha nincs WebGL vagy nem tölt be a three.js, automatikusan a CSS „aurora” háttér marad (kipróbálva: az oldal így is teljes értékű).
- Nincs vízszintes görgetés 390px-től 1440px-ig ellenőrizve, valódi Chromiumban.

## Élesítés előtt — 2 teendő

1. **Make.com webhook**: az `index.html` végén a form JS-ében kommentben ott a `fetch(...)`
   blokk. Cseréld ki a `https://hook.eu2.make.com/AZ_EN_WEBHOOK_AZONOSITOM` URL-t a saját
   scenario URL-edre, vedd ki kommentből, és töröld alatta a demó `setTimeout` blokkot.
2. **OG kép**: a meta blokk a `https://tdaimarketing.hu/assets/og-tdai-3d.jpg` képre hivatkozik —
   töltsd fel, vagy írd át egy meglévő banner képre.

## Feltöltés (Rackhost)

Töltsd fel a `public_html` alá:

```
index.html          (vagy pl. 3d.html, ha nem a főoldalt cseréled)
assets/three.module.min.js
```

Az `assets/` mappának az `index.html` mellett kell lennie — relatív útvonalon hivatkozik rá.
Ha csak tesztoldalként megy ki (pl. `/uj`), akkor a `<link rel="canonical">` sort is írd át.

## Helyi megnyitás

A three.js ES modulként töltődik, ezért `file://`-ből nem indul el (CORS) — kis szerver kell:

```bash
cd docs/tdaimarketing-3d && python3 -m http.server 8777
# → http://localhost:8777
```

`file://`-ből megnyitva is működik az oldal, csak a WebGL réteg helyett a CSS fallback fut.
