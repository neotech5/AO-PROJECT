// ============================================
// TRANSLATION SYSTEM
// ============================================

let translations = {
    en: {},
    id: {}
};

let currentLanguage = localStorage.getItem('language') || 'en';

// Load translations
async function loadTranslations() {
    try {
        const enResponse = await fetch('locales/en.json');
        const idResponse = await fetch('locales/id.json');

        translations.en = await enResponse.json();
        translations.id = await idResponse.json();

        updatePageLanguage();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function t(key, defaultValue = '') {
    const keys = key.split('.');
    let value = translations[currentLanguage];

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            return defaultValue;
        }
    }

    return value !== undefined && value !== null ? value : defaultValue;
}

function updatePageLanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = t(key);

        if (text && typeof text === 'string') {
            element.textContent = text;
        }
    });

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        }
    });

    // Update html lang attribute
    document.documentElement.lang = currentLanguage;

    // Re-render dynamic content
    renderEssentials();
    renderGuides();
    renderZones();
    renderMistakes();
    renderFaq();
    renderProfessions();
    renderBiomes();
    renderTiers();
    renderSurvival();
    renderMists();
    renderT8Maps();
    renderGatheringBuilds();
    renderEventSchedule();
    renderMarketplace();
    renderRoutine();
    renderPremium();
    renderTools();
    renderProTips();
    updatePrimeTimeTracker();
}

// ============================================
// SIDEBAR DRAWER
// ============================================

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const toggle = document.getElementById('menuToggle');
    if (!sidebar || !backdrop || !toggle) return;

    sidebar.classList.add('open');
    sidebar.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('sidebar-open');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    const toggle = document.getElementById('menuToggle');
    if (!sidebar || !backdrop || !toggle) return;

    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('sidebar-open');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

// ============================================
// TABS (Player Guide & Profession)
// ============================================

const activeTab = {
    guide: null,
    profession: null,
    essentials: null,
};

function getActiveTabId(group, ids) {
    if (!ids || ids.length === 0) return null;
    const current = activeTab[group];
    if (current && ids.includes(current)) return current;
    activeTab[group] = ids[0];
    return ids[0];
}

function setActiveTab(group, targetId) {
    activeTab[group] = targetId;

    // Update tab buttons
    document.querySelectorAll(`.tab-btn[data-group="${group}"]`).forEach(btn => {
        const isActive = btn.dataset.target === targetId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update panels — only toggle those that belong to this group's container
    let containerId;
    if (group === 'guide') containerId = 'guidePhasesGrid';
    else if (group === 'profession') containerId = 'professionGrid';
    else if (group === 'essentials') containerId = 'essentialsGrid';
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === targetId);
    });
}

function setupTabs() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        const group = btn.dataset.group;
        const target = btn.dataset.target;
        if (!group || !target) return;
        setActiveTab(group, target);
    });
}

// When a sidebar link points to a tab panel, activate that tab too
function activateTabForHash(hash) {
    if (!hash) return;
    const id = hash.replace(/^#/, '');
    if (!id) return;

    // Essentials
    const essentialsIds = ['essential-first-hour', 'essential-mount', 'essential-food', 'essential-refining'];
    if (essentialsIds.includes(id)) {
        setActiveTab('essentials', id);
        return;
    }

    // Guide phases
    const guideIds = ['guide-beginner', 'guide-midgame', 'guide-endgame'];
    if (guideIds.includes(id)) {
        setActiveTab('guide', id);
        return;
    }

    // Professions
    const professionIds = [
        'profession-lumberjack', 'profession-ore-miner', 'profession-skinner',
        'profession-stone-quarrier', 'profession-fiber-harvester', 'profession-fisherman'
    ];
    if (professionIds.includes(id)) {
        setActiveTab('profession', id);
    }
}

function setupSidebar() {
    const toggle = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('sidebarClose');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (toggle) toggle.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    // ESC key closes sidebar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('open')) closeSidebar();
        }
    });

    // Accordion toggles
    document.querySelectorAll('.sidebar-group-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (!target) return;
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!isOpen));
            target.classList.toggle('collapsed', isOpen);
        });
    });

    // Sidebar link click → activate tab if needed + smooth scroll + close
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();

                // If link points to a tabbed panel, activate that tab first
                activateTabForHash(href);

                const target = document.querySelector(href);
                if (target) {
                    // Scroll to its containing section so user sees the tab row + content
                    const essentialsIds = ['essential-first-hour', 'essential-mount', 'essential-food', 'essential-refining'];
                    const guideIds = ['guide-beginner', 'guide-midgame', 'guide-endgame'];
                    const professionIds = [
                        'profession-lumberjack', 'profession-ore-miner', 'profession-skinner',
                        'profession-stone-quarrier', 'profession-fiber-harvester', 'profession-fisherman'
                    ];
                    const id = href.replace(/^#/, '');
                    let scrollTarget = target;
                    if (essentialsIds.includes(id)) {
                        scrollTarget = document.getElementById('essentials') || target;
                    } else if (guideIds.includes(id)) {
                        scrollTarget = document.getElementById('guides') || target;
                    } else if (professionIds.includes(id)) {
                        scrollTarget = document.getElementById('professions') || target;
                    }
                    scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                // Mark active
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                // Close drawer
                setTimeout(closeSidebar, 200);
            }
        });
    });
}

// ============================================
// BEGINNER ESSENTIALS (First Hour / Mount / Food & Potion / Refining)
// ============================================

function getEssentials() {
    return [
        {
            id: 'essential-first-hour',
            icon: '✅',
            title: t('essentials.firstHour.title', 'First Hour Checklist'),
            subtitle: t('essentials.firstHour.subtitle', 'Step-by-step untuk jam pertama main'),
            intro: t('essentials.firstHour.intro', ''),
            steps: t('essentials.firstHour.steps') || [],
            tips: t('essentials.firstHour.tips') || []
        },
        {
            id: 'essential-mount',
            icon: '🐎',
            title: t('essentials.mount.title', 'Mount Guide'),
            subtitle: t('essentials.mount.subtitle', 'Pilih mount yang sesuai dengan aktivitas'),
            intro: t('essentials.mount.intro', ''),
            tableHeaders: t('essentials.mount.tableHeaders') || ['Mount', 'Tier', 'Best For', 'Note'],
            rows: t('essentials.mount.rows') || [],
            tips: t('essentials.mount.tips') || []
        },
        {
            id: 'essential-food',
            icon: '🍖',
            title: t('essentials.food.title', 'Food & Potion'),
            subtitle: t('essentials.food.subtitle', 'Buff yang wajib dipakai gatherer'),
            intro: t('essentials.food.intro', ''),
            foodTitle: t('essentials.food.foodTitle', 'Food'),
            foods: t('essentials.food.foods') || [],
            potionTitle: t('essentials.food.potionTitle', 'Potions'),
            potions: t('essentials.food.potions') || [],
            tips: t('essentials.food.tips') || []
        },
        {
            id: 'essential-refining',
            icon: '🏭',
            title: t('essentials.refining.title', 'Refining 101'),
            subtitle: t('essentials.refining.subtitle', 'Cara dapat bonus 21–43% dari city specialty'),
            intro: t('essentials.refining.intro', ''),
            bonusTitle: t('essentials.refining.bonusTitle', 'City Specialty Bonus'),
            bonusRows: t('essentials.refining.bonusRows') || [],
            stepsTitle: t('essentials.refining.stepsTitle', 'Cara Refine'),
            steps: t('essentials.refining.steps') || [],
            tips: t('essentials.refining.tips') || []
        }
    ];
}

function renderEssentials() {
    const tabsRow = document.getElementById('essentialsTabsRow');
    const panels = document.getElementById('essentialsGrid');
    if (!tabsRow || !panels) return;
    tabsRow.innerHTML = '';
    panels.innerHTML = '';

    const items = getEssentials();
    const activeId = getActiveTabId('essentials', items.map(it => it.id));

    items.forEach(item => {
        const isActive = item.id === activeId;

        const tabBtn = document.createElement('button');
        tabBtn.type = 'button';
        tabBtn.className = 'tab-btn' + (isActive ? ' active' : '');
        tabBtn.setAttribute('role', 'tab');
        tabBtn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tabBtn.dataset.target = item.id;
        tabBtn.dataset.group = 'essentials';
        tabBtn.innerHTML = `
            <span class="tab-btn-icon">${item.icon}</span>
            <span class="tab-btn-title">${item.title}</span>
        `;
        tabsRow.appendChild(tabBtn);

        const panel = document.createElement('article');
        panel.className = 'essential-card tab-panel' + (isActive ? ' active' : '');
        panel.id = item.id;
        panel.setAttribute('role', 'tabpanel');

        let body = '';

        if (item.id === 'essential-first-hour') {
            const stepsHtml = (item.steps || []).map((s, i) => `
                <li class="checklist-item">
                    <span class="checklist-num">${i + 1}</span>
                    <div class="checklist-text">
                        <strong>${s.title || ''}</strong>
                        ${s.detail ? `<span class="checklist-detail">${s.detail}</span>` : ''}
                    </div>
                </li>
            `).join('');
            const tipsHtml = (item.tips || []).map(tp => `<li>${tp}</li>`).join('');
            body = `
                ${item.intro ? `<p class="essential-intro">${item.intro}</p>` : ''}
                <ol class="checklist">${stepsHtml}</ol>
                ${tipsHtml ? `<div class="essential-section">
                    <h4>💡 ${t('essentials.commonTips', 'Tips')}</h4>
                    <ul class="essential-list">${tipsHtml}</ul>
                </div>` : ''}
            `;
        } else if (item.id === 'essential-mount') {
            const headers = item.tableHeaders || [];
            const headersHtml = headers.map(h => `<th>${h}</th>`).join('');
            const rowsHtml = (item.rows || []).map(r => `
                <tr>
                    <td><strong>${r.name || ''}</strong></td>
                    <td>${r.tier || ''}</td>
                    <td>${r.bestFor || ''}</td>
                    <td>${r.note || ''}</td>
                </tr>
            `).join('');
            const tipsHtml = (item.tips || []).map(tp => `<li>${tp}</li>`).join('');
            body = `
                ${item.intro ? `<p class="essential-intro">${item.intro}</p>` : ''}
                <div class="essential-table-wrap">
                    <table class="essential-table">
                        <thead><tr>${headersHtml}</tr></thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
                ${tipsHtml ? `<div class="essential-section">
                    <h4>💡 ${t('essentials.commonTips', 'Tips')}</h4>
                    <ul class="essential-list">${tipsHtml}</ul>
                </div>` : ''}
            `;
        } else if (item.id === 'essential-food') {
            const foodsHtml = (item.foods || []).map(f => `
                <div class="essential-row-card">
                    <div class="essential-row-header">
                        <strong>${f.name || ''}</strong>
                        ${f.tier ? `<span class="essential-tag">${f.tier}</span>` : ''}
                    </div>
                    <div class="essential-row-body">
                        <span class="essential-row-effect">${f.effect || ''}</span>
                        ${f.useCase ? `<span class="essential-row-use">→ ${f.useCase}</span>` : ''}
                    </div>
                </div>
            `).join('');
            const potionsHtml = (item.potions || []).map(p => `
                <div class="essential-row-card">
                    <div class="essential-row-header">
                        <strong>${p.name || ''}</strong>
                        ${p.tier ? `<span class="essential-tag">${p.tier}</span>` : ''}
                    </div>
                    <div class="essential-row-body">
                        <span class="essential-row-effect">${p.effect || ''}</span>
                        ${p.useCase ? `<span class="essential-row-use">→ ${p.useCase}</span>` : ''}
                    </div>
                </div>
            `).join('');
            const tipsHtml = (item.tips || []).map(tp => `<li>${tp}</li>`).join('');
            body = `
                ${item.intro ? `<p class="essential-intro">${item.intro}</p>` : ''}
                <div class="essential-section">
                    <h4>🍖 ${item.foodTitle}</h4>
                    <div class="essential-rows">${foodsHtml}</div>
                </div>
                <div class="essential-section">
                    <h4>🧪 ${item.potionTitle}</h4>
                    <div class="essential-rows">${potionsHtml}</div>
                </div>
                ${tipsHtml ? `<div class="essential-section">
                    <h4>💡 ${t('essentials.commonTips', 'Tips')}</h4>
                    <ul class="essential-list">${tipsHtml}</ul>
                </div>` : ''}
            `;
        } else if (item.id === 'essential-refining') {
            const bonusHtml = (item.bonusRows || []).map(b => `
                <tr>
                    <td><strong>${b.city || ''}</strong></td>
                    <td>${b.resource || ''}</td>
                    <td><span class="essential-bonus">${b.bonus || ''}</span></td>
                </tr>
            `).join('');
            const stepsHtml = (item.steps || []).map((s, i) => `
                <li class="checklist-item">
                    <span class="checklist-num">${i + 1}</span>
                    <div class="checklist-text">
                        <strong>${s.title || ''}</strong>
                        ${s.detail ? `<span class="checklist-detail">${s.detail}</span>` : ''}
                    </div>
                </li>
            `).join('');
            const tipsHtml = (item.tips || []).map(tp => `<li>${tp}</li>`).join('');
            body = `
                ${item.intro ? `<p class="essential-intro">${item.intro}</p>` : ''}
                <div class="essential-section">
                    <h4>🏛️ ${item.bonusTitle}</h4>
                    <div class="essential-table-wrap">
                        <table class="essential-table">
                            <thead><tr>
                                <th>${t('essentials.refining.colCity', 'City')}</th>
                                <th>${t('essentials.refining.colResource', 'Resource')}</th>
                                <th>${t('essentials.refining.colBonus', 'Bonus')}</th>
                            </tr></thead>
                            <tbody>${bonusHtml}</tbody>
                        </table>
                    </div>
                </div>
                <div class="essential-section">
                    <h4>🔧 ${item.stepsTitle}</h4>
                    <ol class="checklist">${stepsHtml}</ol>
                </div>
                ${tipsHtml ? `<div class="essential-section">
                    <h4>💡 ${t('essentials.commonTips', 'Tips')}</h4>
                    <ul class="essential-list">${tipsHtml}</ul>
                </div>` : ''}
            `;
        }

        panel.innerHTML = `
            <div class="essential-header">
                <span class="essential-icon">${item.icon}</span>
                <div>
                    <h3 class="essential-title">${item.title}</h3>
                    ${item.subtitle ? `<p class="essential-subtitle">${item.subtitle}</p>` : ''}
                </div>
            </div>
            <div class="essential-body">${body}</div>
        `;
        panels.appendChild(panel);
    });
}

// ============================================
// ZONE TYPES MANUAL
// ============================================

function renderZones() {
    const grid = document.getElementById('zonesGrid');
    if (!grid) return;
    const items = t('zones.items') || [];
    const labelDanger = t('zones.labelDanger', 'Danger');
    const labelDeath = t('zones.labelDeath', 'On Death');
    const labelBestFor = t('zones.labelBestFor', 'Best For');
    const labelFeatures = t('zones.labelFeatures', 'Key Features');
    const labelAccess = t('zones.labelAccess', 'Access');

    grid.innerHTML = items.map(zone => {
        const features = (zone.features || []).map(f => `<li>${f}</li>`).join('');
        const dangerClass = zone.dangerLevel || 'moderate';
        return `
            <div class="zone-card zone-${dangerClass}">
                <div class="zone-header">
                    <span class="zone-icon">${zone.icon || ''}</span>
                    <div class="zone-title-wrap">
                        <h3 class="zone-name">${zone.name}</h3>
                        <span class="zone-danger-badge zone-danger-${dangerClass}">${labelDanger}: ${zone.danger}</span>
                    </div>
                </div>
                <div class="zone-body">
                    <div class="zone-row">
                        <span class="zone-label">💀 ${labelDeath}</span>
                        <span class="zone-value">${zone.death}</span>
                    </div>
                    <div class="zone-row">
                        <span class="zone-label">🎯 ${labelBestFor}</span>
                        <span class="zone-value">${zone.bestFor}</span>
                    </div>
                    <div class="zone-row">
                        <span class="zone-label">🚪 ${labelAccess}</span>
                        <span class="zone-value">${zone.access || ''}</span>
                    </div>
                    <div class="zone-features">
                        <span class="zone-label">✦ ${labelFeatures}</span>
                        <ul class="zone-features-list">${features}</ul>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// COMMON MISTAKES (DON'T list)
// ============================================

function renderMistakes() {
    const list = document.getElementById('mistakesList');
    if (!list) return;
    const items = t('mistakes.items') || [];
    list.innerHTML = items.map((m, idx) => `
        <div class="mistake-card">
            <div class="mistake-num">${idx + 1}</div>
            <div class="mistake-body">
                <h4 class="mistake-title"><span class="mistake-x">❌</span> ${m.title}</h4>
                <p class="mistake-detail">${m.detail}</p>
            </div>
        </div>
    `).join('');
}

// ============================================
// GANK AVOIDANCE & ESCAPE MANUAL
// ============================================

function renderSurvival() {
    const container = document.getElementById('survivalContainer');
    if (!container) return;

    const preGather = t('survival.preGather') || [];
    const spotting = t('survival.spotting') || [];
    const escapeKit = t('survival.escapeKit') || [];
    const escapeHeaders = t('survival.escapeKitHeaders') || ['Slot', 'Item', 'Why'];
    const qSwap = t('survival.qSwap') || [];
    const chased = t('survival.chased') || [];
    const tips = t('survival.tips') || [];

    const renderList = (arr) => arr.map(s => `<li>${s}</li>`).join('');
    const renderNumberedList = (arr) => arr.map((s, i) => `
        <li class="checklist-item">
            <div class="checklist-num">${i + 1}</div>
            <div class="checklist-text">${s}</div>
        </li>
    `).join('');

    const renderTable = () => `
        <table class="survival-table">
            <thead>
                <tr>
                    <th>${escapeHeaders[0]}</th>
                    <th>${escapeHeaders[1]}</th>
                    <th>${escapeHeaders[2]}</th>
                </tr>
            </thead>
            <tbody>
                ${escapeKit.map(row => `
                    <tr>
                        <td class="survival-slot">${row.slot}</td>
                        <td class="survival-item">${row.item}</td>
                        <td class="survival-why">${row.why}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = `
        <div class="survival-section">
            <h3 class="survival-h">✅ ${t('survival.preGatherTitle', 'Pre-Gathering Checklist')}</h3>
            <ul class="survival-list">${renderList(preGather)}</ul>
        </div>
        <div class="survival-section">
            <h3 class="survival-h">🔎 ${t('survival.spottingTitle', 'How to Spot a Ganker')}</h3>
            <ul class="survival-list">${renderList(spotting)}</ul>
        </div>
        <div class="survival-section">
            <h3 class="survival-h">🎒 ${t('survival.escapeKitTitle', 'Escape Kit Loadout')}</h3>
            <div class="survival-table-wrap">${renderTable()}</div>
        </div>
        <div class="survival-section">
            <h3 class="survival-h">⚡ ${t('survival.qSwapTitle', 'Q-Swap Technique')}</h3>
            <ol class="checklist">${renderNumberedList(qSwap)}</ol>
        </div>
        <div class="survival-section">
            <h3 class="survival-h">🏃 ${t('survival.chasedTitle', 'If You Are Already Being Chased')}</h3>
            <ol class="checklist">${renderNumberedList(chased)}</ol>
        </div>
        <div class="survival-section">
            <h3 class="survival-h">💡 ${t('survival.tipsTitle', 'Advanced Tips')}</h3>
            <ul class="survival-list survival-tips">${renderList(tips)}</ul>
        </div>
    `;
}

// ============================================
// TOOLS & APPS (Pro Toolkit)
// ============================================

function renderTools() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;
    const items = t('tools.items') || [];
    const labelCategory = t('tools.labelCategory', 'Category');
    const labelOpen = t('tools.labelOpen', 'Open');

    grid.innerHTML = items.map(tool => `
        <div class="tool-card">
            <div class="tool-header">
                <h3 class="tool-name">${tool.name}</h3>
                <span class="tool-category">${labelCategory}: ${tool.category}</span>
            </div>
            <p class="tool-description">${tool.description}</p>
            <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-link">${labelOpen} ↗</a>
        </div>
    `).join('');
}

// ============================================
// MARKETPLACE 101
// ============================================

function renderMarketplace() {
    const container = document.getElementById('marketplaceContainer');
    if (!container) return;

    const orders = t('marketplace.orders') || [];
    const labelHow = t('marketplace.labelHow', 'How it works');
    const labelWhen = t('marketplace.labelWhen', 'When to use');

    const taxTitle = t('marketplace.taxTitle', 'Tax Breakdown');
    const taxHeaders = t('marketplace.taxHeaders') || [];
    const taxRows = t('marketplace.taxRows') || [];

    const cityTitle = t('marketplace.cityTitle', 'City Arbitrage');
    const cityItems = t('marketplace.city') || [];

    const tipsTitle = t('marketplace.tipsTitle', 'Marketplace Pro Tips');
    const tips = t('marketplace.tips') || [];

    const ordersHTML = orders.map(o => `
        <div class="marketplace-order-card">
            <h4 class="marketplace-order-title">${o.type}</h4>
            <div class="marketplace-order-row">
                <span class="marketplace-order-label">${labelHow}</span>
                <p class="marketplace-order-text">${o.how}</p>
            </div>
            <div class="marketplace-order-row">
                <span class="marketplace-order-label">${labelWhen}</span>
                <p class="marketplace-order-text">${o.when}</p>
            </div>
        </div>
    `).join('');

    const taxHTML = `
        <div class="marketplace-block">
            <h3 class="marketplace-block-title">💸 ${taxTitle}</h3>
            <div class="marketplace-table-wrapper">
                <table class="marketplace-table">
                    <thead>
                        <tr>${taxHeaders.map(h => `<th>${h}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${taxRows.map(r => `
                            <tr>
                                <td>${r.fee}</td>
                                <td><span class="tag-free">${r.free}</span></td>
                                <td><span class="tag-premium">${r.premium}</span></td>
                                <td class="marketplace-note">${r.note}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const cityHTML = `
        <div class="marketplace-block">
            <h3 class="marketplace-block-title">🏙️ ${cityTitle}</h3>
            <ul class="marketplace-list">
                ${cityItems.map(c => `<li>${c}</li>`).join('')}
            </ul>
        </div>
    `;

    const tipsHTML = `
        <div class="marketplace-block">
            <h3 class="marketplace-block-title">💡 ${tipsTitle}</h3>
            <ul class="marketplace-list marketplace-tips">
                ${tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
    `;

    container.innerHTML = `
        <div class="marketplace-orders-grid">${ordersHTML}</div>
        ${taxHTML}
        ${cityHTML}
        ${tipsHTML}
    `;
}

// ============================================
// DAILY ROUTINE PRO
// ============================================

function renderRoutine() {
    const container = document.getElementById('routineContainer');
    if (!container) return;

    const checklist = t('routine.checklist') || [];
    const checklistTitle = t('routine.checklistTitle', 'Daily Login Checklist');

    const weeklyTitle = t('routine.weeklyTitle', 'Weekly Goals');
    const weekly = t('routine.weekly') || [];

    const burnoutTitle = t('routine.burnoutTitle', 'Avoid Burnout');
    const burnout = t('routine.burnout') || [];

    const checklistHTML = checklist.map((item, i) => `
        <div class="routine-step">
            <div class="routine-step-number">${i + 1}</div>
            <div class="routine-step-body">
                <div class="routine-step-meta">
                    <span class="routine-time">⏰ ${item.time}</span>
                    <span class="routine-task">${item.task}</span>
                </div>
                <p class="routine-detail">${item.detail}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="routine-block">
            <h3 class="routine-block-title">✅ ${checklistTitle}</h3>
            <div class="routine-checklist">${checklistHTML}</div>
        </div>
        <div class="routine-block">
            <h3 class="routine-block-title">📆 ${weeklyTitle}</h3>
            <ul class="routine-list routine-weekly">
                ${weekly.map(w => `<li>${w}</li>`).join('')}
            </ul>
        </div>
        <div class="routine-block">
            <h3 class="routine-block-title">🧠 ${burnoutTitle}</h3>
            <ul class="routine-list routine-burnout">
                ${burnout.map(b => `<li>${b}</li>`).join('')}
            </ul>
        </div>
    `;
}

// ============================================
// PREMIUM MATH
// ============================================

function renderPremium() {
    const container = document.getElementById('premiumContainer');
    if (!container) return;

    const benefitsTitle = t('premium.benefitsTitle', 'What Premium Gives You');
    const benefitsHeaders = t('premium.benefitsHeaders') || [];
    const benefits = t('premium.benefits') || [];

    const costTitle = t('premium.costTitle', 'Cost & Worth-It Threshold');
    const cost = t('premium.cost') || [];

    const scenariosTitle = t('premium.scenariosTitle', 'When Premium IS Worth It');
    const scenariosYes = t('premium.scenariosYes') || [];
    const scenariosNoTitle = t('premium.scenariosNoTitle', "When Premium ISN'T Worth It");
    const scenariosNo = t('premium.scenariosNo') || [];

    const tipsTitle = t('premium.tipsTitle', 'Smart Premium Strategies');
    const tips = t('premium.tips') || [];

    const benefitsHTML = `
        <div class="premium-block">
            <h3 class="premium-block-title">✨ ${benefitsTitle}</h3>
            <div class="premium-table-wrapper">
                <table class="premium-table">
                    <thead>
                        <tr>${benefitsHeaders.map(h => `<th>${h}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${benefits.map(b => `
                            <tr>
                                <td class="premium-benefit-name">${b.benefit}</td>
                                <td><span class="tag-free">${b.free}</span></td>
                                <td><span class="tag-premium">${b.premium}</span></td>
                                <td class="premium-impact">${b.impact}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const costHTML = `
        <div class="premium-block">
            <h3 class="premium-block-title">💰 ${costTitle}</h3>
            <ul class="premium-list">
                ${cost.map(c => `<li>${c}</li>`).join('')}
            </ul>
        </div>
    `;

    const scenariosHTML = `
        <div class="premium-scenarios-grid">
            <div class="premium-scenario premium-scenario-yes">
                <h3 class="premium-scenario-title">👍 ${scenariosTitle}</h3>
                <ul class="premium-list">
                    ${scenariosYes.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
            <div class="premium-scenario premium-scenario-no">
                <h3 class="premium-scenario-title">👎 ${scenariosNoTitle}</h3>
                <ul class="premium-list">
                    ${scenariosNo.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    const tipsHTML = `
        <div class="premium-block">
            <h3 class="premium-block-title">🎯 ${tipsTitle}</h3>
            <ul class="premium-list">
                ${tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
    `;

    container.innerHTML = benefitsHTML + costHTML + scenariosHTML + tipsHTML;
}

// ============================================
// MISTS & ROADS OF AVALON
// ============================================

function renderMists() {
    const container = document.getElementById('mistsContainer');
    if (!container) return;

    const intro = t('mists.intro', '');
    const mistsTitle = t('mists.mistsTitle', 'The Mists');
    const mistsHeaders = t('mists.mistsHeaders') || ['Tier', 'Danger', 'Loot', 'Exit', 'Best For'];
    const mistsRows = t('mists.mistsRows') || [];

    const knightfallTitle = t('mists.knightfallTitle', 'Knightfall Abbey');
    const knightfall = t('mists.knightfall') || [];

    const roadsTitle = t('mists.roadsTitle', 'Roads of Avalon');
    const roads = t('mists.roads') || [];

    const portalTypesTitle = t('mists.portalTypesTitle', 'Portal Types');
    const portalTypes = t('mists.portalTypes') || [];

    const energyTitle = t('mists.energyTitle', 'Avalonian Energy');
    const energy = t('mists.energy') || [];

    const tipsTitle = t('mists.tipsTitle', 'Pro Tips');
    const tips = t('mists.tips') || [];

    const dangerClass = d => {
        const v = (d || '').toLowerCase();
        if (v.includes('low') || v.includes('rendah')) return 'safe';
        if (v.includes('moderate') || v.includes('sedang')) return 'moderate';
        if (v.includes('high') || v.includes('tinggi')) return 'danger';
        return 'moderate';
    };

    const mistsTableHTML = `
        <div class="mists-block">
            ${intro ? `<p class="mists-intro">${intro}</p>` : ''}
            <h3 class="mists-block-title">${mistsTitle}</h3>
            <div class="mists-table-wrapper">
                <table class="mists-table">
                    <thead>
                        <tr>${mistsHeaders.map(h => `<th>${h}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
                        ${mistsRows.map(r => `
                            <tr>
                                <td class="mists-tier">${r.tier}</td>
                                <td><span class="mists-danger mists-danger-${dangerClass(r.danger)}">${r.danger}</span></td>
                                <td>${r.loot}</td>
                                <td>${r.exit}</td>
                                <td class="mists-best">${r.best}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const knightfallHTML = `
        <div class="mists-block">
            <h3 class="mists-block-title">${knightfallTitle}</h3>
            <ul class="mists-list mists-knightfall">
                ${knightfall.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;

    const roadsHTML = `
        <div class="mists-block">
            <h3 class="mists-block-title">${roadsTitle}</h3>
            <ul class="mists-list">
                ${roads.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;

    const portalHTML = `
        <div class="mists-block">
            <h3 class="mists-block-title">${portalTypesTitle}</h3>
            <ul class="mists-list mists-portals">
                ${portalTypes.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;

    const energyHTML = `
        <div class="mists-block">
            <h3 class="mists-block-title">${energyTitle}</h3>
            <ul class="mists-list mists-energy">
                ${energy.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;

    const tipsHTML = `
        <div class="mists-block">
            <h3 class="mists-block-title">${tipsTitle}</h3>
            <ul class="mists-list mists-tips">
                ${tips.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;

    container.innerHTML = mistsTableHTML + knightfallHTML + roadsHTML + portalHTML + energyHTML + tipsHTML;
}

// ============================================
// BEGINNER FAQ
// ============================================

function renderFaq() {
    const container = document.getElementById('faqList');
    if (!container) return;

    const items = t('faq.items') || [];

    container.innerHTML = items.map((item, i) => `
        <details class="faq-item" ${i === 0 ? 'open' : ''}>
            <summary class="faq-question">
                <span class="faq-question-text">${item.q}</span>
                <span class="faq-chevron" aria-hidden="true">▾</span>
            </summary>
            <div class="faq-answer">
                <p>${item.a}</p>
            </div>
        </details>
    `).join('');
}

// ============================================
// PLAYER GUIDE (Pemula / Mid Game / End Game)
// ============================================

function getGuidePhases() {
    return [
        {
            id: 'guide-beginner',
            tag: t('guides.beginner.tag', 'PHASE 1'),
            title: t('guides.beginner.title', 'Beginner (Pemula)'),
            tierRange: 'T1 – T4',
            hours: t('guides.beginner.hours', '0 – 50 hours'),
            danger: 'safe',
            goal: t('guides.beginner.goal'),
            activities: t('guides.beginner.activities') || [],
            equipment: t('guides.beginner.equipment') || [],
            tips: t('guides.beginner.tips') || []
        },
        {
            id: 'guide-midgame',
            tag: t('guides.midgame.tag', 'PHASE 2'),
            title: t('guides.midgame.title', 'Mid Game'),
            tierRange: 'T5 – T7',
            hours: t('guides.midgame.hours', '50 – 300 hours'),
            danger: 'moderate',
            goal: t('guides.midgame.goal'),
            activities: t('guides.midgame.activities') || [],
            equipment: t('guides.midgame.equipment') || [],
            tips: t('guides.midgame.tips') || []
        },
        {
            id: 'guide-endgame',
            tag: t('guides.endgame.tag', 'PHASE 3'),
            title: t('guides.endgame.title', 'End Game'),
            tierRange: 'T7 – T8',
            hours: t('guides.endgame.hours', '300+ hours'),
            danger: 'dangerous',
            goal: t('guides.endgame.goal'),
            activities: t('guides.endgame.activities') || [],
            equipment: t('guides.endgame.equipment') || [],
            tips: t('guides.endgame.tips') || []
        }
    ];
}

function renderGuides() {
    const tabsRow = document.getElementById('guideTabsRow');
    const panels = document.getElementById('guidePhasesGrid');
    if (!tabsRow || !panels) return;
    tabsRow.innerHTML = '';
    panels.innerHTML = '';

    const phases = getGuidePhases();
    const activeId = getActiveTabId('guide', phases.map(p => p.id));

    phases.forEach(phase => {
        const isActive = phase.id === activeId;

        const tabBtn = document.createElement('button');
        tabBtn.type = 'button';
        tabBtn.className = 'tab-btn' + (isActive ? ' active' : '');
        tabBtn.setAttribute('role', 'tab');
        tabBtn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tabBtn.dataset.target = phase.id;
        tabBtn.dataset.group = 'guide';
        tabBtn.innerHTML = `
            <span class="tab-btn-tag">${phase.tag}</span>
            <span class="tab-btn-title">${phase.title}</span>
        `;
        tabsRow.appendChild(tabBtn);

        const panel = document.createElement('article');
        panel.className = 'guide-phase-card tab-panel' + (isActive ? ' active' : '');
        panel.id = phase.id;
        panel.setAttribute('role', 'tabpanel');

        const activitiesHtml = Array.isArray(phase.activities)
            ? phase.activities.map(a => `<li>${a}</li>`).join('')
            : '';
        const equipmentHtml = Array.isArray(phase.equipment)
            ? phase.equipment.map(a => `<li>${a}</li>`).join('')
            : '';
        const tipsHtml = Array.isArray(phase.tips)
            ? phase.tips.map(a => `<li>${a}</li>`).join('')
            : '';

        panel.innerHTML = `
            <div class="guide-phase-header">
                <span class="guide-phase-tag">${phase.tag}</span>
                <h3 class="guide-phase-title">${phase.title}</h3>
                <div class="guide-phase-meta">
                    <span>🎯 ${phase.tierRange}</span>
                    <span>⏱️ ${phase.hours}</span>
                    <span class="badge badge-${phase.danger}">${t('common.' + phase.danger)}</span>
                </div>
            </div>
            <div class="guide-phase-body">
                <div class="guide-phase-section">
                    <h4>${t('guides.labelGoal', 'Goal')}</h4>
                    <p>${phase.goal || ''}</p>
                </div>
                <div class="guide-phase-section">
                    <h4>${t('guides.labelActivities', 'Activities')}</h4>
                    <ul>${activitiesHtml}</ul>
                </div>
                <div class="guide-phase-section">
                    <h4>${t('guides.labelEquipment', 'Equipment')}</h4>
                    <ul>${equipmentHtml}</ul>
                </div>
                <div class="guide-phase-section">
                    <h4>${t('guides.labelTips', 'Key Tips')}</h4>
                    <ul>${tipsHtml}</ul>
                </div>
            </div>
        `;
        panels.appendChild(panel);
    });
}

// ============================================
// GATHERING PROFESSIONS
// ============================================

function getProfessions() {
    return [
        {
            id: 'profession-lumberjack',
            icon: '🪵',
            name: t('professions.lumberjack.name', 'Lumberjack (Penebang Kayu)'),
            tagline: t('professions.lumberjack.tagline'),
            resource: 'Wood / Kayu',
            biomes: ['Forest', 'Highland', 'Swamp'],
            hub: 'Lymhurst',
            tools: [
                { tier: 'T2', name: t('professions.tools.t2.axe', "Journeyman's Axe") },
                { tier: 'T3', name: t('professions.tools.t3.axe', "Journeyman's Axe") },
                { tier: 'T4', name: t('professions.tools.t4.axe', "Adept's Axe") },
                { tier: 'T5', name: t('professions.tools.t5.axe', "Expert's Axe") },
                { tier: 'T6', name: t('professions.tools.t6.axe', "Master's Axe") },
                { tier: 'T8', name: t('professions.tools.t8.axe', "Elder's Axe") }
            ],
            royalSpots: t('professions.lumberjack.royalSpots') || [],
            outlandsSpots: t('professions.lumberjack.outlandsSpots') || [],
            tips: t('professions.lumberjack.tips') || []
        },
        {
            id: 'profession-ore-miner',
            icon: '⛏️',
            name: t('professions.oreMiner.name', 'Ore Miner (Penambang)'),
            tagline: t('professions.oreMiner.tagline'),
            resource: 'Ore / Bijih',
            biomes: ['Mountain', 'Highland'],
            hub: 'Fort Sterling',
            tools: [
                { tier: 'T2', name: t('professions.tools.t2.pickaxe', "Journeyman's Pickaxe") },
                { tier: 'T3', name: t('professions.tools.t3.pickaxe', "Journeyman's Pickaxe") },
                { tier: 'T4', name: t('professions.tools.t4.pickaxe', "Adept's Pickaxe") },
                { tier: 'T5', name: t('professions.tools.t5.pickaxe', "Expert's Pickaxe") },
                { tier: 'T6', name: t('professions.tools.t6.pickaxe', "Master's Pickaxe") },
                { tier: 'T8', name: t('professions.tools.t8.pickaxe', "Elder's Pickaxe") }
            ],
            royalSpots: t('professions.oreMiner.royalSpots') || [],
            outlandsSpots: t('professions.oreMiner.outlandsSpots') || [],
            tips: t('professions.oreMiner.tips') || []
        },
        {
            id: 'profession-skinner',
            icon: '🦌',
            name: t('professions.skinner.name', 'Skinner (Penguliti)'),
            tagline: t('professions.skinner.tagline'),
            resource: 'Hide / Kulit',
            biomes: ['Steppe', 'Forest', 'Highland'],
            hub: 'Bridgewatch',
            tools: [
                { tier: 'T2', name: t('professions.tools.t2.skinning', "Journeyman's Skinning Knife") },
                { tier: 'T3', name: t('professions.tools.t3.skinning', "Journeyman's Skinning Knife") },
                { tier: 'T4', name: t('professions.tools.t4.skinning', "Adept's Skinning Knife") },
                { tier: 'T5', name: t('professions.tools.t5.skinning', "Expert's Skinning Knife") },
                { tier: 'T6', name: t('professions.tools.t6.skinning', "Master's Skinning Knife") },
                { tier: 'T8', name: t('professions.tools.t8.skinning', "Elder's Skinning Knife") }
            ],
            royalSpots: t('professions.skinner.royalSpots') || [],
            outlandsSpots: t('professions.skinner.outlandsSpots') || [],
            tips: t('professions.skinner.tips') || []
        },
        {
            id: 'profession-stone-quarrier',
            icon: '🪨',
            name: t('professions.stoneQuarrier.name', 'Stone Quarrier (Pemecah Batu)'),
            tagline: t('professions.stoneQuarrier.tagline'),
            resource: 'Stone / Batu',
            biomes: ['Highland', 'Mountain'],
            hub: 'Martlock',
            tools: [
                { tier: 'T2', name: t('professions.tools.t2.stonehammer', "Journeyman's Stone Hammer") },
                { tier: 'T3', name: t('professions.tools.t3.stonehammer', "Journeyman's Stone Hammer") },
                { tier: 'T4', name: t('professions.tools.t4.stonehammer', "Adept's Stone Hammer") },
                { tier: 'T5', name: t('professions.tools.t5.stonehammer', "Expert's Stone Hammer") },
                { tier: 'T6', name: t('professions.tools.t6.stonehammer', "Master's Stone Hammer") },
                { tier: 'T8', name: t('professions.tools.t8.stonehammer', "Elder's Stone Hammer") }
            ],
            royalSpots: t('professions.stoneQuarrier.royalSpots') || [],
            outlandsSpots: t('professions.stoneQuarrier.outlandsSpots') || [],
            tips: t('professions.stoneQuarrier.tips') || []
        },
        {
            id: 'profession-fiber-harvester',
            icon: '🌾',
            name: t('professions.fiberHarvester.name', 'Fiber Harvester (Pemanen Serat)'),
            tagline: t('professions.fiberHarvester.tagline'),
            resource: 'Fiber / Serat',
            biomes: ['Swamp', 'Steppe'],
            hub: 'Thetford',
            tools: [
                { tier: 'T2', name: t('professions.tools.t2.sickle', "Journeyman's Sickle") },
                { tier: 'T3', name: t('professions.tools.t3.sickle', "Journeyman's Sickle") },
                { tier: 'T4', name: t('professions.tools.t4.sickle', "Adept's Sickle") },
                { tier: 'T5', name: t('professions.tools.t5.sickle', "Expert's Sickle") },
                { tier: 'T6', name: t('professions.tools.t6.sickle', "Master's Sickle") },
                { tier: 'T8', name: t('professions.tools.t8.sickle', "Elder's Sickle") }
            ],
            royalSpots: t('professions.fiberHarvester.royalSpots') || [],
            outlandsSpots: t('professions.fiberHarvester.outlandsSpots') || [],
            tips: t('professions.fiberHarvester.tips') || []
        },
        {
            id: 'profession-fisherman',
            icon: '🎣',
            name: t('professions.fisherman.name', 'Fisherman (Pemancing)'),
            tagline: t('professions.fisherman.tagline'),
            resource: 'Fish & Rare Loot',
            biomes: ['All biomes (water spots)'],
            hub: t('professions.fisherman.hub', 'Any city with water'),
            tools: [
                { tier: 'T3', name: t('professions.tools.t3.fishingrod', "Journeyman's Fishing Rod") },
                { tier: 'T4', name: t('professions.tools.t4.fishingrod', "Adept's Fishing Rod") },
                { tier: 'T5', name: t('professions.tools.t5.fishingrod', "Expert's Fishing Rod") },
                { tier: 'T6', name: t('professions.tools.t6.fishingrod', "Master's Fishing Rod") },
                { tier: 'T8', name: t('professions.tools.t8.fishingrod', "Elder's Fishing Rod") }
            ],
            royalSpots: t('professions.fisherman.royalSpots') || [],
            outlandsSpots: t('professions.fisherman.outlandsSpots') || [],
            tips: t('professions.fisherman.tips') || []
        }
    ];
}

function renderProfessionOverview() {
    const container = document.getElementById('profession-overview');
    if (!container) return;
    const points = t('professions.overview.points') || [];
    const pointsHtml = Array.isArray(points)
        ? points.map(p => `<li>${p}</li>`).join('')
        : '';
    container.innerHTML = `
        <h3>${t('professions.overview.title', 'Gatherer Overview')}</h3>
        <p>${t('professions.overview.description', '')}</p>
        <ul>${pointsHtml}</ul>
    `;
}

function renderProfessions() {
    renderProfessionOverview();

    const tabsRow = document.getElementById('professionTabsRow');
    const panels = document.getElementById('professionGrid');
    if (!tabsRow || !panels) return;
    tabsRow.innerHTML = '';
    panels.innerHTML = '';

    const professions = getProfessions();
    const activeId = getActiveTabId('profession', professions.map(p => p.id));

    professions.forEach(p => {
        const isActive = p.id === activeId;

        const tabBtn = document.createElement('button');
        tabBtn.type = 'button';
        tabBtn.className = 'tab-btn' + (isActive ? ' active' : '');
        tabBtn.setAttribute('role', 'tab');
        tabBtn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tabBtn.dataset.target = p.id;
        tabBtn.dataset.group = 'profession';
        tabBtn.innerHTML = `
            <span class="tab-btn-icon">${p.icon}</span>
            <span class="tab-btn-title">${p.name}</span>
        `;
        tabsRow.appendChild(tabBtn);

        const card = document.createElement('article');
        card.className = 'profession-card tab-panel' + (isActive ? ' active' : '');
        card.id = p.id;
        card.setAttribute('role', 'tabpanel');

        const biomesHtml = p.biomes.map(b => `<span class="badge badge-outline">${b}</span>`).join('');
        const toolsHtml = p.tools.map(tool => `
            <tr>
                <td><strong>${tool.tier}</strong></td>
                <td>${tool.name}</td>
            </tr>
        `).join('');
        const formatSpotEntry = (s) => {
            if (typeof s === 'string') return `<li>${s}</li>`;
            if (s && typeof s === 'object' && s.tier) {
                const zone = s.zone ? `: ${s.zone}` : '';
                const zoneType = s.zoneType ? ` <span class="spot-zone-type">(${s.zoneType})</span>` : '';
                return `<li><strong>${s.tier}</strong>${zoneType}${zone}</li>`;
            }
            return '';
        };
        const royalHtml = Array.isArray(p.royalSpots)
            ? p.royalSpots.map(formatSpotEntry).join('')
            : '';
        const outlandsHtml = Array.isArray(p.outlandsSpots)
            ? p.outlandsSpots.map(formatSpotEntry).join('')
            : '';
        const tipsHtml = Array.isArray(p.tips)
            ? p.tips.map(s => `<li>${s}</li>`).join('')
            : '';

        card.innerHTML = `
            <div class="profession-header">
                <div class="profession-icon">${p.icon}</div>
                <div>
                    <h3 class="profession-name">${p.name}</h3>
                    <div class="profession-tagline">${p.tagline || ''}</div>
                </div>
            </div>
            <div class="profession-body">
                <div class="profession-row">
                    <span class="row-label">${t('professions.labelResource', 'Resource')}</span>
                    <span class="row-value">${p.resource}</span>
                </div>
                <div class="profession-row">
                    <span class="row-label">${t('professions.labelHub', 'City Hub')}</span>
                    <span class="row-value">${p.hub}</span>
                </div>
                <div class="profession-row">
                    <span class="row-label">${t('professions.labelBiomes', 'Best Biomes')}</span>
                    <div class="profession-badges">${biomesHtml}</div>
                </div>
                <div class="profession-row">
                    <span class="row-label">${t('professions.labelTools', 'Tools by Tier')}</span>
                    <table class="profession-tools-table">
                        <thead><tr><th>Tier</th><th>${t('professions.labelToolName', 'Tool')}</th></tr></thead>
                        <tbody>${toolsHtml}</tbody>
                    </table>
                </div>
                <div class="profession-row">
                    <span class="row-label">${t('professions.labelRoyalSpots', 'Royal Continent Spots (T2-T6)')}</span>
                    <ul class="profession-list profession-spot-list">${royalHtml}</ul>
                </div>
                <div class="profession-row">
                    <span class="row-label">${t('professions.labelOutlandsSpots', 'Outlands Spots (T7-T8)')}</span>
                    <ul class="profession-list profession-spot-list">${outlandsHtml}</ul>
                </div>
                <div class="profession-row">
                    <span class="row-label">${t('professions.labelTips', 'Tips')}</span>
                    <ul class="profession-list">${tipsHtml}</ul>
                </div>
            </div>
        `;
        panels.appendChild(card);
    });
}

// ============================================
// BIOME DATA & RENDERING
// ============================================

function getBiomeData() {
    return [
        {
            name: t('biome_names.swamp'),
            city: 'Thetford',
            primaryResource: 'Fiber (Hemp)',
            secondaryResource: 'Wood (Log)',
            tertiaryResource: 'Hide',
            image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663244214689/CP2xbP6jZ7YquxKLmra3zY/biome-forest-GU38UQaqucTXFdpCjtksAA.webp',
            description: t('biome_descriptions.swamp'),
            color: '#5a189a',
        },
        {
            name: t('biome_names.forest'),
            city: 'Lymhurst',
            primaryResource: 'Wood (Log)',
            secondaryResource: 'Hide',
            tertiaryResource: 'Stone',
            image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663244214689/CP2xbP6jZ7YquxKLmra3zY/biome-forest-GU38UQaqucTXFdpCjtksAA.webp',
            description: t('biome_descriptions.forest'),
            color: '#2d5016',
        },
        {
            name: t('biome_names.mountain'),
            city: 'Fort Sterling',
            primaryResource: 'Ore (Iron)',
            secondaryResource: 'Stone',
            tertiaryResource: 'Fiber',
            image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663244214689/CP2xbP6jZ7YquxKLmra3zY/biome-mountain-njbLb46H7FGuykLTKS9wMS.webp',
            description: t('biome_descriptions.mountain'),
            color: '#4a5568',
        },
        {
            name: t('biome_names.highland'),
            city: 'Martlock',
            primaryResource: 'Stone',
            secondaryResource: 'Ore (Iron)',
            tertiaryResource: 'Wood',
            image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663244214689/CP2xbP6jZ7YquxKLmra3zY/biome-mountain-njbLb46H7FGuykLTKS9wMS.webp',
            description: t('biome_descriptions.highland'),
            color: '#8b6914',
        },
        {
            name: t('biome_names.steppe'),
            city: 'Bridgewatch',
            primaryResource: 'Hide',
            secondaryResource: 'Fiber',
            tertiaryResource: 'Ore',
            image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663244214689/CP2xbP6jZ7YquxKLmra3zY/biome-steppe-Hzd9bGzAkigiRx6SatXPpd.webp',
            description: t('biome_descriptions.steppe'),
            color: '#c9a227',
        },
    ];
}

function renderBiomes() {
    const grid = document.getElementById('biomesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const biomes = getBiomeData();

    biomes.forEach(biome => {
        const card = document.createElement('div');
        card.className = 'biome-card';
        card.style.borderColor = biome.color;

        card.innerHTML = `
            <div class="biome-image">
                <img src="${biome.image}" alt="${biome.name}" loading="lazy">
                <div class="biome-image-overlay">
                    <h3 class="biome-name">${biome.name}</h3>
                    <p class="biome-city">${biome.city}</p>
                </div>
            </div>
            <div class="biome-content">
                <p class="biome-description">${biome.description}</p>
                <div class="resource-group">
                    <p class="resource-label">${t('biomes.primaryResource')}</p>
                    <span class="badge badge-primary">${biome.primaryResource}</span>
                </div>
                <div class="resource-group">
                    <p class="resource-label">${t('biomes.secondaryResource')}</p>
                    <span class="badge badge-outline">${biome.secondaryResource}</span>
                </div>
                <div class="resource-group">
                    <p class="resource-label">${t('biomes.tertiaryResource')}</p>
                    <span class="badge badge-outline">${biome.tertiaryResource}</span>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ============================================
// TIER DATA & RENDERING
// ============================================

function getTierData() {
    return [
        {
            tier: 1,
            location: t('tiers.tier1.location'),
            zoneType: t('tiers.tier1.zoneType'),
            resources: ['Fiber', 'Hide', 'Ore', 'Wood', 'Stone'],
            tips: t('tiers.tier1.tips') || [],
            danger: 'safe',
        },
        {
            tier: 4,
            location: t('tiers.tier4.location'),
            zoneType: t('tiers.tier4.zoneType'),
            resources: ['Fiber', 'Hide', 'Ore', 'Wood', 'Stone'],
            tips: t('tiers.tier4.tips') || [],
            danger: 'moderate',
        },
        {
            tier: 6,
            location: t('tiers.tier6.location'),
            zoneType: t('tiers.tier6.zoneType'),
            resources: ['Fiber', 'Hide', 'Ore', 'Wood', 'Stone'],
            tips: t('tiers.tier6.tips') || [],
            danger: 'dangerous',
        },
        {
            tier: 7,
            location: t('tiers.tier7.location'),
            zoneType: t('tiers.tier7.zoneType'),
            resources: ['Fiber', 'Hide', 'Ore', 'Wood', 'Stone'],
            tips: t('tiers.tier7.tips') || [],
            danger: 'dangerous',
        },
        {
            tier: 8,
            location: t('tiers.tier8.location'),
            zoneType: t('tiers.tier8.zoneType'),
            resources: ['Fiber', 'Hide', 'Ore', 'Wood', 'Stone'],
            tips: t('tiers.tier8.tips') || [],
            danger: 'dangerous',
        },
    ];
}

function renderTiers() {
    const container = document.getElementById('tiersContainer');
    if (!container) return;
    container.innerHTML = '';

    const tiers = getTierData();

    tiers.forEach(tier => {
        const card = document.createElement('div');
        card.className = 'tier-card';

        const dangerBadgeClass = `badge badge-${tier.danger}`;

        let tipsHTML = '';
        if (Array.isArray(tier.tips)) {
            tipsHTML = tier.tips.map(tip => `<li>${tip}</li>`).join('');
        }

        card.innerHTML = `
            <div class="tier-header">
                <div>
                    <h3 class="tier-title">Tier ${tier.tier}</h3>
                    <p class="tier-location">${tier.location}</p>
                </div>
                <div class="tier-badges">
                    <span class="badge badge-outline">${tier.zoneType}</span>
                    <span class="${dangerBadgeClass}">${t('common.' + tier.danger)}</span>
                </div>
            </div>
            <div class="tier-body">
                <div class="tier-section">
                    <h4 class="tier-section-title">${t('tiers.resources')}</h4>
                    <div class="resources-badges">
                        ${tier.resources.map(resource => `<span class="badge badge-outline">${resource}</span>`).join('')}
                    </div>
                </div>
                <div class="tier-section">
                    <h4 class="tier-section-title">${t('tiers.tips')}</h4>
                    <ul class="tips-list">
                        ${tipsHTML}
                    </ul>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// ============================================
// T8 MAPS DATA & RENDERING
// ============================================

function getT8MapsData() {
    return {
        [t('t8Maps.fiber')]: ['Willow Wood', 'Drownfield Mire', 'Wispwhisper Marsh', 'Nightcreak Marsh'],
        [t('t8Maps.wood')]: ['Whitebank Wall', 'Whitebank Ridge', 'Highbole Glen', 'Timberscar Dell'],
        [t('t8Maps.hide')]: ['Sandmount Ascent', 'Sandrift Dunes', 'Dryvein Oasis', 'Sandmount Desert'],
        [t('t8Maps.stone')]: ['Everwinter Peak', 'Frostpeak Ascent', 'Whitepeak Tundra', 'Glacierfall Valley'],
        [t('t8Maps.ore')]: ['Blackthorn Quarry', 'Shaleheath Hills', 'Birken Fell', 'Munten Fell'],
    };
}

function renderT8Maps() {
    const grid = document.getElementById('t8MapsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const maps = getT8MapsData();

    Object.entries(maps).forEach(([resource, mapList]) => {
        const card = document.createElement('div');
        card.className = 't8-card';

        const mapsHTML = mapList.map(map => `<li>${map}</li>`).join('');

        card.innerHTML = `
            <h3 class="t8-card-title">${resource}</h3>
            <ul class="t8-maps-list">
                ${mapsHTML}
            </ul>
        `;

        grid.appendChild(card);
    });
}

// ============================================
// GATHERING BUILDS DATA & RENDERING
// ============================================

function getGatheringBuilds() {
    return [
        {
            name: t('builds.solo'),
            type: t('builds.typeSolo'),
            items: [
                'Assassin Jacket',
                'Assassin Boots',
                'Assassin Hood',
                'Gathering Axe T8',
                'Satchel'
            ]
        },
        {
            name: t('builds.tank'),
            type: t('builds.typeGroup'),
            items: [
                'Knight Armor',
                'Knight Boots',
                'Knight Helm',
                'Gathering Axe T8',
                'Bag'
            ]
        },
        {
            name: t('builds.balanced'),
            type: t('builds.typeVersatile'),
            items: [
                'Cleric Robe',
                'Cleric Sandals',
                'Cleric Cowl',
                'Gathering Axe T8',
                'Satchel'
            ]
        }
    ];
}

function renderGatheringBuilds() {
    const grid = document.getElementById('buildsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const builds = getGatheringBuilds();

    builds.forEach(build => {
        const card = document.createElement('div');
        card.className = 'build-card';

        const itemsHTML = build.items.map(item => `<div class="build-item">→ ${item}</div>`).join('');

        card.innerHTML = `
            <div class="build-name">${build.name}</div>
            <div class="build-type">${build.type}</div>
            <div class="build-items">
                ${itemsHTML}
            </div>
        `;

        grid.appendChild(card);
    });
}

// ============================================
// EVENTS SCHEDULE DATA & RENDERING
// ============================================

function getEventSchedule() {
    return [
        {
            time: t('events.worldBoss'),
            title: t('events.worldBoss'),
            description: t('events.worldBossDesc'),
            note: t('events.worldBossNote')
        },
        {
            time: '14:00 UTC (9 PM WIB)',
            title: t('events.primeTime'),
            description: t('events.primeTimeDesc'),
            note: t('events.primeTimeNote')
        },
        {
            time: '13:00-15:00 UTC',
            title: t('events.dangerWindow'),
            description: t('events.dangerWindowDesc'),
            note: t('events.dangerWindowNote')
        },
        {
            time: '21:00-09:00 UTC',
            title: t('events.lowActivity'),
            description: t('events.lowActivityDesc'),
            note: t('events.lowActivityNote')
        }
    ];
}

function renderEventSchedule() {
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const events = getEventSchedule();

    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';

        card.innerHTML = `
            <div class="event-time">${event.time}</div>
            <div class="event-description"><strong>${event.title}</strong></div>
            <div class="event-description">${event.description}</div>
            <div class="event-note">💡 ${event.note}</div>
        `;

        grid.appendChild(card);
    });
}

// ============================================
// PRIME TIME TRACKER
// ============================================

function updatePrimeTimeTracker() {
    const now = new Date();

    // UTC Time
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcTimeString = `${String(utcHours).padStart(2, '0')}:${String(utcMinutes).padStart(2, '0')} UTC`;

    // Local Time
    const localHours = now.getHours();
    const localMinutes = now.getMinutes();
    const ampm = localHours >= 12 ? 'PM' : 'AM';
    const displayHours = localHours % 12 || 12;
    const localTimeString = `${String(displayHours).padStart(2, '0')}:${String(localMinutes).padStart(2, '0')} ${ampm}`;

    const utcTimeEl = document.getElementById('utcTime');
    if (utcTimeEl) {
        utcTimeEl.textContent = utcTimeString;
    }

    const localTimeEl = document.getElementById('localTime');
    if (localTimeEl) {
        localTimeEl.textContent = localTimeString;
    }

    // Determine danger level
    let dangerLevel = 'safe';
    let statusText = t('tracker.safeStatus');

    if (utcHours >= 13 && utcHours < 15) {
        dangerLevel = 'extreme';
        statusText = t('tracker.extremeStatus');
    } else if ((utcHours >= 9 && utcHours < 13) || (utcHours >= 15 && utcHours < 21)) {
        dangerLevel = 'moderate';
        statusText = t('tracker.moderateStatus');
    } else {
        dangerLevel = 'safe';
        statusText = t('tracker.safeStatus');
    }

    const dangerEl = document.getElementById('dangerLevel');
    if (dangerEl) {
        dangerEl.textContent = t('common.' + dangerLevel);
        dangerEl.className = `danger-level ${dangerLevel}`;
    }

    const statusEl = document.getElementById('statusInfo');
    if (statusEl) {
        statusEl.textContent = statusText;
    }
}

// Update prime time tracker every minute
setInterval(updatePrimeTimeTracker, 60000);

// ============================================
// PRO TIPS RENDERING
// ============================================

function renderProTips() {
    const efficiencyTips = t('proTips.efficiency.tips') || [];
    const safetyTips = t('proTips.safety.tips') || [];
    const profitabilityTips = t('proTips.profitability.tips') || [];

    const efficiencyContainer = document.getElementById('efficiencyTips');
    const safetyContainer = document.getElementById('safetyTips');
    const profitabilityContainer = document.getElementById('profitabilityTips');

    if (efficiencyContainer) {
        efficiencyContainer.innerHTML = Array.isArray(efficiencyTips)
            ? efficiencyTips.map(tip => `<p>${tip}</p>`).join('')
            : '';
    }

    if (safetyContainer) {
        safetyContainer.innerHTML = Array.isArray(safetyTips)
            ? safetyTips.map(tip => `<p>${tip}</p>`).join('')
            : '';
    }

    if (profitabilityContainer) {
        profitabilityContainer.innerHTML = Array.isArray(profitabilityTips)
            ? profitabilityTips.map(tip => `<p>${tip}</p>`).join('')
            : '';
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setupSidebar();
    setupTabs();

    // Load translations first
    loadTranslations().then(() => {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                currentLanguage = lang;
                localStorage.setItem('language', lang);
                updatePageLanguage();
            });
        });

        // Scroll to main content button
        const startFarmingBtn = document.querySelector('.btn-primary');
        if (startFarmingBtn) {
            startFarmingBtn.addEventListener('click', () => {
                const guides = document.getElementById('guides');
                if (guides) {
                    guides.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        updatePrimeTimeTracker();
    });
});
