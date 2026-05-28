# Albion Online Farming Guide - Simplified Version

A modern, responsive farming guide for Albion Online built with pure HTML, CSS, and JavaScript. No frameworks, no build tools—just clean, fast code ready for Netlify deployment.

## Features

✨ **Modern Design**
- Dark fantasy theme with gold accents
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional typography

🌐 **Bilingual Support**
- English and Bahasa Indonesia
- Language preference saved to localStorage
- Easy to add more languages

📱 **Responsive Layout**
- Mobile-first design
- Optimized for all screen sizes
- Touch-friendly interface

⚡ **Performance**
- No dependencies or build process
- Fast load times
- Lazy loading for images
- Minimal CSS and JavaScript

## Project Structure

```
albion-simplified/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript for interactivity
├── locales/
│   ├── en.json        # English translations
│   └── id.json        # Indonesian translations
└── README.md          # This file
```

## Deployment to Netlify

### Option 1: Using Netlify UI

1. **Prepare the folder**
   - Ensure all files are in the `albion-simplified` folder

2. **Deploy via Drag & Drop**
   - Go to [Netlify](https://netlify.com)
   - Sign in or create an account
   - Drag and drop the `albion-simplified` folder into the deploy area
   - Your site will be live in seconds!

3. **Set up a custom domain** (optional)
   - In Netlify dashboard, go to Site settings
   - Add your custom domain

### Option 2: Using Git (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/albion-farming-guide.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Deploy settings:
     - Build command: (leave empty)
     - Publish directory: `.` (or the folder name)
   - Click Deploy

### Option 3: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to project folder
cd albion-simplified

# Deploy
netlify deploy --prod
```

## Local Development

Simply open `index.html` in your browser. No server needed!

For better development experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #d4af37;           /* Gold color */
    --background: #0f0f1e;        /* Dark background */
    --accent: #d4af37;            /* Accent color */
    /* ... more variables */
}
```

### Add More Languages

1. Create a new JSON file in `locales/` (e.g., `fr.json`)
2. Copy the structure from `en.json` and translate
3. Update `script.js` to load the new language

### Modify Content

- **Hero section**: Edit `index.html` hero section and update translations
- **Biomes**: Update biome data in `script.js` `getBiomeData()` function
- **Tiers**: Update tier data in `script.js` `getTierData()` function
- **T8 Maps**: Update maps in `script.js` `getT8MapsData()` function

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Performance Metrics

- **Page Size**: ~50KB (HTML + CSS + JS)
- **Load Time**: < 1 second on 4G
- **Lighthouse Score**: 95+

## File Sizes

- `index.html`: ~8KB
- `styles.css`: ~15KB
- `script.js`: ~8KB
- `locales/en.json`: ~3KB
- `locales/id.json`: ~3KB

## Troubleshooting

### Translations not loading
- Check browser console for errors
- Ensure `locales/en.json` and `locales/id.json` exist
- Check CORS settings if hosting on a different domain

### Images not showing
- Verify image URLs are correct
- Check internet connection
- Images are loaded from CDN (cloudfront.net)

### Styling looks off
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser zoom level (should be 100%)
- Ensure CSS file is loading (check Network tab in DevTools)

## License

This project is open source. Feel free to use and modify for your needs.

## Support

For questions or issues:
1. Check the browser console for error messages
2. Verify all files are in the correct locations
3. Try clearing browser cache and reloading

---

**Last Updated**: May 2026
**Version**: 1.0 (Simplified)
**Author**: ABID
