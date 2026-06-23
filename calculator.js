// ============================================
// Albion Online Refining/Crafting Calculator — CrimsonBell
// ============================================

// ---- Resource Return Rate (core refining formula) ----
// RRR = (1 - 1/(1 + bonus/100)) * 100
function rrrFromBonus(bonusPercent) {
    return (1 - 1 / (1 + bonusPercent / 100)) * 100;
}

// usage fee: (ItemValue * 0.1125) * Fee/100nutrition / 100
function usageFeePerUnit(itemValue, stationFee) {
    return (itemValue * 0.1125) * stationFee / 100;
}

const NUM_RES = 4;

function num(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const v = parseFloat(el.value);
    return isNaN(v) ? 0 : v;
}

function checked(id) {
    const el = document.getElementById(id);
    return el && el.checked ? 1 : 0;
}

function readInputs() {
    const focusBonus = num('focusBonus'); // C5

    const resources = [];
    for (let i = 1; i <= NUM_RES; i++) {
        resources.push({
            name: (document.getElementById(`r${i}_name`) || {}).value || '',
            tier: (document.getElementById(`r${i}_tier`) || {}).value || '',
            price: num(`r${i}_price`),      // C11..
            qty: num(`r${i}_qty`),          // C12..
            cityBonus: num(`r${i}_bonus`),  // C14..
            useFocus: checked(`r${i}_focus`), // C15..
            itemValue: num(`r${i}_itemvalue`), // C18..
            stationFee: num(`r${i}_fee`),   // C19..
            needed: num(`r${i}_needed`),    // C24..
        });
    }

    return {
        focusBonus,
        resources,
        craft: {
            bonus: num('craft_bonus'),         // C29
            useFocus: checked('craft_focus'),  // C30
            itemValue: num('craft_itemvalue'), // C35
            stationFee: num('craft_fee'),      // C36
            numItems: num('craft_numitems'),   // C37
        },
        artifact: {
            required: checked('art_required'), // C41
            count: num('art_count'),           // C42
            price: num('art_price'),           // C43
            consumed: checked('art_consumed'), // C44
        },
        market: {
            premium: checked('mkt_premium'),   // C55
            salePrice: num('mkt_saleprice'),   // C56
            setupFee: num('mkt_setupfee'),     // C57
        },
    };
}

// Per-resource refining math (rows 13-25). focusOverride: null = use the row's own
// focus toggle (section I); 0/1 = force the focus state (focus comparison helper).
function computeResource(res, focusBonus, focusOverride) {
    const totalRaw = res.price * res.qty;                       // C13
    const useFocus = (focusOverride === null) ? res.useFocus : focusOverride;
    const effBonus = res.cityBonus + useFocus * focusBonus;     // C16
    const rrr = rrrFromBonus(effBonus);                         // C17
    const feePerUnit = usageFeePerUnit(res.itemValue, res.stationFee); // C20
    const totalUsageFee = feePerUnit * res.qty;                 // C21
    const refinedOutput = res.qty * (1 + rrr / 100);            // C22
    const effCostPerUnit = (totalRaw + totalUsageFee) / Math.max(refinedOutput, 1); // C23
    const totalEffCost = effCostPerUnit * res.needed;           // C25
    return { totalRaw, effBonus, rrr, feePerUnit, totalUsageFee, refinedOutput, effCostPerUnit, totalEffCost };
}

function isActive(res) {
    return res.qty > 0 || res.price > 0 || res.needed > 0;
}

function compute() {
    const inp = readInputs();
    const fb = inp.focusBonus;

    // ----- Section I: per-resource (uses each row's own focus toggle) -----
    const perRes = inp.resources.map(r => computeResource(r, fb, null));
    const totalRawMaterialCost = perRes.reduce((s, x) => s + x.totalEffCost, 0); // C26

    let warning = false; // C27
    inp.resources.forEach((r, i) => {
        if (isActive(r) && r.needed > perRes[i].refinedOutput) warning = true;
    });

    // ----- Section II: crafting -----
    const effCraftBonus = inp.craft.bonus + inp.craft.useFocus * fb; // C31
    const craftRRR = rrrFromBonus(effCraftBonus);                    // C32
    const matCostAfterCraft = totalRawMaterialCost * (1 - craftRRR / 100); // C34
    const craftUsageFee = usageFeePerUnit(inp.craft.itemValue, inp.craft.stationFee) * inp.craft.numItems; // C38

    // ----- Section III: artifact -----
    const artifactCost = inp.artifact.required * inp.artifact.count * inp.artifact.price
        * inp.craft.numItems * (inp.artifact.consumed ? 1 : 0); // C45

    // ----- Section IV: total production cost -----
    const totalProductionCost = matCostAfterCraft + craftUsageFee + artifactCost; // C52

    // ----- Section V: market & tax -----
    const taxPercent = inp.market.premium ? 4 : 8;                  // C58
    const gross = inp.market.salePrice * inp.craft.numItems;        // C59
    const setupCost = gross * inp.market.setupFee / 100;            // C60
    const taxCost = gross * taxPercent / 100;                       // C61
    const netRevenue = gross - setupCost - taxCost;                 // C62

    // ----- Section VI: final results -----
    const netProfit = netRevenue - totalProductionCost;            // C65
    const marginGross = gross === 0 ? 0 : netProfit / gross * 100; // C66
    const marginCost = totalProductionCost === 0 ? 0 : netProfit / totalProductionCost * 100; // C67

    // ----- Section VII: premium vs no premium -----
    const profitNoPrem = (gross - setupCost - (gross * 8 / 100)) - totalProductionCost; // C70
    const profitPrem = (gross - setupCost - (gross * 4 / 100)) - totalProductionCost;   // C71
    const premDiff = profitPrem - profitNoPrem; // C72

    // ----- Section VIII: focus vs no focus (recompute mat + production cost) -----
    function profitForFocus(forceFocus) {
        const rows = inp.resources.map(r => computeResource(r, fb, forceFocus));
        const totalMat = rows.reduce((s, x) => s + x.totalEffCost, 0);
        const cBonus = inp.craft.bonus + forceFocus * fb;
        const cRRR = rrrFromBonus(cBonus);
        const matAfter = totalMat * (1 - cRRR / 100);
        const prodCost = matAfter + craftUsageFee + artifactCost;
        return netRevenue - prodCost; // C62 - prodCost
    }
    const profitNoFocus = profitForFocus(0);   // C77 (=C93)
    const profitWithFocus = profitForFocus(1); // C78 (=C106)
    const focusDiff = profitWithFocus - profitNoFocus; // C79

    return {
        perRes, totalRawMaterialCost, warning,
        effCraftBonus, craftRRR, matCostAfterCraft, craftUsageFee,
        artifactCost, totalProductionCost,
        taxPercent, gross, setupCost, taxCost, netRevenue,
        netProfit, marginGross, marginCost,
        profitNoPrem, profitPrem, premDiff,
        profitNoFocus, profitWithFocus, focusDiff,
    };
}

// ============================================
// Formatting + rendering
// ============================================
function fmt(n, dec = 0) {
    if (!isFinite(n)) return '-';
    return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function setProfit(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = fmt(value);
    el.classList.remove('pos', 'neg');
    el.classList.add(value >= 0 ? 'pos' : 'neg');
}

function render() {
    const out = compute();

    // Per-resource derived rows
    out.perRes.forEach((x, i) => {
        const n = i + 1;
        setText(`r${n}_rawcost`, fmt(x.totalRaw));
        setText(`r${n}_effbonus`, fmt(x.effBonus, 1));
        setText(`r${n}_rrr`, fmt(x.rrr, 2) + '%');
        setText(`r${n}_output`, fmt(x.refinedOutput, 2));
        setText(`r${n}_effcost`, fmt(x.effCostPerUnit, 2));
        setText(`r${n}_totalcost`, fmt(x.totalEffCost));
    });

    setText('out_totalRawMaterialCost', fmt(out.totalRawMaterialCost));
    const warnEl = document.getElementById('out_warning');
    if (warnEl) {
        if (out.warning) {
            warnEl.textContent = (currentLang === 'id')
                ? '⚠ PERINGATAN: jumlah refined yang dibutuhkan melebihi hasil refined untuk satu/lebih resource! Cek "Hasil refined" vs "Refined dibutuhkan".'
                : '⚠ WARNING: refined needed exceeds refined produced for one or more resources! Check produced vs needed.';
            warnEl.className = 'calc-warning warn';
        } else {
            warnEl.textContent = (currentLang === 'id')
                ? '✓ OK: stok refined cukup untuk semua resource'
                : '✓ OK: refined stock is sufficient for all resources';
            warnEl.className = 'calc-warning ok';
        }
    }

    setText('out_craftRRR', fmt(out.craftRRR, 2) + '%');
    setText('out_matCostAfterCraft', fmt(out.matCostAfterCraft));
    setText('out_craftUsageFee', fmt(out.craftUsageFee));
    setText('out_artifactCost', fmt(out.artifactCost));
    setText('out_totalProductionCost', fmt(out.totalProductionCost));

    setText('out_taxPercent', fmt(out.taxPercent) + '%');
    setText('out_gross', fmt(out.gross));
    setText('out_setupCost', fmt(out.setupCost));
    setText('out_taxCost', fmt(out.taxCost));
    setText('out_netRevenue', fmt(out.netRevenue));

    setProfit('out_netProfit', out.netProfit);
    setText('out_marginGross', fmt(out.marginGross, 2) + '%');
    setText('out_marginCost', fmt(out.marginCost, 2) + '%');

    setProfit('out_profitNoPrem', out.profitNoPrem);
    setProfit('out_profitPrem', out.profitPrem);
    setText('out_premDiff', fmt(out.premDiff));

    setProfit('out_profitNoFocus', out.profitNoFocus);
    setProfit('out_profitWithFocus', out.profitWithFocus);
    setText('out_focusDiff', fmt(out.focusDiff));

    // Headline profit badge
    const badge = document.getElementById('headlineProfit');
    if (badge) {
        badge.textContent = fmt(out.netProfit);
        badge.classList.remove('pos', 'neg');
        badge.classList.add(out.netProfit >= 0 ? 'pos' : 'neg');
    }
}

// ============================================
// City Reference data (from "City Reference" sheet)
// ============================================
const CITY_REFERENCE = [
    { city: 'Martlock', refining: 'Hide +40%', crafting: 'Axe, Quarterstaff, Frost Staff, Plate Boots, Off-Hand (+15%)' },
    { city: 'Bridgewatch', refining: 'Stone +40%', crafting: 'Crossbow, Dagger, Cursed Staff, Plate Armor, Cloth Sandals (+15%)' },
    { city: 'Fort Sterling', refining: 'Wood +40%', crafting: 'Hammer, Spear, Holy Staff, Plate Helmet (+15%)' },
    { city: 'Lymhurst', refining: 'Fiber +40%', crafting: 'Sword, Bow, Arcane Staff, Leather Hood, Leather Shoes (+15%)' },
    { city: 'Thetford', refining: 'Ore +40%', crafting: 'Mace, Nature Staff, Fire Staff, Leather Jacket, Cloth Cowl (+15%)' },
    { city: 'Caerleon', refining: '— (no refining specialty)', crafting: 'Gathering Gear, Tool, Food, War Gloves, Shapeshifter Staff (+15%)' },
];

function renderCityReference() {
    const tbody = document.getElementById('cityRefBody');
    if (!tbody) return;
    tbody.innerHTML = CITY_REFERENCE.map(c => `
        <tr>
            <td class="city-name">${c.city}</td>
            <td>${c.refining}</td>
            <td>${c.crafting}</td>
        </tr>`).join('');
}

// ============================================
// Language toggle (ID / EN) for this page
// ============================================
let currentLang = localStorage.getItem('language') || 'id';

function applyLanguage() {
    document.querySelectorAll('[data-id]').forEach(el => {
        const txt = el.getAttribute('data-' + currentLang);
        if (txt !== null && txt !== undefined) el.innerHTML = txt;
    });
    document.documentElement.lang = currentLang;
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === currentLang);
    });
    render(); // re-render warning text in correct language
}

// ============================================
// Init
// ============================================
// Field help tooltips. The tooltip is position:fixed (so it isn't clipped by the
// table's horizontal scroll container) and gets placed next to its "?" button.
function positionTip(btn, tip) {
    tip.classList.add('show'); // make it measurable
    const b = btn.getBoundingClientRect();
    const t = tip.getBoundingClientRect();
    const margin = 8;
    let left = b.left + b.width / 2 - t.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - t.width - margin));
    let top = b.top - t.height - margin; // prefer above
    if (top < margin) top = b.bottom + margin; // fall back to below
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
}

function hideAllTips() {
    document.querySelectorAll('.help.open').forEach(h => h.classList.remove('open'));
    document.querySelectorAll('.help-tip.show').forEach(t => t.classList.remove('show'));
}

function setupTooltips() {
    document.querySelectorAll('.help').forEach(help => {
        const btn = help.querySelector('.help-btn');
        const tip = help.querySelector('.help-tip');
        if (!btn || !tip) return;

        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = help.classList.contains('open');
            hideAllTips();
            if (!isOpen) {
                help.classList.add('open');
                positionTip(btn, tip);
            }
        });
        // desktop hover
        help.addEventListener('mouseenter', () => {
            if (!help.classList.contains('open')) positionTip(btn, tip);
        });
        help.addEventListener('mouseleave', () => {
            if (!help.classList.contains('open')) tip.classList.remove('show');
        });
    });

    document.addEventListener('click', hideAllTips);
    window.addEventListener('scroll', hideAllTips, true);
    window.addEventListener('resize', hideAllTips);
}

function init() {
    renderCityReference();
    setupTooltips();

    // recompute on any input change
    document.querySelectorAll('#calcForm input').forEach(el => {
        el.addEventListener('input', render);
        el.addEventListener('change', render);
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.getAttribute('data-lang');
            localStorage.setItem('language', currentLang);
            applyLanguage();
        });
    });

    applyLanguage();
    render();
}

document.addEventListener('DOMContentLoaded', init);
