# Launch checklist — early-bird vervangen door salespage

Op launchdag wil je dat `emigratieplan.nl/` de nieuwe salespage toont, en de early-bird gearchiveerd is. Volg deze stappen in volgorde.

## Pre-launch (1 week van tevoren)

1. **Brevo email klaarmaken**: schrijf de launch-mail naar je early-bird-lijst. Inclusief €50 korting code en directe link naar pakketten. Niet versturen, klaar zetten.
2. **LS test mode af**: zet alle drie de Lemon Squeezy producten live (geen test mode), test één echte aankoop met eigen creditcard, refund jezelf.
3. **LS URLs ingevuld** in `/preview/index.html`, alle drie de plekken (`TODO LS`).
4. **OG image** geüpload naar root: `/og-image.png` (1200x630).
5. **Privacy + AV pagina's** bestaan: `/privacy.html`, `/algemene-voorwaarden.html`.
6. **Email-capture endpoint** (Beslisgids 01) in `/preview/index.html` werkt: test met eigen email.

## Launch dag — de swap

Eén commit doet alles. Voer in GitHub web UI uit, in deze volgorde:

### Stap 1: Archiveer huidige early-bird

In GitHub repo:
1. Open `index.html` (root)
2. Klik het potlood-icoon (Edit)
3. Bovenaan, knop naast bestandsnaam → klik op de bestandsnaam → rename naar `index-earlybird.html`
4. Commit message: `Archive early-bird page`
5. Commit direct naar main

Vercel deployt. Even wachten 60 sec.

### Stap 2: Verplaats salespage naar root

1. Ga naar `/preview/index.html`
2. Klik Raw → kopieer alle inhoud
3. Terug naar repo root → Add file → Create new file
4. Bestandsnaam: `index.html`
5. Plak inhoud
6. **BELANGRIJK**: voor je commit, één wijziging in de HTML — verwijder de stealth-meta:
   - Zoek: `<meta name="robots" content="noindex, nofollow">`
   - Vervang: `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">`
   - Zoek: `<meta name="googlebot" content="noindex, nofollow">`
   - Vervang: `<meta name="googlebot" content="index, follow">`
   - Of: kopieer de header uit `/preview/index.html.launch-version` als die bestaat
7. Commit message: `Launch salespage to root`
8. Commit direct naar main

### Stap 3: Update robots.txt

1. Open `robots.txt` in root
2. Klik Edit
3. Vervang volledig met:

```
User-agent: *
Allow: /

Sitemap: https://emigratieplan.nl/sitemap.xml

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /
```

4. Commit message: `Open indexing for launch`
5. Commit direct naar main

### Stap 4: Update vercel.json

1. Open `vercel.json`
2. Vervang inhoud met:

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

3. Commit message: `Remove stealth headers`
4. Commit direct naar main

### Stap 5: Update sitemap.xml

1. Open `sitemap.xml`
2. Vervang inhoud met:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://emigratieplan.nl/</loc>
    <lastmod>2026-06-XX</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://emigratieplan.nl/#pakketten</loc>
    <lastmod>2026-06-XX</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://emigratieplan.nl/#vergelijking</loc>
    <lastmod>2026-06-XX</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://emigratieplan.nl/#faq</loc>
    <lastmod>2026-06-XX</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

3. Commit message: `Update sitemap for launch`
4. Commit direct naar main

### Stap 6: Upload llms.txt naar root

1. In repo, kopieer `/preview/llms.txt` naar root
2. Of: download `llms.txt` lokaal en upload via Add file

### Stap 7: Verwijder preview folder (optioneel)

Optioneel, voor opruiming:
1. Ga naar `/preview/index.html` → delete file
2. Doe hetzelfde voor `/preview/styles.css`, `/preview/script.js`, `/preview/llms.txt`
3. Of: laat de folder staan, hij verstoort niets

## Verifieer launch

Drie checks:

**Check 1: site werkt**
- `https://emigratieplan.nl` → nieuwe salespage zichtbaar
- `https://emigratieplan.nl/preview/` → 404 (na stap 7) of nog steeds salespage met stealth headers

**Check 2: indexering open**
- `https://emigratieplan.nl/robots.txt` → `Allow: /`
- `curl -I https://emigratieplan.nl` → GEEN `x-robots-tag: noindex`
- View source → `<meta name="robots" content="index, follow...">`

**Check 3: search engines**
- Google Search Console → URL Inspection → emigratieplan.nl → Request indexing
- Submit sitemap: `https://emigratieplan.nl/sitemap.xml`
- Bing Webmaster Tools: idem

## Brevo mail versturen

Pas NA stap 7 + verificatie:
1. Open Brevo, geplande campagne
2. Verifieer dat de link in de mail naar `https://emigratieplan.nl/#pakketten` wijst, niet `/preview/`
3. Send

## Rollback

Als er iets misgaat:
1. In GitHub: tab Commits
2. Vind de commit van vóór de swap (label: `Archive early-bird page`)
3. Klik op commit → "Revert" via UI, of: kopieer SHA, gebruik bij rollback

Of simpeler: rename `index-earlybird.html` terug naar `index.html` en gooi de nieuwe `index.html` weg. Eén commit, terug naar early-bird.

## Niet vergeten

- Brevo lijst exporteren als CSV (backup) voor je swap doet
- LinkedIn-post klaarzetten met link naar launch
- Tweet/post op X klaar
- Mail naar Jonathan Martijn Lieuwma als fiscalist-validator als die deal rond is, met kortingscode
