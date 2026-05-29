# Kitab Pemula Albion Online

> **Albion Online Beginner's Codex** — Panduan farming Albion Online untuk server Asia (Albion East). Vanilla HTML/CSS/JS, dwi-bahasa EN/ID, dark fantasy theme.

**Live**: deploy via Cloudflare Pages → lihat [DEPLOY_CLOUDFLARE_PAGES.md](DEPLOY_CLOUDFLARE_PAGES.md)
**Repo**: https://github.com/neotech5/AO-PROJECT
**Penulis**: ABID — [Discord](https://discord.com/users/987184688324030474)

---

## Fitur

Susunan **newbie → pro** dengan 4 tier section:

**🟢 Foundations** (mulai di sini)
- 📚 **Beginner Essentials** — 4 tab: First Hour Checklist, Mount Guide, Food & Potion, Refining 101
- 📖 **Player Guide** — 3 fasa tabbed (Pemula / Mid Game / End Game)
- 🗺️ **Zone Types Manual** — 7 zone (Blue/Yellow/Red/Black/Mists/Roads/Hellgate)
- ❌ **JANGAN-DO List** — 14 kesalahan biasa pemula
- 💬 **FAQ Pemula** — 15 Q&A collapsible (Premium wajib gak? Mati BZ? LP buat apa? dst.)

**🟡 Pick Your Path**
- 🌿 **Biome Distribution** — 5 bioma Royal
- 🛠️ **6 Gathering Professions** — Lumberjack, Ore Miner, Skinner, Stone Quarrier, Fiber Harvester, Fisherman
- 📈 **Tier Progression** — T1 → T8 strategi per tier

**🟠 Survive & Thrive**
- 🛡️ **Gank Avoidance & Escape Manual** — 6 sub-section (checklist, spotting, escape kit table, Q-Swap, dst.)
- 🌫️ **Mists & Roads of Avalon Deep Dive** — solo T4-T8, Knightfall Abbey, portal types, Avalonian Energy
- 🗺️ **Spot Spesifik T2-T6** di Royal Continent + **T7-T8** di Outlands
- ⚔️ **Gathering Builds** — 3 build meta 2026 (Solo / Tank / Balanced)

**🔴 Optimize**
- 📅 **Asia Server Event Schedule** — prime time, world boss, dst.
- 💰 **Marketplace 101** — Buy/Sell Order, tax breakdown, arbitrage antar kota
- 📋 **Routine Harian Pro** — daily login checklist + weekly goals + anti-burnout
- 💎 **Itungan Premium** — comparison table, breakeven math, scenarios
- 🧰 **Tools & Apps (Pro Toolkit)** — 8 tool wajib (Data Project, AlbionMap2D, Murder Ledger, dst.)
- 💡 **Pro Tips** — efisiensi, keamanan, profitability

**Sistem**
- 🌐 **Dwi-bahasa** — EN / ID (Bahasa Indonesia santai)
- 🕐 **Asia Server Status** — real-time clock + danger level indicator
- 📱 **Responsive** — mobile, tablet, desktop
- ⚡ **No build step** — pure HTML/CSS/JS, langsung deploy
- 🔗 **Open Graph + Twitter Card** — preview cantik di Discord/WhatsApp/Twitter/Telegram saat link di-share
- 🔍 **SEO-optimized** — canonical URL, hreflang, JSON-LD structured data (4 schema: WebSite, Article, FAQPage, BreadcrumbList), robots.txt, sitemap.xml, rich snippet ready

## Quick Start (local dev)

```bash
# Clone repo
git clone https://github.com/neotech5/AO-PROJECT.git
cd AO-PROJECT

# Start local server
python3 -m http.server 8088
# Atau: npx http-server -p 8088

# Buka http://localhost:8088
```

## Deploy

Lihat panduan lengkap di **[DEPLOY_CLOUDFLARE_PAGES.md](DEPLOY_CLOUDFLARE_PAGES.md)**.

Quick steps (Cloudflare Pages via Git):
1. Login [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Workers & Pages → Create application → Pages → Connect to Git**
3. Pilih repo `AO-PROJECT` → **Framework preset: None**, Build command: kosong, Build output: `/`
4. **Save and Deploy** → done!

## Struktur

```
AO-PROJECT/
├── index.html                  # Entry point (~570 baris) + OG meta tags + JSON-LD
├── styles.css                  # Styling (~3150 baris, CSS variables, responsive)
├── script.js                   # Logic (~1700 baris: i18n, sidebar, tabs, data, render)
├── og-preview.png              # 1200x630 social share preview image
├── og-preview.svg              # Source SVG buat og-preview.png
├── robots.txt                  # Search engine crawl rules + sitemap pointer
├── sitemap.xml                 # XML sitemap untuk Google/Bing
├── _headers                    # Cloudflare custom HTTP headers
├── locales/
│   ├── en.json                 # English translations (~1400 baris)
│   └── id.json                 # Bahasa Indonesia translations (~1400 baris)
├── README.md                   # File ini
├── PROJECT_DOCUMENTATION.md    # Dokumentasi lengkap
├── DEPLOY_CLOUDFLARE_PAGES.md  # Panduan deploy
└── SEO_GUIDE.md                # Panduan SEO + Google Search Console setup
```

Detail per file ada di **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)**.

## Customization

- **Ubah warna**: edit CSS variable `--primary`, `--accent`, dll. di awal `styles.css`.
- **Edit konten gathering**: edit `locales/en.json` + `locales/id.json` (sinkron!).
- **Tambah bahasa**: copy salah satu JSON locale, terjemah, tambah di `script.js` + button di `index.html`.

Lengkap di PROJECT_DOCUMENTATION.md.

## Browser Support

Chrome / Edge / Firefox / Safari modern (2021+). Mobile Safari iOS 14+, Chrome Android. No polyfill.

## License

Open source. Bebas pakai dan modifikasi.

---

**Versi**: 3.3 (Mei 2026 — + SEO complete: JSON-LD structured data, canonical, hreflang, robots.txt, sitemap.xml, FAQ rich snippet, footer keyword variations)
**Last Updated**: Mei 2026
