# Kitab Pemula Albion Online — Dokumentasi Project

**Nama Project**: Kitab Pemula Albion Online (Albion Online Beginner's Codex)
**Penulis**: ABID
**Repo**: https://github.com/neotech5/AO-PROJECT
**Versi Dokumentasi**: 2.0 (Mei 2026 — termasuk Sidebar Drawer, Tabbed UI, Profession Guide)
**Lisensi**: Open source — bebas pakai & modifikasi

---

## 1. Ringkasan Project

Situs panduan farming Albion Online berbahasa dwi-bahasa (Inggris / Bahasa Indonesia) yang fokus pada **server Asia (Albion East)**. Project ini dibangun pakai **HTML, CSS, dan JavaScript murni (vanilla)** — tanpa framework, tanpa build tool, tanpa npm. Cukup buka `index.html` di browser, web jalan.

**Konsep utama**:

- Dark fantasy aesthetic dengan accent emas (`#d4af37`).
- Panduan langkah demi langkah dari pemula → mid game → end game.
- 6 profesi gathering rasmi Albion (Lumberjack, Ore Miner, Skinner, Stone Quarrier, Fiber Harvester, Fisherman) dengan spot spesifik T2-T6 Royal Continent dan T7-T8 Outlands.
- UI rapi: sidebar drawer + tabbed sections untuk kurangkan scroll panjang.
- Dwi-bahasa penuh dengan i18n custom — preferensi disimpan di `localStorage`.
- Optimasi sepenuhnya untuk server Asia (Albion East): timing 13:00–15:00 UTC peak, status server real-time.

---

## 2. Fitur Utama

| Fitur | Penjelasan |
|---|---|
| **Sidebar Drawer** | Slide-in dari kanan, ada accordion menu: Player Guide, Profesi Gathering, Quick Links. Backdrop blur + ESC untuk tutup. |
| **Tabbed UI** | 3 tab fasa pemain (Pemula / Mid Game / End Game) + 6 tab profesi (Lumberjack, Ore Miner, dll.). Klik tab → swap content. |
| **Language Switcher** | Toggle EN ↔ ID, preferensi disimpan di `localStorage`. Semua konten dinamis ikut bertukar. |
| **Asia Server Status** | Widget waktu real-time: waktu lokal + UTC, indikator danger level (Aman / Sedang / Ekstrem) berdasarkan jam aktivitas server Asia. |
| **Profession Tabs** | Setiap profesi punya: bioma sesuai, tools per tier (T2-T8), spot Royal T2-T6, spot Outlands T7-T8, tips spesifik. |
| **Guide Phases** | 3 fasa player journey: Pemula (T1-T4, 0-50 jam) → Mid Game (T5-T7, 50-300 jam) → End Game (T7-T8, 300+ jam). Setiap fasa ada tujuan, aktivitas, gear, tips. |
| **Biome Distribution** | 5 bioma Royal: Swamp (Thetford), Forest (Lymhurst), Mountain (Fort Sterling), Highland (Martlock), Steppe (Bridgewatch). |
| **Tier Progression** | Strategi per tier — T1 zona pemula sampe T8 deepest Black Zone. |
| **T8 Farming Maps** | Nama map Outlands spesifik untuk setiap resource T8. |
| **Gathering Builds** | 3 build meta 2026: Solo (Speed Escape), Tank (Group), Balanced. |
| **Event Schedule** | Jadwal Asia server: World Boss spawn, Prime Time, Window Bahaya, Periode Aktivitas Rendah. |
| **Pro Tips** | 3 kategori: Tips Efisiensi, Strategi Keamanan, Profitability Resource. |
| **Discord Link** | Footer "Penulis: ABID" → klik ABID buka Discord profile (https://discord.com/users/987184688324030474). |
| **Responsive** | Mobile, tablet, desktop semua optimal. Mobile-first design. |

---

## 3. Struktur File

```
AO-PROJECT/
├── index.html                       # Entry point HTML — header, sidebar, semua section.
├── styles.css                       # Semua styling (CSS variables, responsive, animations).
├── script.js                        # Semua logika JS: i18n, sidebar, tabs, data, render functions.
├── _headers                         # Cloudflare Pages custom headers (cache, security).
├── .gitignore                       # Git ignore list.
├── README.md                        # Quick start info.
├── PROJECT_DOCUMENTATION.md         # Dokumentasi lengkap ini.
├── DEPLOY_CLOUDFLARE_PAGES.md       # Panduan deploy Cloudflare Pages.
└── locales/
    ├── en.json                      # Translation strings English.
    └── id.json                      # Translation strings Bahasa Indonesia.
```

**Tiada `node_modules/`, `package.json`, atau `dist/`** — project ini deliberately framework-free.

---

## 4. File-by-File Walkthrough

### 4.1 `index.html` (255 baris)

Struktur HTML5 semantik. Bahagian utama:

| Section | Fungsi |
|---|---|
| `<header class="sticky-header">` | Logo "Kitab Pemula Albion Online" + Language switcher (EN/ID) + hamburger menu button. |
| `<aside class="sidebar">` | Drawer dari kanan dengan 3 accordion: Player Guide, Gathering Professions, Quick Links. |
| `<section class="hero">` | Hero section dengan background image, badge, judul, deskripsi, CTA. |
| `<section class="prime-time-tracker">` | Widget waktu lokal + UTC + status danger level. |
| `<section id="guides">` | **Tabbed**: Player progression guide (3 fasa). Render via `renderGuides()`. |
| `<div id="professions">` | **Tabbed**: 6 profesi gathering + Gatherer Overview card. Render via `renderProfessions()`. |
| `<section id="builds">` | 3 build meta gathering. Render via `renderGatheringBuilds()`. |
| `<section id="biomes">` | 5 biome card. Render via `renderBiomes()`. |
| `<section id="tiers">` | Tier progression cards (T1, T4, T6, T7, T8). Render via `renderTiers()`. |
| `<section id="t8-maps">` | T8 map names per resource. Render via `renderT8Maps()`. |
| `<section id="events">` | Asia server event schedule. Render via `renderEventSchedule()`. |
| `<section id="protips">` | Pro tips 3 kategori. Render via `renderProTips()`. |
| `<footer>` | Footer text + Discord link ABID. |

**Mekanisme i18n**: Setiap elemen yang perlu translate ada attribute `data-i18n="keyPath"`. Contoh:
```html
<h1 class="logo" data-i18n="hero.title">Kitab Pemula Albion</h1>
```
Saat language switch, fungsi `updatePageLanguage()` traverse semua `[data-i18n]` dan replace `textContent`.

### 4.2 `styles.css` (1833 baris)

Semua styling website. Highlight:

- **CSS Variables** (line 1-40): `--primary`, `--accent`, `--background`, `--text`, `--spacing-*` — gampang diubah.
- **Reset & Base** (line 41-100): box-sizing, font import.
- **Header & Logo** (~line 100-200): sticky header dengan blur backdrop.
- **Sidebar Drawer** (~line 250-400): slide-in animation, backdrop, accordion, responsive.
- **Tabs** (~line 409-504): tabbed UI styling untuk guide dan profession.
- **Hero / Sections** (~line 510-1700): semua section dengan card grids, glow effects, gradient borders.
- **Footer + ABID Link** (~line 1741-1791): footer style + Discord link dengan dashed gold underline + ↗ icon.
- **Animations** (~line 1793-1810): fadeInUp, slideIn, tabFade keyframes.
- **Media queries**: responsive breakpoints di `640px`, `768px`, `1024px`.

### 4.3 `script.js` (1104 baris)

Semua logika dinamis. Diorganisasi per section:

| Bagian | Line | Fungsi |
|---|---|---|
| **i18n core** | 1-78 | `t(key)`, `updatePageLanguage()`, `setLanguage()` — load locale JSON, replace text content. |
| **Sidebar** | 80-118 | `openSidebar()`, `closeSidebar()`, `toggleSidebar()` — handle drawer state. |
| **Tabs** | 120-188 | `activeTab` state, `getActiveTabId()`, `setActiveTab()`, `setupTabs()`, `activateTabForHash()`. |
| **Sidebar setup** | 190-258 | Event listeners untuk accordion, link click → activate tab + scroll. |
| **Guide phases data** | 260-299 | `getGuidePhases()` — return array of 3 phases dengan tujuan/aktivitas/gear/tips. |
| **Render guides** | 301-377 | `renderGuides()` — build tab buttons + panels. |
| **Profession data** | 379-501 | `getProfessions()` — return array 6 profesi dengan resource, bioma, tools per tier, spot Royal & Outlands, tips. |
| **Render profession overview** | 503-515 | `renderProfessionOverview()` — overview card di atas tabs. |
| **Render professions** | 517-624 | `renderProfessions()` — build tab buttons + panel cards. |
| **Biome data + render** | 626-724 | `getBiomeData()` + `renderBiomes()`. |
| **Tier data + render** | 726-822 | `getTierData()` + `renderTiers()`. |
| **T8 Maps data + render** | 824-860 | `getT8MapsData()` + `renderT8Maps()`. |
| **Gathering Builds** | 862-927 | `getGatheringBuilds()` + `renderGatheringBuilds()`. |
| **Event Schedule** | 929-982 | `getEventSchedule()` + `renderEventSchedule()`. |
| **Prime Time Tracker** | 984-1041 | `updatePrimeTimeTracker()` — update setiap detik, hitung danger level. |
| **Pro Tips** | 1043-1075 | `renderProTips()`. |
| **DOMContentLoaded init** | 1075+ | Initialize semua: setup sidebar, setup tabs, render all, set language, start tracker. |

**Pattern penting**:
- Data DAN render dipisah → mudah update content tanpa sentuh DOM logic.
- Semua text dinamis melalui `t()` function → konsisten dengan i18n.
- Event delegation untuk tabs → satu listener di document, scan via `closest('.tab-btn')`.
- Tab state via in-memory `activeTab` object — tidak persist antara reload.

### 4.4 `locales/en.json` & `locales/id.json` (~499 baris each)

Struktur JSON nested. Top-level keys:

```
{
  "common":   { sidebar/footer common strings },
  "nav":      { quick link labels, footer },
  "tracker":  { time labels, status text },
  "hero":     { badge, title, description, cta },
  "guides":   { title, labelGoal, labelActivities, labelEquipment, labelTips,
                beginner: { tag, title, hours, goal, activities[], equipment[], tips[] },
                midgame:  { ... },
                endgame:  { ... } },
  "professions": { title, description, overview: { title, paragraph, tips[] },
                   labelResource, labelHub, labelBiomes, labelTools, labelRoyalSpots,
                   labelOutlandsSpots, labelTips,
                   lumberjack:    { name, biome[], resource, hub, tools{T2..T8}, royalSpots[], outlandsSpots[], tips[] },
                   oreMiner:      { ... },
                   skinner:       { ... },
                   stoneQuarrier: { ... },
                   fiberHarvester:{ ... },
                   fisherman:     { ... } },
  "sidebar":  { title, all menu labels, footer },
  "biomes":   { title, description, swamp{}, forest{}, mountain{}, highland{}, steppe{} },
  "tiers":    { title, description, tier1{}, tier4{}, tier6{}, tier7{}, tier8{} },
  "t8maps":   { title, description, fiber[], wood[], hide[], stone[], ore[] },
  "builds":   { title, description, solo{}, tank{}, balanced{} },
  "events":   { title, description, worldBoss{}, primeTime{}, dangerWindow{}, lowActivity{} },
  "protips":  { title, description, efficiency{}, safety{}, profit{} },
  "footer":   { text, author, authorLabel }
}
```

Cara tambah bahasa baru (misal Malay):
1. Salin `id.json` jadi `ms.json`, terjemah semua values.
2. Edit `script.js` line ~60 (`setLanguage` function) — tambah handling untuk `'ms'`.
3. Tambah button `<button class="lang-btn" data-lang="ms">MS</button>` di header.

---

## 5. Data Flow

### 5.1 Initial Page Load

1. Browser load `index.html` → CSS + JS dimuat parallel.
2. JS lihat ada elemen `<script>` dengan id `en-locale` & `id-locale` (embed JSON di akhir HTML) → parse jadi object.
3. `DOMContentLoaded` fire → init sequence:
   - `setupSidebar()` — pasang event listeners hamburger, backdrop, ESC, accordion, link click.
   - `setupTabs()` — event delegation untuk semua `.tab-btn`.
   - Render functions: `renderGuides()`, `renderProfessions()`, `renderBiomes()`, dll.
   - `updatePageLanguage()` — apply current language (default 'en' kalau localStorage kosong).
   - Start `updatePrimeTimeTracker()` interval (refresh tiap 1 detik).

### 5.2 Language Switch

1. User klik tombol EN atau ID.
2. `setLanguage(lang)` jalan:
   - Update `currentLang` variable.
   - Simpan ke `localStorage.setItem('lang', lang)`.
   - Update active state `.lang-btn`.
   - **Call `renderGuides()`, `renderProfessions()`, dll. ulang** — karena content dinamik perlu re-render dengan bahasa baru.
   - Call `updatePageLanguage()` — replace text di semua `[data-i18n]` static.

### 5.3 Tab Switching

1. User klik `.tab-btn` (misal tab "Mid Game").
2. Event delegation di document catch click → `setActiveTab(group, targetId)`.
3. `setActiveTab`:
   - Update `activeTab[group]`.
   - Loop semua `.tab-btn[data-group="..."]` → toggle class `.active` & `aria-selected`.
   - Loop semua `.tab-panel` dalam container group → toggle class `.active`.
4. CSS `.tabs-panels > .tab-panel.active { display: block }` show panel yang aktif.

### 5.4 Sidebar Link → Tab Integration

1. User buka sidebar → klik link "Mid Game" (`href="#guide-midgame"`).
2. Event handler:
   - `e.preventDefault()` — cegah default jump anchor.
   - `activateTabForHash('#guide-midgame')` — kalau hash match tab ID, set tab active.
   - Smooth scroll ke parent section (`#guides`), supaya user lihat tab row + content panel.
   - Tutup sidebar.

---

## 6. Theme & Color Palette

Edit di `styles.css` line 1-30:

```css
:root {
    --primary:     #d4af37;     /* Gold accent — semua highlight */
    --background:  #0f0f1e;     /* Background utama dark navy */
    --card-bg:     #1a1a2e;     /* Background card */
    --text:        #e8e8f0;     /* Text utama */
    --text-muted:  rgba(232, 232, 240, 0.7);
    --border:      rgba(212, 175, 55, 0.18);
    --accent:      #d4af37;
    --danger:      #ff6b6b;
    --safe:        #51cf66;
    --warning:     #ffd43b;
    --spacing-xs:  0.25rem;
    --spacing-sm:  0.5rem;
    --spacing-md:  1rem;
    --spacing-lg:  2rem;
    --spacing-xl:  3rem;
}
```

Ubah warna primary contoh dari gold ke biru: ganti `#d4af37` jadi `#3b82f6` di semua variable yang pakai.

---

## 7. Bagaimana Edit Konten

### 7.1 Edit Tier / Spot / Tool

Buka `locales/en.json` dan `locales/id.json` → cari profesi yang dimaksud (misal `professions.lumberjack`) → edit:

```json
"lumberjack": {
  "name": "Lumberjack (Penebang Kayu)",
  "biome": ["Forest", "Highland", "Swamp"],
  "tools": {
    "T2": "Journeyman's Axe",
    ...
  },
  "royalSpots": [
    { "tier": "T2", "zone": "Blue",   "locations": "Boarwood, Wildwood" },
    ...
  ],
  "outlandsSpots": [...],
  "tips": [...]
}
```

Pastikan EDIT KEDUA FILE (`en.json` + `id.json`) supaya translasi sinkron.

### 7.2 Tambah Profesi Baru

Tidak disarankan — current 6 profesi sudah lengkap mengikut Destiny Board Albion. Kalau perlu (misal Crafting):
1. Tambah entry di `getProfessions()` `script.js`.
2. Tambah translation keys di kedua locale.
3. Tambah link sidebar di `index.html`.

### 7.3 Tambah Tab Baru

Misal tab "PvE Mob Drop" di section profession:
1. Tambah objek baru di `getProfessions()` (atau buat data structure baru `getMobDrops()`).
2. Render via existing `renderProfessions()` atau buat function render baru.
3. Tambah locale strings.

### 7.4 Edit Judul Utama

Edit `index.html` line 6 (title tag) + line 17 (logo). Edit locales: `hero.title`. Ada 3 tempat yang display title — semua pakai `data-i18n="hero.title"` jadi cukup edit locale.

---

## 8. Local Development

**Cara 1 — buka langsung**: Double-click `index.html` → ada batasan CORS, JSON load mungkin gagal di sesetengah browser.

**Cara 2 — pakai HTTP server (RECOMMENDED)**:

```bash
# Python 3
python3 -m http.server 8088

# Atau Node.js
npx http-server -p 8088

# Atau PHP
php -S localhost:8088
```

Buka `http://localhost:8088`. Edit file → save → refresh browser.

**Cara 3 — VS Code Live Server**: Install extension "Live Server", klik kanan `index.html` → "Open with Live Server". Auto-reload saat file di-save.

---

## 9. Browser Support

| Browser | Status |
|---|---|
| Chrome 90+ | Full |
| Edge 90+ | Full |
| Firefox 88+ | Full |
| Safari 14+ | Full |
| Mobile Safari iOS 14+ | Full |
| Chrome Android | Full |

Tiada polyfill diperlukan — semua API yang dipakai sudah baseline.

---

## 10. Performance

| Metric | Nilai |
|---|---|
| Total page size | ~95 KB (HTML + CSS + JS + JSON) |
| Load time (4G) | < 1 detik |
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse SEO | 100 |

Tidak ada blocking request — semua resource self-hosted kecuali Google Fonts (preconnected).

---

## 11. Aksesibility

- **Semantic HTML**: `<header>`, `<aside>`, `<section>`, `<nav>`, `<article>`, `<footer>`.
- **ARIA**: Sidebar `role="dialog" aria-modal="true"`, tabs `role="tab" aria-selected`, panels `role="tabpanel"`.
- **Keyboard**: ESC tutup sidebar, Tab focus berjalan natural, link bawah `<a href>`.
- **Color contrast**: Gold + dark navy memenuhi WCAG AA.

---

## 12. Troubleshooting

| Masalah | Cara fix |
|---|---|
| Locale tidak load (text "undefined" muncul) | Buka DevTools → Console — cek JSON parse error. Validasi JSON di [jsonlint.com](https://jsonlint.com). |
| Tab tidak switch saat diklik | Pastikan `script.js` load (Network tab) + ada `data-group` & `data-target` di setiap `.tab-btn`. |
| Sidebar tidak buka | Cek console error, pastikan ID `menuToggle` dan `sidebar` tidak diubah. |
| Translasi sebagian aja ikut | Sebagian content render dinamis via `script.js` — pastikan `setLanguage()` panggil ulang `renderGuides()`, `renderProfessions()`, dll. |
| Gambar tidak muncul | Hero background pakai CDN cloudfront — cek koneksi internet atau URL CDN valid. |

---

## 13. Roadmap / Ideas

Future enhancements yang boleh dipertimbangkan:

- **Search bar** — cari spot/profession by name.
- **Resource price tracker** — integration dengan API harga market Albion (albion-online-data.com).
- **Bookmark / favorite** — user pin profesi favourite ke top.
- **Print-friendly CSS** — buat cetak guide jadi rapi.
- **Dark/light theme toggle** — saat ini cuma dark.
- **Offline support** — Service Worker untuk PWA install.
- **More languages** — Malay, Filipino, Vietnamese (player base Asia).

---

## 14. Credits & Source

- **Albion Online**: Game oleh Sandbox Interactive.
- **Game data**: Cross-reference dengan [Albion Online Wiki](https://wiki.albiononline.com/) + Destiny Board in-game.
- **Background image**: Hosted di CloudFront (CDN).
- **Fonts**: Playfair Display + Roboto via Google Fonts.

---

**Repo**: https://github.com/neotech5/AO-PROJECT
**Branch utama**: `main`
**PR sidebar + tabs**: https://github.com/neotech5/AO-PROJECT/pull/1
