# Kitab Pemula Albion Online

> **Albion Online Beginner's Codex** — Panduan farming Albion Online untuk server Asia (Albion East). Vanilla HTML/CSS/JS, dwi-bahasa EN/ID, dark fantasy theme.

**Live**: deploy via Cloudflare Pages → lihat [DEPLOY_CLOUDFLARE_PAGES.md](DEPLOY_CLOUDFLARE_PAGES.md)
**Repo**: https://github.com/neotech5/AO-PROJECT
**Penulis**: ABID — [Discord](https://discord.com/users/987184688324030474)

---

## Fitur

- 📖 **Player Guide** — 3 fasa (Pemula / Mid Game / End Game) dalam tabbed UI
- 🛠️ **6 Gathering Professions** — Lumberjack, Ore Miner, Skinner, Stone Quarrier, Fiber Harvester, Fisherman
- 🗺️ **Spot Spesifik T2-T6** di Royal Continent + **T7-T8** di Outlands
- 🌐 **Dwi-bahasa** — EN / ID (Bahasa Indonesia santai)
- 🕐 **Asia Server Status** — real-time clock + danger level indicator
- 📱 **Responsive** — mobile, tablet, desktop
- ⚡ **No build step** — pure HTML/CSS/JS, langsung deploy

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
├── index.html                  # Entry point
├── styles.css                  # Styling (1833 baris, CSS variables, responsive)
├── script.js                   # Logic (i18n, sidebar, tabs, data, render)
├── _headers                    # Cloudflare custom HTTP headers
├── locales/
│   ├── en.json                 # English translations
│   └── id.json                 # Bahasa Indonesia translations
├── README.md                   # File ini
├── PROJECT_DOCUMENTATION.md    # Dokumentasi lengkap
└── DEPLOY_CLOUDFLARE_PAGES.md  # Panduan deploy
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

**Versi**: 2.0 (Mei 2026)
**Last Updated**: Mei 2026
