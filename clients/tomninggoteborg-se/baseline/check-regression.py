#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regresszio-ellenorzes: osszeveti a jelenlegi allapotot a rogzitett alapallapottal.

Hasznalat:
    python3 check-regression.py baseline/2026-09-06-baseline.json

Nem nulla kilepesi koddal ter vissza, ha barmi ROMLOTT. Bovites (uj oldal,
tobb szo, tobb sema) nem hiba. Igy minden modositas utan bizonyithato,
hogy nem tettuk tonkre a meglevo pozicionalast.
"""
import json, subprocess, sys, tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
BUILDER = HERE / "baseline.py"

def load_current():
    with tempfile.NamedTemporaryFile(suffix=".json", delete=False) as tmp:
        path = Path(tmp.name)
    subprocess.run([sys.executable, str(BUILDER), str(path)], check=True,
                   stdout=subprocess.DEVNULL)
    data = json.loads(path.read_text(encoding="utf-8"))
    path.unlink()
    return data

def main() -> int:
    base = {p["url"]: p for p in json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))}
    curr = {p["url"]: p for p in load_current()}

    errors, warnings, gains = [], [], []

    # 1) Eltunt URL = elveszett pozicio. Ez a legsulyosabb hiba.
    for url in base.keys() - curr.keys():
        errors.append(f"ELTUNT OLDAL: {url}  (a rogzitett alapallapotban meg letezett)")

    for url in sorted(base.keys() & curr.keys()):
        b, c = base[url], curr[url]

        # 2) Indexelhetoseget rontó valtozasok
        if c["noindex"] and not b["noindex"]:
            errors.append(f"{url}: noindex-re valtozott")
        if not c["canonical"]:
            errors.append(f"{url}: elveszett a canonical")
        elif c["canonical"] != b["canonical"]:
            warnings.append(f"{url}: canonical valtozott\n    volt: {b['canonical']}\n    lett: {c['canonical']}")
        if not c["title"]:
            errors.append(f"{url}: elveszett a title")
        if not c["meta_description"]:
            errors.append(f"{url}: elveszett a meta description")
        if c["h1_count"] != 1:
            errors.append(f"{url}: {c['h1_count']} db H1 (pontosan 1 kell)")
        if c["schema_errors"]:
            errors.append(f"{url}: hibas JSON-LD -> {c['schema_errors'][0]}")
        if not c["has_ga4"]:
            errors.append(f"{url}: hianyzik a GA4 tag")
        if len(c["hreflang"]) < len(b["hreflang"]):
            errors.append(f"{url}: hreflang par serult ({len(b['hreflang'])} -> {len(c['hreflang'])})")

        # 3) Tartalom- es jelvesztes
        drop = b["word_count"] - c["word_count"]
        if drop > b["word_count"] * 0.15:
            errors.append(f"{url}: szoszam {b['word_count']} -> {c['word_count']} (-{drop}, tobb mint 15%)")
        elif drop > 0:
            warnings.append(f"{url}: szoszam {b['word_count']} -> {c['word_count']} (-{drop})")
        elif drop < 0:
            gains.append(f"{url}: szoszam +{-drop}")

        lost_schema = set(b["schema_types"]) - set(c["schema_types"])
        if lost_schema:
            errors.append(f"{url}: elveszett sema: {', '.join(sorted(lost_schema))}")

        if c["internal_links"] < b["internal_links"] * 0.8:
            warnings.append(f"{url}: belso linkek {b['internal_links']} -> {c['internal_links']}")

        # 4) Title/H1 valtozas: nem hiba, de kezzel jova kell hagyni
        if c["title"] != b["title"]:
            warnings.append(f"{url}: TITLE valtozott\n    volt: {b['title']}\n    lett: {c['title']}")
        if c["h1"] != b["h1"]:
            warnings.append(f"{url}: H1 valtozott\n    volt: {b['h1']}\n    lett: {c['h1']}")

    for url in sorted(curr.keys() - base.keys()):
        gains.append(f"UJ OLDAL: {url}")

    print(f"Alapallapot: {len(base)} oldal   Jelenleg: {len(curr)} oldal\n")
    if gains:
        print(f"--- BOVULES ({len(gains)}) ---")
        for g in gains[:25]:
            print("  + " + g)
        if len(gains) > 25:
            print(f"  ... +{len(gains)-25}")
        print()
    if warnings:
        print(f"--- ATNEZENDO ({len(warnings)}) — nem hiba, de hagyd jova ---")
        for w in warnings:
            print("  ~ " + w)
        print()
    if errors:
        print(f"--- REGRESSZIO ({len(errors)}) — EZT JAVITANI KELL ---")
        for e in errors:
            print("  X " + e)
        print("\nEREDMENY: BUKOTT — ne tolts fel semmit, amig ez nincs javitva.")
        return 1

    print("EREDMENY: RENDBEN — semmi nem romlott az alapallapothoz kepest.")
    return 0

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main())
