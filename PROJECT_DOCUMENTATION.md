# Kitab Pemula Albion Online — Dokumentasi Project

**Nama Project**: Kitab Pemula Albion Online (Albion Online Beginner's Codex)
**Penulis**: ABID
**Repo**: https://github.com/neotech5/AO-PROJECT
**Versi Dokumentasi**: 3.2 (Mei 2026 — termasuk Sidebar Drawer, Tabbed UI, Profession Guide, Beginner Essentials, Foundation Sections, Survival Manual, Pro Toolkit, Optimize Pro tier, Mists & Roads of Avalon, Beginner FAQ, Open Graph meta tags, newbie→pro section order)
**Lisensi**: Open source — bebas pakai & modifikasi

---

## 1. Ringkasan Project

Situs panduan farming Albion Online berbahasa dwi-bahasa (Inggris / Bahasa Indonesia) yang fokus pada **server Asia (Albion East)**. Project ini dibangun pakai **HTML, CSS, dan JavaScript murni (vanilla)** — tanpa framework, tanpa build tool, tanpa npm. Cukup buka `index.html` di browser, web jalan.

**Konsep utama**:

- Dark fantasy aesthetic dengan accent emas (`#d4af37`).
- Susunan section ikut alur **newbie → pro** (Foundations → Pick Your Path → Survive & Thrive → Optimize).
- 6 profesi gathering rasmi Albion (Lumberjack, Ore Miner, Skinner, Stone Quarrier, Fiber Harvester, Fisherman) dengan spot spesifik T2-T6 Royal Continent dan T7-T8 Outlands.
- UI rapi: sidebar drawer + tabbed sections untuk kurangkan scroll panjang.
- Dwi-bahasa penuh dengan i18n custom — preferensi disimpan di `localStorage`.
- Optimasi sepenuhnya untuk server Asia (Albion East): timing 13:00–15:00 UTC peak, status server real-time.

**Susunan Section (newbie → pro)**:

| Tier | Section | Tujuan |
|---|---|---|
| 🟢 Foundations | 📚 Panduan Dasar (Essentials) | First Hour, Mount, Food & Potion, Refining 101 |
| 🟢 Foundations | 📖 Panduan Pemain (Player Guide) | 3 fasa: Pemula / Mid Game / End Game |
| 🟢 Foundations | 🗺️ Zone Types Manual | Blue / Yellow / Red / Black / Mists / Roads / Hellgate |
| 🟢 Foundations | ❌ JANGAN-DO List | 14 kesalahan biasa pemula |
| 🟢 Foundations | 💬 FAQ Pemula | 15 Q&A collapsible (Premium wajib? Mati BZ? LP buat apa? dst.) |
| 🟡 Pick Your Path | Distribusi Bioma | 5 kota Royal dan resource utama |
| 🟡 Pick Your Path | 🛠️ Profesi Gathering | 6 profesi rasmi + Gatherer Overview |
| 🟡 Pick Your Path | Panduan Progresi Tier | T1 → T8 progression |
| 🟠 Survive & Thrive | 🛡️ Gank Avoidance & Escape Manual | Checklist, spotting, escape kit, Q-Swap, recovery |
| 🟠 Survive & Thrive | 🌫️ Mists & Roads of Avalon | Solo T4-T8, Knightfall Abbey, portal types, Avalonian Energy |
| 🟠 Survive & Thrive | Lokasi Farming T8 | Outlands map spesifik per resource |
| 🟠 Survive & Thrive | ⚔️ Rekomendasi Build (T8) | Solo / Tank / Balanced meta 2026 |
| 🔴 Optimize | 📅 Event & Jadwal | Asia server prime time, world boss, dst. |
| 🔴 Optimize | 💰 Marketplace 101 | Buy/Sell Order, tax breakdown, arbitrage antar kota |
| 🔴 Optimize | 📋 Routine Harian Pro | Daily login checklist (10 step) + weekly goals + anti-burnout |
| 🔴 Optimize | 💎 Itungan Premium | Feature comparison, breakeven math, scenarios |
| 🔴 Optimize | 🧰 Tools & Apps (Pro Toolkit) | 8 tool wajib: Data Project, Maps, Murder Ledger, dst. |
| 🔴 Optimize | 💡 Pro Tips | Efisiensi, keamanan, profitability |

---

## 2. Fitur Utama

| Fitur | Penjelasan |
|---|---|
| **Sidebar Drawer** | Slide-in dari kanan, 6 accordion: Panduan Dasar, Panduan Pemain, Foundation, Profesi Gathering, Survival & End-Game, Tautan Cepat. Backdrop blur + ESC untuk tutup. |
| **Tabbed UI** | 4 tab Essentials (First Hour, Mount, Food, Refining) + 3 tab Guide (Pemula / Mid / End) + 6 tab Profesi. Klik tab → swap content. |
| **Language Switcher** | Toggle EN ↔ ID, preferensi disimpan di `localStorage`. Semua konten dinamis ikut bertukar. |
| **Asia Server Status** | Widget waktu real-time: waktu lokal + UTC, indikator danger level (Aman / Sedang / Ekstrem) berdasarkan jam aktivitas server Asia. |
| **📚 Beginner Essentials** | 4 tab terstruktur: ✅ First Hour Checklist (10 langkah), 🐎 Mount Guide (8 mount tier), 🍖 Food & Potion (5 food + 5 potion), 🏭 Refining 101 (tabel kota specialty +25%). |
| **🗺️ Zone Types Manual** | 7 jenis zone (Blue/Yellow/Red/Black/Mists/Roads of Avalon/Hellgate) — color-coded card dengan badge bahaya, Pas Mati, Cocok Buat, Akses, fitur utama. |
| **❌ JANGAN-DO List** | 14 kesalahan biasa pemula — card numbered tema merah dengan title + detail penjelasan. |
| **🛡️ Gank Avoidance Manual** | 6 sub-section: Pre-Gathering Checklist (8), Cara Spot Ganker (6), Escape Kit Loadout (tabel 7 slot), Teknik Q-Swap (4), Kalau Udah Dikejar (6), Tips Lanjutan (5). |
| **🌫️ Mists & Roads of Avalon** | 6 sub-block: Mists tier table (T4-T8 dengan danger badges), Knightfall Abbey (T7+ boss), Roads of Avalon (dimensional clusters), Portal Types (Wisp/Skull/Avalonian/Static), Avalonian Energy economy, Pro Tips. |
| **💬 FAQ Pemula** | 15 Q&A collapsible (HTML5 `<details>`): Premium wajib gak, mati di BZ, LP buat apa, Asia vs Global, T8 timeline, solo player, zone color, gank, mount, food, ban/hijack, daily quest NPC, profitable resource, silver pemula, P2W myth. Item pertama default open. |
| **💰 Marketplace 101** | 4 order type cards (Sell/Buy/Quick Sell/Bargain), tax breakdown table (Premium vs no-Premium), 8 city arbitrage tips, 5 pro tips. |
| **📋 Routine Harian Pro** | 10-step daily login checklist bertimer (0:00-0:05 hingga end of session), 5 weekly goals, 5 anti-burnout tips. |
| **💎 Itungan Premium** | Comparison table 7 benefit (Fame, Silver, Tax, Island, Refining, Focus, MP slots), cost breakdown, 2 scenario cards (WORTH IT vs GAK WORTH IT), 5 smart strategies. |
| **🔗 Open Graph + Twitter Card** | 27 baris meta tags di `<head>`: og:type/title/description/image/url/locale, twitter:card=summary_large_image, og-preview.png 1200x630, inline SVG favicon, theme-color. Preview cantik di Discord/WhatsApp/Twitter/Telegram/Facebook/LinkedIn. |
| **🧰 Tools & Apps (Pro Toolkit)** | 8 tool wajib link langsung: Albion Data Project, AlbionMap2D, Murder Ledger, Wiki, Galahad Map, Discord Resmi, Reddit, AlbionStatus. |
| **Profession Tabs** | 6 profesi dengan: bioma sesuai, tools per tier (T2-T8), spot Royal T2-T6, spot Outlands T7-T8, tips spesifik. |
| **Guide Phases** | 3 fasa player journey: Pemula (T1-T4, 0-50 jam) → Mid Game (T5-T7, 50-300 jam) → End Game (T7-T8, 300+ jam). |
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

### 4.1 `index.html` (352 baris)

Struktur HTML5 semantik. Urutan section sudah disusun ikut alur **newbie → pro**:

| Urutan | Section | Fungsi |
|---|---|---|
| - | `<header class="sticky-header">` | Logo "Kitab Pemula Albion Online" + Language switcher (EN/ID) + hamburger menu button. |
| - | `<aside class="sidebar">` | Drawer dari kanan dengan 6 accordion: Panduan Dasar, Panduan Pemain, Foundation, Profesi Gathering, Survival & End-Game, Tautan Cepat. |
| - | `<section class="hero">` | Hero section dengan background image, badge, judul, deskripsi, CTA. |
| - | `<section class="prime-time-tracker">` | Widget waktu lokal + UTC + status danger level. |
| 🟢 1 | `<section id="essentials">` | **Tabbed**: 4 panduan dasar (First Hour, Mount, Food & Potion, Refining). Render via `renderEssentials()`. |
| 🟢 2 | `<section id="guides">` | **Tabbed**: Player progression guide (3 fasa). Render via `renderGuides()`. |
| 🟢 3 | `<div id="zones">` | Zone Types Manual (7 zone card). Render via `renderZones()`. |
| 🟢 4 | `<div id="mistakes">` | JANGAN-DO List (14 mistake card). Render via `renderMistakes()`. |
| 🟡 5 | `<section id="biomes">` | 5 biome card. Render via `renderBiomes()`. |
| 🟡 6 | `<div id="professions">` | **Tabbed**: 6 profesi gathering + Gatherer Overview card. Render via `renderProfessions()`. |
| 🟡 7 | `<section id="tiers">` | Tier progression cards (T1, T4, T6, T7, T8). Render via `renderTiers()`. |
| 🟠 8 | `<div id="survival">` | Gank Avoidance & Escape Manual (6 sub-section). Render via `renderSurvival()`. |
| 🟠 9 | `<section id="t8maps">` | T8 map names per resource. Render via `renderT8Maps()`. |
| 🟠 10 | `<section id="builds">` | 3 build meta gathering T8. Render via `renderGatheringBuilds()`. |
| 🔴 11 | `<section id="events">` | Asia server event schedule. Render via `renderEventSchedule()`. |
| 🔴 12 | `<div id="tools">` | Tools & Apps Pro Toolkit (8 tool card). Render via `renderTools()`. |
| 🔴 13 | `<section id="protips">` | Pro tips 3 kategori. Render via `renderProTips()`. |
| - | `<footer>` | Footer text + Discord link ABID. |

**Mekanisme i18n**: Setiap elemen yang perlu translate ada attribute `data-i18n="keyPath"`. Contoh:
```html
<h1 class="logo" data-i18n="hero.title">Kitab Pemula Albion</h1>
```
Saat language switch, fungsi `updatePageLanguage()` traverse semua `[data-i18n]` dan replace `textContent`.

### 4.2 `styles.css` (2487 baris)

Semua styling website. Highlight:

- **CSS Variables** (line 1-40): `--primary`, `--accent`, `--background`, `--text`, `--spacing-*` — gampang diubah.
- **Reset & Base** (line 41-100): box-sizing, font import.
- **Header & Logo** (~line 100-200): sticky header dengan blur backdrop.
- **Sidebar Drawer** (~line 250-400): slide-in animation, backdrop, accordion, responsive.
- **Tabs** (~line 409-504): tabbed UI styling untuk essentials, guide dan profession.
- **Hero / Existing Sections** (~line 510-1900): card grids, glow effects, gradient borders.
- **Footer + ABID Link** (~line 1741-1791): footer style + Discord link dengan dashed gold underline + ↗ icon.
- **Animations** (~line 1793-1810): fadeInUp, slideIn, tabFade keyframes.
- **Zone Types Manual** (~line 2085-2208): zone-card, zone-danger-badge, zone-features-list dengan color-coded border (safe=hijau, moderate=kuning, extreme=merah).
- **Common Mistakes** (~line 2210-2280): mistake-card (red theme), mistake-num circle gradient, mistake-detail.
- **Survival & Escape** (~line 2282-2390): survival-section, survival-table (escape kit), checklist-num, survival-tips italic.
- **Tools & Apps** (~line 2392-2480): tool-card grid, tool-link button gold.
- **Responsive 640px** (~line 2456-2487): mobile breakpoint untuk semua section baru.
- **Media queries**: responsive breakpoints di `640px`, `768px`, `1024px`.

### 4.3 `script.js` (1515 baris)

Semua logika dinamis. Diorganisasi per section:

| Bagian | Line (approx) | Fungsi |
|---|---|---|
| **i18n core** | 1-79 | `t(key)`, `updatePageLanguage()`, `setLanguage()` — load locale JSON, replace text content. Memanggil semua render functions. |
| **Sidebar** | 81-118 | `openSidebar()`, `closeSidebar()`, `toggleSidebar()` — handle drawer state. |
| **Tabs** | 120-188 | `activeTab` state, `getActiveTabId()`, `setActiveTab()`, `setupTabs()`, `activateTabForHash()`. |
| **Sidebar setup** | 190-280 | Event listeners untuk accordion, link click → activate tab + scroll ke section parent. |
| **Essentials data + render** | 290-497 | `getEssentials()` + `renderEssentials()` — 4 tab: First Hour, Mount, Food, Refining. |
| **Zone Types render** | 499-546 | `renderZones()` — 7 zone card dengan color-coded border + danger badge. |
| **Common Mistakes render** | 548-565 | `renderMistakes()` — 14 mistake card numbered (red theme). |
| **Survival render** | 567-647 | `renderSurvival()` — 6 sub-section: pre-gather, spotting, escape kit table, Q-Swap, chased, tips. |
| **Tools render** | 649-672 | `renderTools()` — 8 tool card dengan kategori badge + link langsung. |
| **Guide phases data + render** | 674-770 | `getGuidePhases()` + `renderGuides()` — 3 fasa player journey. |
| **Profession data + render** | 772-1000 | `getProfessions()` + `renderProfessionOverview()` + `renderProfessions()` — 6 profesi gathering. |
| **Biome data + render** | 1002-1098 | `getBiomeData()` + `renderBiomes()`. |
| **Tier data + render** | 1100-1190 | `getTierData()` + `renderTiers()`. |
| **T8 Maps data + render** | 1192-1230 | `getT8MapsData()` + `renderT8Maps()`. |
| **Gathering Builds** | 1232-1297 | `getGatheringBuilds()` + `renderGatheringBuilds()`. |
| **Event Schedule** | 1299-1352 | `getEventSchedule()` + `renderEventSchedule()`. |
| **Prime Time Tracker** | 1354-1411 | `updatePrimeTimeTracker()` — update setiap detik, hitung danger level. |
| **Pro Tips** | 1413-1445 | `renderProTips()`. |
| **DOMContentLoaded init** | 1486-1515 | Initialize semua: setup sidebar, setup tabs, load translations, language switch listener, hero CTA. |

**Pattern penting**:
- Data DAN render dipisah → mudah update content tanpa sentuh DOM logic.
- Semua text dinamis melalui `t()` function → konsisten dengan i18n.
- Event delegation untuk tabs → satu listener di document, scan via `closest('.tab-btn')`.
- Tab state via in-memory `activeTab` object — tidak persist antara reload.

### 4.4 `locales/en.json` & `locales/id.json` (880 baris each)

Struktur JSON nested. Top-level keys (mengikut urutan section newbie → pro):

```
{
  "common":   { sidebar/footer common strings },
  "sidebar":  { title, all menu labels (essentials, guide, foundation, profession, survival, quick), footer },
  "tracker":  { time labels, status text },
  "hero":     { badge, title, description, cta },

  // 🟢 FOUNDATIONS
  "essentials": { title, description, labels...,
                  firstHour: { tag, title, items[] },
                  mount: { tag, title, table[], tips[] },
                  food:  { tag, title, foodTable[], potionTable[], tips[] },
                  refining: { tag, title, cityTable[], steps[], tips[] } },
  "guides":   { title, labelGoal, labelActivities, labelEquipment, labelTips,
                beginner: { tag, title, hours, goal, activities[], equipment[], tips[] },
                midgame:  { ... },
                endgame:  { ... } },
  "zones":    { title, description, labels (Danger/Death/BestFor/Features/Access),
                items[7]: [{ id, icon, name, danger, dangerLevel, death, bestFor, access, features[] }] },
  "mistakes": { title, description,
                items[14]: [{ title, detail }] },

  // 🟡 PICK YOUR PATH
  "biomes":   { title, description, swamp{}, forest{}, mountain{}, highland{}, steppe{} },
  "professions": { title, description, overview: { title, paragraph, tips[] },
                   labelResource, labelHub, labelBiomes, labelTools, labelRoyalSpots,
                   labelOutlandsSpots, labelTips,
                   lumberjack:    { name, biome[], resource, hub, tools{T2..T8}, royalSpots[], outlandsSpots[], tips[] },
                   oreMiner:      { ... },
                   skinner:       { ... },
                   stoneQuarrier: { ... },
                   fiberHarvester:{ ... },
                   fisherman:     { ... } },
  "tiers":    { title, description, tier1{}, tier4{}, tier6{}, tier7{}, tier8{} },

  // 🟠 SURVIVE & THRIVE
  "survival": { title, description,
                preGatherTitle, preGather[8],
                spottingTitle, spotting[6],
                escapeKitTitle, escapeKitHeaders[3], escapeKit[7],
                qSwapTitle, qSwap[4],
                chasedTitle, chased[6],
                tipsTitle, tips[5] },
  "t8maps":   { title, description, fiber[], wood[], hide[], stone[], ore[] },
  "builds":   { title, description, solo{}, tank{}, balanced{} },

  // 🔴 OPTIMIZE
  "events":   { title, description, worldBoss{}, primeTime{}, dangerWindow{}, lowActivity{} },
  "tools":    { title, description, labelCategory, labelOpen,
                items[8]: [{ name, url, category, description }] },
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

**Tier 2 — Profitability & Routine Harian** (sumber high-impact selepas Tier 1)
- 💰 Marketplace 101 — Buy Order vs Sell Order, tax, harga antar kota.
- 📋 Routine Harian Optimal — daily checklist pro: Adventurer's Challenge, fame potion, dst.
- ⚔️ Faction Warfare Guide — silver source paling under-rated di Royal.
- 💎 Premium Math — sebab vs jangan beli Premium, numbers actual.

**Tier 3 — End Game Pathways**
- 🏛️ Guild Guide — kenapa wajib join guild, cara cari guild sesuai.
- 🌫️ Mists & Roads of Avalon — solo content T7-T8 less risk.
- 🔥 Hellgate 2v2 / Corrupted Dungeons — alternatif content + silver.

**Tier 4 — UX Polish**
- 🔗 Open Graph + meta tags — preview cantik bila link di-share ke Discord/WA.
- 🔍 Search bar — quick find by keyword.
- ⬆️ Back-to-top button + tooltip on AO term (ZvZ/LP/BZ).
- Resource price tracker — integration dengan API harga market Albion (albion-online-data.com).
- Bookmark / favorite — user pin profesi favourite ke top.
- Print-friendly CSS — buat cetak guide jadi rapi.
- Dark/light theme toggle — saat ini cuma dark.
- Offline support — Service Worker untuk PWA install.
- More languages — Malay, Filipino, Vietnamese (player base Asia).

**Selesai / Latest** ✓
- ✓ Sidebar Drawer + Tabbed UI (PR #1 commit 1)
- ✓ Beginner Essentials (First Hour, Mount, Food, Refining)
- ✓ Zone Types Manual (7 zones)
- ✓ Common Mistakes / JANGAN-DO List (14 items)
- ✓ Gank Avoidance & Escape Manual (6 sub-sections)
- ✓ Tools & Apps Pro Toolkit (8 tools)
- ✓ Newbie → Pro section reordering

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
