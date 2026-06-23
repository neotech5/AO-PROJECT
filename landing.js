// ============================================
// CrimsonBell landing — intro popup + language toggle
// ============================================
(function () {
    'use strict';

    // ---- Language (shared key with the rest of the site) ----
    let currentLang = localStorage.getItem('language') || 'id';

    function applyLanguage() {
        document.querySelectorAll('[data-id]').forEach(function (el) {
            const txt = el.getAttribute('data-' + currentLang);
            if (txt !== null && txt !== undefined) el.innerHTML = txt;
        });
        document.documentElement.lang = currentLang;
        document.querySelectorAll('.lang-btn').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-lang') === currentLang);
        });
    }

    // ---- Intro / bio popup ----
    const overlay = document.getElementById('introOverlay');
    const enterBtn = document.getElementById('introEnter');

    function closeIntro() {
        if (!overlay) return;
        overlay.classList.add('hide');
        document.body.classList.remove('intro-open');
        try { sessionStorage.setItem('introSeen', '1'); } catch (e) { /* ignore */ }
        setTimeout(function () { overlay.style.display = 'none'; }, 650);
    }

    function initIntro() {
        if (!overlay) return;
        let seen = false;
        try { seen = sessionStorage.getItem('introSeen') === '1'; } catch (e) { /* ignore */ }
        if (seen) {
            overlay.style.display = 'none';
            return;
        }
        document.body.classList.add('intro-open');
        if (enterBtn) enterBtn.addEventListener('click', closeIntro);
        // allow Esc / click outside the card to enter as well
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeIntro();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' || e.key === 'Enter') closeIntro();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentLang = btn.getAttribute('data-lang');
                localStorage.setItem('language', currentLang);
                applyLanguage();
            });
        });
        applyLanguage();
        initIntro();
    });
})();
