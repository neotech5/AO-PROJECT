# Albion Online Farming Guide - Project Documentation

**Author**: Manus AI
**Last Updated**: May 28, 2026

## 1. Overview

This document provides a comprehensive overview of the "Albion Online Farming Guide" web project. Originally a React + Tailwind CSS application, it has been refactored into a lightweight, pure HTML, CSS, and JavaScript static site. The primary goal of this refactoring was to simplify deployment, enhance performance, and ensure easy maintainability, especially for hosting on platforms like Cloudflare Pages.

The guide focuses specifically on the **Albion East (Asia) server**, incorporating relevant meta-information, event schedules, and localization in Bahasa Indonesia.

## 2. Key Features

The project retains and enhances several core functionalities:

*   **Modern Dark Fantasy Theme**: Utilizes a dark aesthetic with gold accents (`#d4af37`) for a visually appealing user experience.
*   **Responsive Design**: Fully optimized for various screen sizes, including mobile, tablet, and desktop devices.
*   **Bilingual Support**: Offers seamless language switching between English and Bahasa Indonesia, with all dynamic content localized.
*   **Hero Section**: Features a prominent hero area with a background image and a clear call to action.
*   **Biome Cards**: Interactive cards detailing different biomes and their primary resources, complete with hover effects.
*   **Tier Progression Guide**: A structured guide outlining optimal strategies for gathering across various tier levels, from beginner zones to T8 Outlands.
*   **T8 Farming Locations**: Specific map names for high-value T8 resources in the Black Zones.
*   **Prime Time Tracker**: A real-time widget displaying both local time and Albion Server (UTC) time, along with a dynamic "Danger Level" indicator based on Asia server peak activity hours.
*   **Recommended Gathering Builds**: Provides meta-relevant equipment recommendations for different gathering playstyles (Solo, Tank, Balanced).
*   **Asia Server Events & Schedule**: Details important event timings, such as World Boss spawns and peak PvP windows, tailored for the Asia server.
*   **Pro Tips Section**: Offers valuable advice on efficiency, safety, and profitability for gathering activities.

## 3. Project Structure

The project adheres to a simple and clean file structure, making it easy to navigate and update:

```
albion-simplified/
├── index.html          # Main HTML file, containing all content and structure.
├── styles.css          # All CSS styling, replacing the original Tailwind CSS.
├── script.js           # Main JavaScript file for interactivity, localization, and dynamic content.
├── _headers            # Cloudflare Pages specific file for custom HTTP headers (e.g., security, caching).
├── .gitignore          # Specifies intentionally untracked files to ignore.
├── README.md           # General project information and deployment notes.
└── locales/
    ├── en.json         # English translation strings.
    └── id.json         # Bahasa Indonesia translation strings (using official Albion Online terminology).
```

## 4. Code Overview

### `index.html`

This is the single entry point for the website. It includes:

*   Standard HTML5 boilerplate.
*   Links to `styles.css` and `script.js`.
*   Semantic HTML sections for Hero, Biomes, Tiers, T8 Maps, Events, Builds, Pro Tips, and Footer.
*   `data-i18n` attributes are extensively used on elements that require translation, linking them to keys in the `locales` JSON files.

### `styles.css`

Contains all the visual styling for the website. It has been meticulously crafted to replicate the modern dark fantasy aesthetic of the original React application without relying on any CSS frameworks. Key aspects include:

*   Custom CSS variables for colors, spacing, and font sizes.
*   Responsive design using media queries.
*   Styling for all sections, including cards, grids, and interactive elements.
*   Specific styles for the Prime Time Tracker and build cards.

### `script.js`

This file handles all dynamic functionalities and interactivity:

*   **Localization (`t` function)**: A core function that retrieves translated strings based on the currently selected language and `data-i18n` attributes.
*   **Language Switching**: Manages the toggling between English and Bahasa Indonesia, saving the preference in `localStorage`.
*   **Prime Time Tracker**: Calculates and displays current local time, UTC server time, and dynamically updates the "Danger Level" based on predefined Asia server activity windows.
*   **Dynamic Content Rendering**: Functions like `renderBiomeCards()`, `renderTierGuide()`, `renderT8Maps()`, `renderGatheringBuilds()`, `renderEventSchedule()`, and `renderProTips()` populate the HTML with data from JavaScript arrays and translation files.
*   **Data Structures**: Contains JavaScript arrays holding data for biomes, tier progression, T8 maps, gathering builds, events, and pro tips.

### `locales/en.json` & `locales/id.json`

These JSON files store all translatable text. Each key corresponds to a specific piece of text on the website. The `id.json` file uses official Bahasa Indonesia terminology from Albion Online where applicable.

## 5. Deployment Guide (GitHub & Cloudflare Pages)

This project is designed for seamless deployment using **GitHub** for version control and **Cloudflare Pages** for hosting, enabling automatic updates with every commit.

### Prerequisites

*   A GitHub account.
*   A Cloudflare account.

### Step-by-Step Deployment

1.  **Create a GitHub Repository**:
    *   Go to [GitHub](https://github.com/) and log in.
    *   Click the `+` icon in the top right corner and select `New repository`.
    *   Give your repository a name (e.g., `albion-farming-guide`). Choose `Public` or `Private` as desired.
    *   Initialize with a `README.md` (optional, but recommended).
    *   Click `Create repository`.

2.  **Upload Project Files to GitHub**:
    *   Download the latest project ZIP file provided by Manus AI (e.g., `albion-github-ready.zip`).
    *   Extract the contents of the ZIP file. You will find a folder named `albion-simplified`.
    *   On your newly created GitHub repository page, click the `Add file` dropdown and select `Upload files`.
    *   Drag and drop all the files and the `locales` folder from your extracted `albion-simplified` directory into the upload area on GitHub.
    *   Ensure that `index.html` is in the root directory of your repository.
    *   Scroll down and click `Commit changes`.

3.  **Connect GitHub Repository to Cloudflare Pages**:
    *   Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) and log in.
    *   In the left sidebar, navigate to **Workers & Pages**.
    *   Click the `Create application` button.
    *   Select the `Pages` tab.
    *   Click the `Connect to Git` button.
    *   Follow the prompts to authorize Cloudflare to access your GitHub account.
    *   Select the GitHub repository you created (e.g., `albion-farming-guide`).
    *   Click `Begin setup`.

4.  **Configure Build Settings**:
    *   **Project name**: Cloudflare will suggest a name, or you can enter your preferred name (e.g., `albion-tutor`). This will be part of your `*.pages.dev` URL.
    *   **Production branch**: Usually `main` or `master`.
    *   **Framework preset**: Select `None`.
    *   **Build command**: Leave this field **empty**.
    *   **Build output directory**: Leave this field **empty** (or enter `/` if required by the UI).
    *   Click `Save and Deploy`.

5.  **Deployment and Automatic Updates**:
    *   Cloudflare will now clone your repository and deploy your site. This process usually takes less than a minute.
    *   Once deployed, you will receive a unique `*.pages.dev` URL for your website.
    *   From now on, any changes you `commit` and `push` to your GitHub repository's production branch will automatically trigger a new deployment on Cloudflare Pages, updating your live website without any manual intervention on the Cloudflare dashboard.

## 6. Future Development Prompt for AI

To continue developing this project with another AI agent, use the following detailed prompt. This prompt provides all necessary context, current state, and architectural details.

```
"""
You are an AI agent tasked with continuing the development of an Albion Online Farming Guide web project. The project is a pure HTML, CSS, and JavaScript static site, designed for deployment on Cloudflare Pages via GitHub.

**Current Project State:**
- **Name**: Albion Online Farming Guide
- **Hosting**: Cloudflare Pages (connected to GitHub repository)
- **Technologies**: HTML5, CSS3, Vanilla JavaScript (no frameworks/libraries like React, Vue, jQuery, or build tools like Webpack, Vite).
- **Localization**: Supports English (`en.json`) and Bahasa Indonesia (`id.json`) via a custom JavaScript `t()` function and `data-i18n` attributes.
- **Features Implemented (Latest Version)**:
    - Modern Dark Fantasy Theme.
    - Responsive Design.
    - Bilingual Support (EN/ID).
    - Hero Section.
    - Biome Cards.
    - Tier Progression Guide.
    - T8 Farming Locations (verified for Asia server).
    - Real-time Prime Time Tracker (shows Local Time, UTC Server Time, and dynamic Danger Level for Asia server).
    - Recommended Gathering Builds (text-based, no item images).
    - Asia Server Events & Schedule.
    - Pro Tips Section.
- **File Structure**:
    ```
    albion-simplified/
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── _headers
    ├── .gitignore
    ├── README.md
    └── locales/
        ├── en.json
        └── id.json
    ```

**Development Guidelines:**
1.  **Pure HTML/CSS/JS**: STRICTLY adhere to vanilla HTML, CSS, and JavaScript. DO NOT introduce any frameworks, libraries, or build tools.
2.  **Localization**: All new user-facing text MUST be added to both `en.json` and `id.json` and rendered using the `t()` function and `data-i18n` attributes. Ensure Bahasa Indonesia terminology aligns with official Albion Online terms where possible.
3.  **Modularity**: Maintain the existing modular structure within `script.js` (e.g., separate functions for rendering different sections).
4.  **Performance**: Prioritize lightweight code and efficient rendering. Avoid large assets or complex scripts that could slow down the page.
5.  **Responsiveness**: Ensure all new features and UI elements are fully responsive across desktop, tablet, and mobile.
6.  **Albion Asia Focus**: All data, tips, and event timings should remain relevant to the Albion East (Asia) server.
7.  **Output**: Deliver changes as modified files or a new ZIP archive of the `albion-simplified` folder, along with a clear summary of changes.

**Example Task for Future AI:**
"Tambahkan fitur 'Kalkulator Estimasi Profit' di mana user bisa memasukkan jumlah resource yang didapat, lalu sistem menghitung estimasi Silver berdasarkan harga pasar rata-rata (input manual). Pastikan fitur ini terintegrasi dengan sistem translasi yang sudah ada."

"""

This prompt ensures that any future AI agent will have all the necessary information to seamlessly pick up where we left off, maintaining consistency and quality in the project. Enjoy your automated deployment workflow!
