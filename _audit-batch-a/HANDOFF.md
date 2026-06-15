# Batch A — audit-fixes Emigratieplan

Datum: 12 juni 2026 · Branch: `fix/audit` (8 commits) · Basis: `76dd09a`

## Doorgevoerd

| # | Commit | Wat |
|---|--------|-----|
| R3 | scroll-bug | Beslisgids-iframes laadden met `#page`-fragment en trokken de pagina mid-page open. Nu zonder fragment, iframe scrollt intern via `data-page`. Plus `scrollRestoration='manual'` en `scrollTo(0,0)`-vangnet. |
| R1 | screenshots | Vier "Plaatshouder"-vlakken vervangen door echte `<img>`-tegels met `onerror`-fallback en annotatie-callouts. PNG's volgen (zie hieronder). |
| R2 | reviews | Lege quote-sectie weg, vervangen door eerlijke beta-call met mailto. Nav-label Reviews -> Beta. |
| R5 | checkout | `?embed=1` van alle koop-links af, `lemon.js` niet meer geladen. Klik opent nu de gehoste LS-pagina (lost het modal-scrollprobleem op). |
| R6 | fiscale claims | WFT-FAQ -> "belastingadviseur, aangesloten bij NOB of RB". "Geen vereenvoudigde percentages" -> "Eén consistente set aannames, zichtbaar en aanpasbaar". |
| R7 | dode links | "Vergelijking"-link in mobiel-menu en footer verborgen op <=980px (sectie is daar `display:none`). |
| R19 | copy | Typo "va"->"van", "Wij gebruiken Brevo", title-streep "--"->"·", hero-CTA naar #impact-visual, reken-CTA's -> "Bekijk de pakketten". |
| R20 | social | Open Graph + Twitter-tags, met huisstijl-cover `preview/images/og-cover.png` (1200x630). |

## Toepassen (jij pusht)

De sandbox kon de bestanden wel bewerken maar niet naar `.git` schrijven (de virtiofs-mount blokkeert unlink). Daarom een patch-serie in plaats van directe commits.

```bash
cd ~/Documents/emigratieplan-gh
bash apply-batch-a.sh        # zet 8 commits op fix/audit
git log -p 76dd09a..fix/audit   # review
git push -u origin fix/audit
```

Opruimen na review: `rm -rf _audit-batch-a apply-batch-a.sh`

## Nog door jou — Batch B (buiten de repo)

### R1 · screenshots
Vier PNG's in `preview/images/`, exact deze namen, 16:9 (~1200x675, < 300 KB):
`shot-cashflow.png` · `shot-vergelijking.png` · `shot-pensioen.png` · `shot-vermogen.png`
Ze verschijnen vanzelf; de "screenshot volgt"-labels verdwijnen bij load. Captions staan al onder de tegels.

### R4 · iDEAL (Lemon Squeezy)
LS → Settings → Payments → iDEAL aan (store-currency EUR). Test een koop-link: verschijnt iDEAL naast kaart/PayPal? Zo niet, dan is dat het signaal voor een Mollie/Stripe-traject; laat het weten.

### R6 · checkout-afbeelding (Lemon Squeezy)
Vervang per product (Compare/Explore/Decide) de afbeelding met "€487K vs €612K / +€125.000" door een neutrale variant met onderschrift: "Voorbeeldscenario, uitkomsten afhankelijk van jouw invoer en aannames." Wil je dat ik die afbeelding in huisstijl aanlever? Zeg het.

## Verifieer na deploy
- R3: verse incognito-tab → laadt bovenaan (hero), niet mid-page. Scroll naar de Beslisgids-tegels → previews tonen pagina 1/4/6/11.
- R5: koop-knop opent de gehoste LS-pagina, velden bereikbaar.
- R7 + R1 op 390px: geen "Vergelijking" in mobiel-menu/footer; tegels tonen nette "volgt"-staat.
- Social: deel de URL in WhatsApp/LinkedIn → og-cover verschijnt. Bij domein-swap (R25): og:url + og:image naar de root.

## Bewust niet aangeraakt
Batch B/C uit de audit: R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R21, R22, R23, R24, R25. Klaar als volgende stappen.
