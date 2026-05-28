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
    renderGuides();
    renderProfessions();
    renderBiomes();
    renderTiers();
    renderT8Maps();
    renderProTips();
    renderGatheringBuilds();
    renderEventSchedule();
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

    // Sidebar link click → smooth scroll + close
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const grid = document.getElementById('guidePhasesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const phases = getGuidePhases();
    phases.forEach(phase => {
        const card = document.createElement('article');
        card.className = 'guide-phase-card';
        card.id = phase.id;

        const activitiesHtml = Array.isArray(phase.activities)
            ? phase.activities.map(a => `<li>${a}</li>`).join('')
            : '';
        const equipmentHtml = Array.isArray(phase.equipment)
            ? phase.equipment.map(a => `<li>${a}</li>`).join('')
            : '';
        const tipsHtml = Array.isArray(phase.tips)
            ? phase.tips.map(a => `<li>${a}</li>`).join('')
            : '';

        card.innerHTML = `
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
        grid.appendChild(card);
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
                { tier: 'T4', name: t('professions.tools.t4.axe', "Adept's Axe") },
                { tier: 'T6', name: t('professions.tools.t6.axe', "Expert's Axe") },
                { tier: 'T8', name: t('professions.tools.t8.axe', "Elder's Axe") }
            ],
            bestSpots: ['Whitebank Wall', 'Whitebank Ridge', 'Highbole Glen', 'Timberscar Dell'],
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
                { tier: 'T4', name: t('professions.tools.t4.pickaxe', "Adept's Pickaxe") },
                { tier: 'T6', name: t('professions.tools.t6.pickaxe', "Expert's Pickaxe") },
                { tier: 'T8', name: t('professions.tools.t8.pickaxe', "Elder's Pickaxe") }
            ],
            bestSpots: ['Blackthorn Quarry', 'Shaleheath Hills', 'Birken Fell', 'Munten Fell'],
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
                { tier: 'T4', name: t('professions.tools.t4.skinning', "Adept's Skinning Knife") },
                { tier: 'T6', name: t('professions.tools.t6.skinning', "Expert's Skinning Knife") },
                { tier: 'T8', name: t('professions.tools.t8.skinning', "Elder's Skinning Knife") }
            ],
            bestSpots: ['Sandmount Ascent', 'Sandrift Dunes', 'Dryvein Oasis', 'Sandmount Desert'],
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
                { tier: 'T4', name: t('professions.tools.t4.stonehammer', "Adept's Stone Hammer") },
                { tier: 'T6', name: t('professions.tools.t6.stonehammer', "Expert's Stone Hammer") },
                { tier: 'T8', name: t('professions.tools.t8.stonehammer', "Elder's Stone Hammer") }
            ],
            bestSpots: ['Everwinter Peak', 'Frostpeak Ascent', 'Whitepeak Tundra', 'Glacierfall Valley'],
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
                { tier: 'T4', name: t('professions.tools.t4.sickle', "Adept's Sickle") },
                { tier: 'T6', name: t('professions.tools.t6.sickle', "Expert's Sickle") },
                { tier: 'T8', name: t('professions.tools.t8.sickle', "Elder's Sickle") }
            ],
            bestSpots: ['Willow Wood', 'Drownfield Mire', 'Wispwhisper Marsh', 'Nightcreak Marsh'],
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
                { tier: 'T6', name: t('professions.tools.t6.fishingrod', "Expert's Fishing Rod") },
                { tier: 'T8', name: t('professions.tools.t8.fishingrod', "Elder's Fishing Rod") }
            ],
            bestSpots: t('professions.fisherman.bestSpots') || ['Black Zone lakes (rare fish)', 'Royal Continent rivers'],
            tips: t('professions.fisherman.tips') || []
        }
    ];
}

function renderProfessionOverview() {
    const container = document.getElementById('professionOverview');
    if (!container) return;
    const points = t('professions.overview.points') || [];
    const pointsHtml = Array.isArray(points)
        ? points.map(p => `<li>${p}</li>`).join('')
        : '';
    container.id = 'profession-overview';
    container.innerHTML = `
        <h3>${t('professions.overview.title', 'Gatherer Overview')}</h3>
        <p>${t('professions.overview.description', '')}</p>
        <ul>${pointsHtml}</ul>
    `;
}

function renderProfessions() {
    renderProfessionOverview();

    const grid = document.getElementById('professionGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const professions = getProfessions();
    professions.forEach(p => {
        const card = document.createElement('article');
        card.className = 'profession-card';
        card.id = p.id;

        const biomesHtml = p.biomes.map(b => `<span class="badge badge-outline">${b}</span>`).join('');
        const toolsHtml = p.tools.map(tool => `
            <tr>
                <td><strong>${tool.tier}</strong></td>
                <td>${tool.name}</td>
            </tr>
        `).join('');
        const spotsHtml = Array.isArray(p.bestSpots)
            ? p.bestSpots.map(s => `<li>${s}</li>`).join('')
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
                    <span class="row-label">${t('professions.labelBestSpots', 'Best T7-T8 Spots')}</span>
                    <ul class="profession-list">${spotsHtml}</ul>
                </div>
                <div class="profession-row">
                    <span class="row-label">${t('professions.labelTips', 'Tips')}</span>
                    <ul class="profession-list">${tipsHtml}</ul>
                </div>
            </div>
        `;
        grid.appendChild(card);
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
