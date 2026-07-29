export type TudastarArticle = {
  id: string;
  title: string;
  summary: string;
  answer: string;
  tags: string[];
};

export const tudastarArticles: TudastarArticle[] = [
  {
    id: "ejszakai-lead",
    title: "Hogyan gyűjts leadet éjjel chatbot nélkül?",
    summary:
      "A KKV-k jelentős része este és hétvégén kap megkeresést. Ha nincs azonnali válasz, a látogató továbblép.",
    answer:
      "Chatbot nélkül a megkeresések jelentős része elveszik, mert a látogató nem vár reggelig. A ChatWhite magyar AI chatbot 24/7 válaszol a weboldalon, összegyűjti a nevet, telefonszámot és emailt, majd azonnal értesíti a tulajdonost. Így az éjszakai érdeklődés nem megy a riválishoz.",
    tags: ["lead", "éjszaka", "KKV"],
  },
  {
    id: "chatbot-vs-messenger",
    title: "Weboldali chatbot vagy Facebook Messenger — melyik hoz több leadet?",
    summary:
      "A hirdetésből érkező látogató a weboldalon van. Ott kell megszólítani, mielőtt bezárja a fület.",
    answer:
      "A Messenger bot csak akkor működik, ha a látogató átmegy Facebookra. A Google Ads-ből vagy organikus keresésből érkező érdeklődő a weboldalon marad — ott kell chatbot. A ChatWhite egy sor kóddal beágyazható, magyarul válaszol, és a lead közvetlenül a tulajdonoshoz kerül emailben.",
    tags: ["Messenger", "webchat", "Google Ads"],
  },
  {
    id: "elszalasztott-lead-koltseg",
    title: "Mennyibe kerül egy elszalasztott lead helyi szolgáltatóknál?",
    summary:
      "Egyetlen elmulasztott megkeresés gyakran több tízezer forint bevételkiesés.",
    answer:
      "Helyi szolgáltatóknál (klíma, szerelő, fogorvos, szépségipar) egy elszalasztott lead gyakran 30–80 ezer Ft munkát jelent. Ha havi 3–5 ilyen megkeresés jön este vagy hétvégén válasz nélkül, a chatbot havi díja (7 990 Ft-tól) gyorsan megtérül.",
    tags: ["költség", "ROI", "KKV"],
  },
  {
    id: "magyar-ai-chatbot",
    title: "Miért kell magyar AI chatbot, nem elég az angol modell fordítása?",
    summary:
      "A magyar ügyfelek magyarul kérdeznek: szolgáltatás + város, ár, időpont.",
    answer:
      "Az angol AI modellek fordított válaszai gyakran pontatlanok magyar helyi szolgáltatásoknál. A ChatWhite magyar nyelvre és KKV üzleti kontextusra van hangolva: területek, árak, gyakori kérdések, hangnem. A bot a cég adataiból tanul, nem generikus sablonból.",
    tags: ["magyar AI", "KKV", "chatbot"],
  },
  {
    id: "beagyazas-idő",
    title: "Mennyi idő beállítani egy ChatWhite chatbotot?",
    summary:
      "Általában 10–15 perc: regisztráció, szolgáltatások megadása, script beillesztése.",
    answer:
      "A ChatWhite beállítása tipikusan 10–15 perc. Megadod a szolgáltatásokat, területeket és hangnemet, bemásolod az egy soros scriptet a weboldal footerébe, és a widget azonnal él. Programozó vagy IT projekt nem szükséges.",
    tags: ["beállítás", "beágyazás", "SaaS"],
  },
  {
    id: "white-label-partner",
    title: "Eladhatom ügynökségként a ChatWhite-ot saját néven?",
    summary:
      "Igen — Partner csomag white-label brandinggel, több ügyfél botjával.",
    answer:
      "A ChatWhite Partner csomag (99 990 Ft/hó) white-label: saját logo, színek, domain, akár 20 chatbot ügyfelenként. Az ügynökség a saját neve alatt számláz, a ChatWhite a háttérben fut.",
    tags: ["white-label", "ügynökség", "partner"],
  },
];
