# Emigratieplan — site structuur

Twee pagina's, één deploy, één repo.

## Architectuur

```
emigratieplan.nl/              → Early-bird landing (Brevo subscribe form)
emigratieplan.nl/preview/      → Salespage met pakketten (stealth)
```

| Pagina | Bestand | Status | Indexering |
|---|---|---|---|
| Early-bird | `/index.html` (bestaand) | Live | Indexeerbaar |
| Salespage | `/preview/index.html` (nieuw) | Stealth | Geblokkeerd |

## Hoe stealth werkt

Drie lagen blokkering op `/preview/*`:

1. **robots.txt** (root): `Disallow: /preview/` voor alle bots inclusief AI
2. **vercel.json**: `X-Robots-Tag: noindex, nofollow` HTTP header op alle paths onder `/preview/`
3. **meta robots** in `/preview/index.html`: `noindex, nofollow`

Sitemap.xml bevat alleen `/`, niet `/preview/` — Google ontdekt de preview niet via je sitemap.

## Bestanden

```
robots.txt                     Allow root, Disallow /preview/
sitemap.xml                    Alleen root URL
vercel.json                    Path-scoped noindex headers
LAUNCH-CHECKLIST.md            Swap-procedure voor launch
preview/
  index.html                   Volledige salespage 14 secties
  styles.css
  script.js
  llms.txt                     (deployed bij launch, niet nu)
```

## Wat NIET uploaden

De bestaande `index.html` (Brevo early-bird) blijft 100% ongemoeid. Niet vervangen, niet aanraken.

De bestaande PDF's in repo root (`beslisgids-01-*.pdf` t/m `beslisgids-05-*.pdf`) blijven staan.

## Toegang tot stealth-pagina

Salespage is bereikbaar op `https://emigratieplan.nl/preview/` — alleen voor wie de URL kent. Niet vindbaar via:
- Google search
- AI-tools (ChatGPT, Claude, Perplexity)
- Links vanaf de early-bird pagina (er staat geen link naar /preview/)
- GitHub (als repo private staat)

Wel zichtbaar voor:
- Mensen aan wie jij de URL stuurt
- Iemand die toevallig `/preview/` raadt (kans laag)

Als je extra paranoid wilt zijn: hernoem `/preview/` naar iets als `/preview-7k4m2x/` (geheime path). Update dan ook robots.txt en vercel.json. Voor nu is `/preview/` genoeg.

## Launch dag

Zie `LAUNCH-CHECKLIST.md`. Korte versie: één commit verwisselt early-bird en salespage van URL.

## Lemon Squeezy URLs invullen

In `/preview/index.html`, zoek op `TODO LS` (3 plekken). Vervang met je LS Buy URLs + `?embed=1` voor overlay checkout.
