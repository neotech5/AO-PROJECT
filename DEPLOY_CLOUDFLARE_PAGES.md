# Panduan Deploy ke Cloudflare Pages (via Dashboard)

**Target audience**: Pemula yang belum pernah deploy ke Cloudflare Pages.
**Estimasi waktu**: 10–15 menit (sudah termasuk register kalau belum punya akun).
**Hasil akhir**: Website "Kitab Pemula Albion Online" live di URL public gratis dari Cloudflare (contoh: `kitab-albion.iqooz-dev.web.id`).

---

## Ringkasan Cara Kerja

Cloudflare Pages adalah layanan hosting **gratis** dari Cloudflare khusus untuk static site (HTML/CSS/JS). Cara kerjanya:

1. Anda upload file project (atau connect repo GitHub) ke Cloudflare.
2. Cloudflare host file di CDN global mereka — auto fast di seluruh dunia.
3. Anda dapat URL otomatis (`*.pages.dev`) atau bisa custom domain.

**Project ini cocok 100%** karena murni HTML/CSS/JS — tidak perlu build step.

---

## Pilihan Method Deploy

Ada **3 cara** deploy. Pilih yang paling cocok untuk Anda:

| Method | Kelebihan | Cocok untuk |
|---|---|---|
| **Method 1 — Direct Upload (Drag & Drop)** | Paling cepat, tidak perlu Git | Anda mau coba dulu / cuma deploy sekali |
| **Method 2 — Connect Git (Recommended)** | Auto-deploy setiap push commit, ada preview deploy per branch | Anda mau update website terus-menerus |
| **Method 3 — Wrangler CLI** | Untuk advanced user | Mau scripted deployment |

**Disarankan: Method 2** (Connect Git) — sekali setup, semua push ke GitHub auto-deploy ke production. Tidak perlu manual upload lagi.

---

## PERSIAPAN AWAL (wajib untuk semua method)

### Step 0.1 — Buat akun Cloudflare (kalau belum ada)

1. Buka browser → kunjungi **https://dash.cloudflare.com/sign-up**
2. Isi email + password → klik **Create account**.
3. Verifikasi email — buka inbox, klik link verifikasi dari Cloudflare.
4. Login ke dashboard di **https://dash.cloudflare.com/**

> Tidak perlu kasih kartu kredit — Cloudflare Pages free tier sudah cukup besar (500 build/bulan, 100 custom domain, unlimited bandwidth).

### Step 0.2 — Siapkan file project

Pastikan Anda punya folder project lengkap dengan struktur:

```
AO-PROJECT/
├── index.html
├── styles.css
├── script.js
├── _headers
├── locales/
│   ├── en.json
│   └── id.json
└── (file dokumentasi lain — boleh ada/tiada)
```

Kalau Anda pakai source dari ZIP backup — extract dulu ZIP-nya ke folder kosong.

---

## METHOD 1 — Direct Upload (Drag & Drop)

**Paling cepat. Cocok kalau Anda baru mau coba.**

### Step 1.1 — Buka Cloudflare Pages

1. Login ke **https://dash.cloudflare.com/**
2. Di sidebar kiri, scroll cari menu **Workers & Pages**. Klik.
3. Di tab atas, klik **Create application**.
4. Pilih tab **Pages** (bukan Workers).
5. Klik tombol **Upload assets** (jangan klik "Connect to Git" dulu).

### Step 1.2 — Buat project baru

1. **Project name**: Isi nama project, misalnya `kitab-albion`. Nama ini akan jadi subdomain default-nya:
   - Contoh: nama `kitab-albion` → URL default jadi `kitab-albion.pages.dev` (sebelum custom domain di-attach)
   - Aturan: huruf kecil, angka, dan tanda dash (-) saja. Tidak boleh ada spasi.
2. Klik **Create project**.

### Step 1.3 — Upload file

1. Anda akan lihat area drag-and-drop dengan tulisan **"Drag and drop your site output folder here..."**
2. Di komputer, buka folder project Anda (yang berisi `index.html`).
3. **PENTING**: Drag isi folder (bukan folder-nya sendiri). Pilih semua file: `index.html`, `styles.css`, `script.js`, `_headers`, dan folder `locales/`.
   - Cara mudah: buka folder → tekan `Ctrl+A` (Windows/Linux) atau `Cmd+A` (Mac) untuk select semua → drag ke area upload.
4. Tunggu progress bar selesai (10–30 detik).
5. Klik **Deploy site**.

### Step 1.4 — Selesai!

1. Cloudflare akan build dan deploy (biasanya < 30 detik).
2. Setelah selesai, Anda dapat link seperti `https://kitab-albion.iqooz-dev.web.id` — klik untuk buka website Anda.
3. **Done!** Website Anda sudah live di internet.

> **Catatan**: Setiap kali ada update file, Anda harus re-upload semua file (drag-and-drop ulang). Kalau Anda mau auto-update setiap push GitHub, pakai **Method 2** di bawah.

---

## METHOD 2 — Connect Git Repository (RECOMMENDED)

**Sekali setup, auto-deploy setiap push commit ke GitHub.**

### Step 2.1 — Pastikan project sudah di GitHub

Kalau belum, push project ke GitHub dulu. Kalau Anda pakai repo `neotech5/AO-PROJECT` yang ada, skip step ini. Lompat ke Step 2.2.

> Repo ini sudah ada di: **https://github.com/neotech5/AO-PROJECT**

### Step 2.2 — Buka Cloudflare Pages

1. Login **https://dash.cloudflare.com/**
2. Sidebar kiri → **Workers & Pages**.
3. Klik **Create application** → tab **Pages** → klik **Connect to Git**.

### Step 2.3 — Connect GitHub account

1. Klik **Connect GitHub**.
2. Login ke GitHub kalau diminta.
3. GitHub akan tanya: **"Where do you want to install Cloudflare Pages?"**
   - Pilih akun GitHub Anda (`neotech5` atau yang relevan).
4. **"Repository access"** — pilih salah satu:
   - **All repositories** (semua repo bisa diakses Cloudflare) — recommended kalau Anda solo developer.
   - **Only select repositories** (pilih spesifik) — lebih aman; pilih repo `AO-PROJECT`.
5. Klik **Install & Authorize**.
6. Anda akan otomatis dikembalikan ke Cloudflare Dashboard.

### Step 2.4 — Pilih repository

1. Di Cloudflare, akan muncul daftar repo Anda.
2. Cari `AO-PROJECT` → klik **Begin setup**.

### Step 2.5 — Konfigurasi build settings

Ini bagian yang **PENTING**. Isi sesuai screenshot berikut:

| Field | Isi dengan | Penjelasan |
|---|---|---|
| **Project name** | `kitab-albion` | Akan jadi subdomain default `kitab-albion.pages.dev`. Pakai huruf kecil + dash. |
| **Production branch** | `main` | Branch yang akan auto-deploy ke production URL. Biasanya `main`. |
| **Framework preset** | **None** (atau "None / Static HTML") | Project ini tidak pakai framework. JANGAN pilih React/Vue/Next.js. |
| **Build command** | **(kosong)** | Project ini static — tidak perlu build. Biarkan kosong. |
| **Build output directory** | `/` (atau kosong) | File `index.html` ada di root, bukan di folder `dist/` atau `build/`. |
| **Root directory** | **(biarkan default)** | Hanya isi kalau project Anda di subfolder. Untuk repo ini, biarkan kosong. |
| **Environment variables** | **(skip / kosong)** | Tidak diperlukan untuk project ini. |

> **KESALAHAN UMUM**: Kalau Anda salah pilih Framework preset (misal pilih React), Cloudflare akan coba `npm run build` dan deploy akan fail karena tidak ada `package.json`. Pastikan **None**.

3. Klik **Save and Deploy**.

### Step 2.6 — Tunggu first deploy

1. Cloudflare mulai build (sebenarnya cuma upload — tidak ada build step). Biasanya selesai < 1 menit.
2. Anda lihat log deployment real-time. Tunggu sampai status **Success**.
3. Setelah selesai, klik tombol **Visit site** atau buka URL `https://kitab-albion.iqooz-dev.web.id`.

### Step 2.7 — Done! Auto-deploy aktif

Mulai sekarang:
- **Setiap push ke branch `main`** → auto-deploy ke production URL.
- **Setiap push ke branch lain** (misal `dev`, `feature/xxx`) → Cloudflare buat **preview deployment** dengan URL unik (`https://<branch>.<project>.pages.dev`). Ini bagus untuk review perubahan sebelum merge.
- **Setiap PR** dapat preview URL otomatis (komentar di PR oleh Cloudflare bot).

---

## METHOD 3 — Wrangler CLI (Advanced)

**Cocok kalau Anda mau scripted deployment dari terminal.**

### Step 3.1 — Install Node.js

Pastikan Node.js v18+ terpasang. Cek di terminal:
```bash
node --version
```

Kalau belum, download dari **https://nodejs.org/**.

### Step 3.2 — Install Wrangler

```bash
npm install -g wrangler
```

### Step 3.3 — Login

```bash
wrangler login
```

Browser akan terbuka — login ke Cloudflare → authorize.

### Step 3.4 — Deploy

Dari folder project:
```bash
cd /path/to/AO-PROJECT
wrangler pages deploy . --project-name=kitab-albion
```

- Pertama kali jalankan, Wrangler akan tanya production branch — ketik `main`.
- Wrangler upload semua file, dapat URL deployment.

### Step 3.5 — Update

Setiap kali mau update, jalankan command yang sama. Wrangler akan re-deploy.

---

## CONFIGURATION SETELAH DEPLOY

### A. Update Open Graph URL setelah deploy (Recommended)

Project ini default udah di-set buat production URL `https://kitab-albion.iqooz-dev.web.id` di blok `<!-- Open Graph -->` `index.html`. Kalo kamu deploy ke URL yang **berbeda**, edit `index.html`:

1. Buka `index.html` → cari blok meta `<!-- Open Graph -->`.
2. Ganti `og:url` ke URL actual deployment kamu (contoh `https://kitab-albion.pages.dev/`).
3. Ganti `og:image`, `og:image:secure_url`, `twitter:image` ke `https://YOURDOMAIN/og-preview.png` (file `og-preview.png` auto-deploy ke root).
4. Commit + push → Cloudflare auto-deploy.
5. Test pake validator: https://opengraph.dev/ — paste URL kamu, klik Check.

**Penting**: pas validator pertama kali scrape, gambar mungkin belum ke-cache. Jalanin Facebook Sharing Debugger atau Twitter Card Validator buat force refresh.

Pas link kamu dishare ke Discord/WhatsApp/Telegram, bakal muncul card cantik dengan thumbnail + judul + deskripsi.

### B. Custom Domain (Opsional)

Mau pakai domain sendiri (misal `albion.namamu.com`) bukan `*.pages.dev`?

1. Cloudflare Dashboard → **Workers & Pages** → klik project Anda.
2. Tab **Custom domains** → klik **Set up a custom domain**.
3. Isi domain Anda (misal `albion.namamu.com`) → klik **Continue**.
4. Cloudflare kasih instruction DNS:
   - **Kalau domain Anda sudah di-manage Cloudflare**: Otomatis added — tunggu 1–5 menit.
   - **Kalau domain di-host di provider lain**: Anda perlu tambah CNAME record di DNS provider Anda. Cloudflare akan kasih CNAME target (contoh `kitab-albion.iqooz-dev.web.id`).
5. Tunggu DNS propagate (5 menit – 24 jam).
6. SSL certificate auto-generated oleh Cloudflare.

### C. Environment Variables (Tidak diperlukan untuk project ini)

Cuma diperlukan kalau project Anda pakai API key, dll. Project Kitab Pemula tidak butuh.

### D. Build & Deploy Settings (Recommended pengaturan)

Di tab **Settings → Builds & deployments**:

- **Build configurations**:
  - Build command: kosong
  - Build output directory: `/`
  - Root directory: kosong
- **Branch deployments**:
  - Production branch: `main`
  - Preview branches: **All non-production branches** (default — bagus untuk PR preview)

### E. _headers File (sudah ada di repo)

File `_headers` di root project mengontrol HTTP headers. Cloudflare Pages otomatis baca file ini saat deploy. Tidak perlu config apa-apa di dashboard.

Isi `_headers` di project ini:
```
/*
  Cache-Control: public, max-age=3600
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
```

Artinya: semua file di-cache 1 jam, plus security headers.

---

## TROUBLESHOOTING

### Masalah 1: Build gagal dengan error "Could not find package.json"

**Sebab**: Framework preset bukan **None**.

**Fix**: 
1. Cloudflare Dashboard → project Anda → **Settings → Builds & deployments**.
2. Klik **Edit** di Build configurations.
3. Set Framework preset → **None**.
4. Build command → kosong. Build output directory → `/`.
5. Klik **Save**.
6. Trigger redeploy: tab **Deployments** → klik latest deploy → **Retry deployment**.

### Masalah 2: Website live tapi gambar / CSS / JS tidak load (404)

**Sebab**: File `_headers` atau path salah, atau case sensitivity (Linux server case-sensitive).

**Fix**:
1. Buka DevTools (F12) → tab **Network** → reload page.
2. Lihat file mana yang 404.
3. Cek nama file di repo — pastikan persis sama (`styles.css` bukan `Styles.css`).
4. Pastikan path di `index.html` tidak pakai absolute path (misalnya `/Users/abc/styles.css`).

### Masalah 3: Translasi tidak load (text "undefined" atau English semua)

**Sebab**: File JSON di `locales/` tidak ke-include saat deploy.

**Fix**:
1. Cek di repo GitHub — pastikan `locales/en.json` dan `locales/id.json` ada di branch yang di-deploy.
2. Cek deployment log di Cloudflare Dashboard — pastikan file ter-list.
3. Cek di browser DevTools → Network — apakah request ke `/locales/en.json` return 200 atau 404.

### Masalah 4: Update tidak muncul di website setelah push

**Sebab**: Cache browser atau Cloudflare cache.

**Fix**:
1. Hard refresh browser: `Ctrl+Shift+R` (Windows/Linux) atau `Cmd+Shift+R` (Mac).
2. Atau di Cloudflare Dashboard → project → **Caching** → **Purge Cache**.
3. Pastikan Cloudflare deployment status **Success** (bukan failing).

### Masalah 5: Custom domain tidak resolve

**Sebab**: DNS belum propagate atau CNAME salah.

**Fix**:
1. Cek DNS propagation di **https://dnschecker.org/** — masukan domain Anda.
2. Pastikan DNS record CNAME mengarah ke `<project>.pages.dev`.
3. Tunggu sampai 24 jam untuk full propagation.

### Masalah 6: "404 Not Found" saat refresh di sub-route

**Project ini tidak pakai client-side routing**, jadi seharusnya tidak terjadi. Tapi kalau ada masalah:
- Pastikan semua link internal `<a href="#section">` bukan `<a href="/section">`.

---

## TIPS TAMBAHAN

### Tip 1: Pakai branch `dev` untuk testing

Buat branch `dev` di GitHub. Push perubahan dulu ke `dev` → preview URL muncul (`dev.kitab-albion.iqooz-dev.web.id`). Setelah OK, merge ke `main` untuk production deploy.

### Tip 2: Monitor analytics

Cloudflare Dashboard → project Anda → tab **Analytics**. Bisa lihat:
- Jumlah visitor (gratis, tanpa Google Analytics).
- Request per hari.
- Bandwidth usage.

### Tip 3: Setting cache lebih agresif

Edit `_headers`:
```
/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.json
  Cache-Control: public, max-age=3600
```

Asset CSS/JS di-cache 1 tahun (immutable), JSON 1 jam. Tapi ingat: kalau ada update CSS/JS, ganti nama file (cache busting) atau add query string `styles.css?v=2`.

### Tip 4: Rollback ke deployment lama

Cloudflare simpan semua deployment history. Kalau deploy terbaru bermasalah:
1. Tab **Deployments** → cari deployment lama yang OK.
2. Klik tiga titik (⋯) → **Rollback to this deployment**.
3. Production URL langsung point ke deployment lama.

### Tip 5: Limit free tier

Free tier Cloudflare Pages:
- **500 builds per bulan** (more than enough untuk personal project).
- **Unlimited bandwidth** (yes, unlimited).
- **Unlimited requests**.
- **100 custom domains** per project.
- **20,000 files per deployment** (project Anda < 20 file — aman).
- **25 MB max file size** (project Anda total < 1 MB — aman).

---

## CHEAT SHEET — Quick Reference

| Aksi | Cara |
|---|---|
| Deploy baru via dashboard | **Workers & Pages → Create application → Pages → Connect to Git** |
| Deploy via drag-drop | **Workers & Pages → Create application → Pages → Upload assets** |
| Update website (kalau pakai Git) | `git push origin main` — auto-deploy |
| Update website (kalau pakai upload) | Buka project di dashboard → **Create new deployment** → upload ulang |
| Lihat live URL | Project page → URL ada di atas, format: `https://<name>.pages.dev` |
| Custom domain | Project → tab **Custom domains** → **Set up a custom domain** |
| Rollback | Tab **Deployments** → cari versi lama → ⋯ → **Rollback** |
| Purge cache | Project → **Caching** → **Purge Cache** |
| Lihat log build | Tab **Deployments** → klik deployment → **View details** |
| Lihat analytics | Tab **Analytics** |

---

## KESIMPULAN

Untuk project "Kitab Pemula Albion Online":

1. **Best practice**: Pakai **Method 2 (Connect Git)** — sekali setup, auto-deploy selamanya.
2. **Pengaturan**:
   - Framework preset: **None**
   - Build command: kosong
   - Build output directory: `/`
3. **URL hasil**: `https://kitab-albion.iqooz-dev.web.id` (atau custom domain).
4. **Cost**: $0/bulan untuk personal use (free tier sangat generous).

Kalau ada masalah saat deploy, cek **Troubleshooting section** di atas atau hubungi ABID di Discord.

---

**Discord**: https://discord.com/users/987184688324030474
**Repo**: https://github.com/neotech5/AO-PROJECT
**Dokumentasi project**: lihat `PROJECT_DOCUMENTATION.md`
