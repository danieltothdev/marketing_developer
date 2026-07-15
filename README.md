# KKV Boost 🚀

**AI-alapú marketing, tanulás és automatizáció magyar kis- és középvállalkozásoknak.**
Android + iOS alkalmazás (React Native / Expo), előfizetéses üzleti modellel — egy marketing ügynökség saját, pénzzé tehető terméke és egyben lead-generátora.

---

## Mit tud az app?

| Modul | Funkció | Monetizáció |
|---|---|---|
| ✨ **AI Copilot** | Social poszt, hirdetésszöveg, e-mail/hírlevél és havi tartalomnaptár generálása a vállalkozás profiljára szabva (Claude AI) | Kredit-alapú: ingyenes 10/hó, Starter 100/hó, Pro/Business korlátlan |
| 🎓 **Akadémia** | Mikro-tanulós kurzusok (5-8 perces leckék + kvízek): social media, hirdetés, e-mail marketing, AI & automatizáció | Ingyenes kurzus a csali, a többi előfizetéssel |
| ⚙️ **Automatizáció** | Kész automatizációs receptek lépésről lépésre (Zapier/Make): lead-kezelés, véleménykérés, emlékeztetők, számlázás | Prémium receptek előfizetéssel |
| 📊 **AI Marketing Audit** | 8 kérdéses önértékelés → azonnali kiértékelés + 4 lépéses akcióterv | Ingyenes — ez a fő lead-generátor az ügynökségi upsellhez |
| 👤 **Profil / Paywall** | Csomagkezelés, statisztikák, 4 szintű előfizetés | Free / Starter (4 990 Ft) / Pro (14 990 Ft) / Business (39 990 Ft) |

## Üzleti modell

- **Freemium tölcsér:** ingyenes szint (audit + 10 AI-kredit + 1 kurzus) → fizetős szintek.
- **Előfizetés:** havi csomagok, éves fizetésnél 2 hónap kedvezmény ajánlott.
- **Ügynökségi upsell:** az audit eredményoldala és a Business csomag (havi konzultáció) tereli a felhasználót a done-for-you szolgáltatások felé — az app maga a sales-tölcsér.
- **Későbbi bővítés:** AI-kredit csomagok külön vásárlása, white-label licenc más ügynökségeknek, zárt közösség/mastermind szint.

## Technológia

- **App:** Expo SDK 53 / React Native, TypeScript, expo-router (Android + iOS egy kódbázisból)
- **Backend:** Supabase (auth, adatbázis, edge functions)
- **AI:** Claude API (`claude-opus-4-8`) a `supabase/functions/ai-generate` edge functionben — az API-kulcs sosem kerül a kliensbe
- **Előfizetés:** demóban lokális; élesben **RevenueCat** (App Store / Google Play in-app subscription)

Backend nélkül az app **demó módban** fut: minden képernyő működik, az AI-generátor minta-kimenetet ad.

## Futtatás

```bash
npm install
npm start          # Expo Go-val QR-kód alapján telefonon
npm run typecheck  # TypeScript ellenőrzés
```

## Élesítés lépései

1. **Supabase projekt:** hozz létre projektet, másold az URL-t + anon kulcsot `.env`-be (lásd `.env.example`).
2. **AI edge function:**
   ```bash
   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
   supabase functions deploy ai-generate
   ```
3. **Előfizetés:** RevenueCat fiók + App Store Connect / Play Console termékek felvétele, majd a `react-native-purchases` SDK bekötése a `SubscriptionContext.subscribe()` és a `paywall.tsx` helyére (a kommentek jelölik a helyet).
4. **Build és publikálás:** `eas build --platform all`, majd `eas submit`.

> **Fontos:** digitális tartalomnál az App Store és a Play Store kötelezővé teszi az in-app vásárlást (15–30% jutalék). Webes Stripe-fizetés a saját weboldaladon kínálható kedvezményesebb alternatívaként.

## Projektstruktúra

```
app/                    # képernyők (expo-router)
  (tabs)/               # 5 fő fül
  course/[id].tsx       # kurzus részletei
  lesson/[courseId]/[lessonId].tsx
  audit.tsx             # AI marketing audit
  paywall.tsx           # előfizetési csomagok
src/
  data/                 # kurzusok, sablonok, csomagok, audit-kérdések
  lib/                  # supabase kliens, AI-hívás (demó fallbackkel)
  context/              # előfizetés- és haladáskezelés
  components/           # UI építőelemek
supabase/functions/ai-generate/   # Claude API edge function
```
