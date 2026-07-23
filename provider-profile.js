/*
 * Evolve Psychiatry — Individual Provider Profile Page
 * ------------------------------------------------------
 * This ONE file powers every provider's personal page. Each Squarespace
 * page just needs this tiny snippet in a code block:
 *
 *   <div id="pp-root"></div>
 *   <script src="YOUR_HOSTED_URL_HERE/provider-profile.js"></script>
 *
 * The script figures out which provider to show from the page's own URL
 * (e.g. a page at /priyadarshan-bajpayi renders Priyadarshan Bajpayi's
 * profile), so nothing on the Squarespace side ever needs to change when
 * you add a new provider — you just create a new page at
 * /first-last-name and paste the exact same two lines above into it.
 *
 * To update the design or logic for every provider's page at once, edit
 * this one file and re-deploy it to wherever it's hosted (see notes at
 * the bottom about GitHub + jsDelivr and CDN caching).
 */
(function () {

  const CSS = `
.pp-widget{
    --ink:#1C2B33;
    --muted:#5B6B72;
    --line:#DCE3E3;
    --bg:#FAFAF9;
    --card:#FFFFFF;
    --accent:#22345A;
    --accent-soft:#E8EBF2;
  }
.pp-widget *{box-sizing:border-box;}
.pp-widget{
    margin:0;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
    color:var(--ink) !important;
  }
.pp-widget a:focus-visible,
.pp-widget button:focus-visible{
    outline:2px solid var(--accent);
    outline-offset:2px;
  }
.pp-widget .page-bg{
    position:relative;
    left:50%;
    right:50%;
    margin-left:-50vw;
    margin-right:-50vw;
    width:100vw;
    background:var(--bg);
  }
.pp-widget .wrap{
    max-width:820px;
    margin:0 auto;
    padding:32px 20px 64px;
  }
.pp-widget .back-link{
    display:inline-flex;
    align-items:center;
    gap:6px;
    font-size:14px;
    font-weight:600 !important;
    color:var(--muted) !important;
    text-decoration:none;
    margin-bottom:20px;
  }
.pp-widget .back-link:hover{
    color:var(--accent) !important;
  }
.pp-widget .back-link svg{
    width:15px;
    height:15px;
  }
.pp-widget .profile-card{
    background:var(--card);
    border:1px solid var(--line);
    border-radius:14px;
    padding:36px;
  }
@media (max-width:600px){
  .pp-widget .profile-card{padding:24px 18px;}
}
.pp-widget .profile-header{
    display:flex;
    gap:24px;
    align-items:flex-start;
    margin-bottom:24px;
  }
@media (max-width:560px){
  .pp-widget .profile-header{flex-direction:column;align-items:center;text-align:center;}
}
.pp-widget .profile-photo{
    width:160px;
    height:160px;
    border-radius:50%;
    object-fit:cover;
    flex-shrink:0;
    background:var(--accent-soft);
  }
.pp-widget .profile-photo-initials{
    display:flex;
    align-items:center;
    justify-content:center;
    color:var(--accent) !important;
    font-weight:700 !important;
    font-size:48px;
  }
.pp-widget .profile-heading h1{
    margin:0 0 6px 0;
    font-size:28px;
    font-weight:700 !important;
    line-height:1.2;
    letter-spacing:-0.01em;
  }
.pp-widget .badge-row{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:8px;
    margin-bottom:8px;
  }
.pp-widget .location-badge{
    display:inline-flex;
    align-items:center;
    gap:5px;
    font-size:13px;
    font-weight:600 !important;
    color:var(--accent) !important;
    background:var(--accent-soft);
    padding:4px 12px;
    border-radius:100px;
  }
.pp-widget .location-badge svg{
    width:13px;
    height:13px;
    flex-shrink:0;
  }
.pp-widget .suite-badge{
    display:inline-flex;
    align-items:center;
    gap:5px;
    font-size:13px;
    font-weight:600 !important;
    color:var(--accent) !important;
    background:var(--accent-soft);
    padding:4px 12px;
    border-radius:100px;
  }
.pp-widget .suite-badge svg{
    width:13px;
    height:13px;
    flex-shrink:0;
  }
.pp-widget .status-banner{
    display:flex;
    align-items:center;
    gap:8px;
    font-size:14.5px;
    font-weight:700 !important;
    padding:12px 18px;
    border-radius:10px;
    margin-bottom:24px;
  }
.pp-widget .status-banner svg{
    width:18px;
    height:18px;
    flex-shrink:0;
  }
.pp-widget .status-banner.open{
    background:#E4F3EC;
    color:#1F6B49 !important;
  }
.pp-widget .status-banner.closed{
    background:#FBEAE6;
    color:#B3402A !important;
  }
.pp-widget .telehealth-note{
    display:flex;
    align-items:center;
    gap:6px;
    font-size:13.5px;
    font-weight:400 !important;
    color:var(--muted) !important;
    margin:-12px 0 24px 0;
  }
.pp-widget .telehealth-note svg{
    width:14px;
    height:14px;
    flex-shrink:0;
  }
.pp-widget .facts-panel{
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:14px 24px;
    padding:20px;
    background:var(--bg);
    border:1px solid var(--line);
    border-radius:10px;
    margin-bottom:28px;
  }
@media (max-width:480px){
  .pp-widget .facts-panel{grid-template-columns:1fr;}
}
.pp-widget .fact{
    display:flex;
    flex-direction:column;
    gap:2px;
  }
.pp-widget .fact-label{
    font-size:11.5px;
    font-weight:700 !important;
    text-transform:uppercase;
    letter-spacing:.04em;
    color:var(--muted) !important;
  }
.pp-widget .fact-value{
    font-size:15px;
    font-weight:600 !important;
    color:var(--ink) !important;
  }
.pp-widget .bio-heading{
    font-size:13px;
    font-weight:700 !important;
    text-transform:uppercase;
    letter-spacing:.04em;
    color:var(--muted) !important;
    margin:0 0 10px 0;
  }
.pp-widget .bio-text{
    font-size:15.5px;
    font-weight:400 !important;
    line-height:1.65;
    color:var(--ink) !important;
    margin:0 0 32px 0;
    white-space:pre-line;
  }
.pp-widget .cta-row{
    display:flex;
    flex-wrap:wrap;
    gap:12px;
  }
.pp-widget .cta-primary{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:var(--accent);
    color:#fff !important;
    font-size:15px;
    font-weight:700 !important;
    text-decoration:none;
    padding:13px 26px;
    border-radius:100px;
    transition:background .15s ease;
  }
.pp-widget .cta-primary:hover{
    background:#16223C;
  }
.pp-widget .cta-primary svg{
    width:17px;
    height:17px;
  }
.pp-widget .skeleton-header{
    display:flex;
    gap:24px;
    align-items:center;
  }
.pp-widget .skeleton-avatar{
    width:160px;
    height:160px;
    border-radius:50%;
    background:linear-gradient(90deg, #F0F0EE 25%, #F7F7F5 37%, #F0F0EE 63%);
    background-size:400% 100%;
    animation:ppShimmer 1.4s ease infinite;
    flex-shrink:0;
  }
.pp-widget .skeleton-line{
    height:14px;
    border-radius:6px;
    background:linear-gradient(90deg, #F0F0EE 25%, #F7F7F5 37%, #F0F0EE 63%);
    background-size:400% 100%;
    animation:ppShimmer 1.4s ease infinite;
    margin-bottom:10px;
  }
@keyframes ppShimmer{
    0%{background-position:100% 0;}
    100%{background-position:0 0;}
  }
.pp-widget .not-found{
    text-align:center;
    padding:60px 20px;
    color:var(--muted) !important;
  }
.pp-widget .not-found a{
    color:var(--accent) !important;
    font-weight:600 !important;
  }
`;
  const MARKUP = `<div class="pp-widget">
<div class="page-bg">
<div class="wrap">
  <a class="back-link" id="backLink" href="/clinician-directory">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    Back to all providers
  </a>
  <div class="profile-card" id="profileCard">
    <div class="skeleton-header">
      <div class="skeleton-avatar"></div>
      <div style="flex:1">
        <div class="skeleton-line" style="width:60%;height:22px;"></div>
        <div class="skeleton-line" style="width:35%;"></div>
        <div class="skeleton-line" style="width:45%;"></div>
      </div>
    </div>
  </div>
</div>
</div>
</div>`;

  // Inject the stylesheet once, even if this script somehow loads twice.
  if (!document.getElementById('pp-injected-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'pp-injected-styles';
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);
  }

  // Find (or create) the mount point and inject the widget markup into it.
  let mount = document.getElementById('pp-root');
  if (!mount) {
    mount = document.createElement('div');
    mount.id = 'pp-root';
    document.currentScript.insertAdjacentElement('afterend', mount);
  }
  mount.innerHTML = MARKUP;


  // ====== CONFIGURE THIS ======
  // Same spreadsheet the directory page reads from — single source of truth.
  const SHEET_ID = "1Z6zMinNwN3wG-ZvURG3S25BGWlvz-PLAtK7MpHBGZgA";
  const SHEET_NAME = null;

  // This is the ONLY thing that ever needs to change from one provider's
  // page to the next. It's an explicit override for which provider this
  // page shows. Leave it null to auto-detect from the page's own URL slug
  // instead (recommended — see slugFromPath below). Only set this if a
  // provider's name doesn't produce a clean URL-friendly slug on its own.
  const PROVIDER_OVERRIDE = null;
  // ============================

  const ALLOWED_HEADERS = [
    "First Name",
    "Last Name",
    "Title",
    "Location",
    "Suite",
    "Type",
    "Sex",
    "NPI",
    "Age Range",
    "New Patients",
    "Any Patients",
    "Biography",
    "Photo URL"
  ];

  const LOCATION_STATE_MAP = {
    "albany": "NY",
    "garden city": "NY",
    "hauppauge": "NY",
    "massapequa": "NY",
    "syosset": "NY",
    "wilmington": "NC"
  };

  function formatLocation(loc){
    if (!loc) return loc;
    const trimmed = loc.trim();
    const state = LOCATION_STATE_MAP[trimmed.toLowerCase()];
    return state ? `${trimmed}, ${state}` : trimmed;
  }

  function initials(name){
    const parts = (name || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // Turns a provider's full name into the same kind of slug Squarespace
  // uses for URLs, e.g. "Priyadarshan Bajpayi" -> "priyadarshan-bajpayi".
  // This is what lets every provider's page run this exact same script —
  // each page just needs its own URL; nothing here needs to be edited.
  function slugify(text){
    return (text || "").trim().toLowerCase()
      .replace(/['\u2018\u2019]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Some page builders (Squarespace's Code Block included, in some setups)
  // run pasted <script> tags in a context whose own location doesn't match
  // what's visible in the browser's address bar, so we read the real
  // top-level page URL first and only fall back to this script's own
  // location if that's not accessible.
  function getPageLocation(){
    try {
      if (window.top && window.top.location && window.top.location.href !== undefined){
        return window.top.location;
      }
    } catch (e) {
      // Cross-origin or otherwise blocked — fall through to the default below.
    }
    return window.location;
  }

  function slugFromPath(pathname){
    const segments = (pathname || "").split("/").filter(Boolean);
    return segments.length ? segments[segments.length - 1].toLowerCase() : "";
  }

  function escapeHtml(str){
    return String(str)
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  function buildUrl(){
    let url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
    if (SHEET_NAME) url += `&sheet=${encodeURIComponent(SHEET_NAME)}`;
    return url;
  }

  function showNotFound(){
    document.getElementById('profileCard').innerHTML = `
      <div class="not-found">
        <p>We couldn't find a provider matching this page.</p>
        <p><a href="/clinician-directory">View the full clinician directory →</a></p>
      </div>`;
  }

  function showError(msg){
    document.getElementById('profileCard').innerHTML = `<div class="not-found">${msg}</div>`;
  }

  window.google = {
    visualization: {
      Query: {
        setResponse: function(data){
          try{
            const cols = data.table.cols.map(c => (c.label || c.id || "").trim());
            const rawHeaders = cols.map((c,i) => c || `Column ${i+1}`);
            const colToCanonical = rawHeaders.map(rh =>
              ALLOWED_HEADERS.find(h => h.toLowerCase() === rh.toLowerCase()) || null
            );
            const headers = ALLOWED_HEADERS.filter(h => colToCanonical.includes(h));

            const allRows = data.table.rows.map(r => {
              const obj = {};
              r.c.forEach((cell, i) => {
                const canonical = colToCanonical[i];
                if (!canonical) return;
                const val = cell ? (cell.f !== undefined && cell.f !== null ? cell.f : cell.v) : "";
                obj[canonical] = val === null || val === undefined ? "" : String(val);
              });
              return obj;
            }).filter(row => Object.values(row).some(v => v && v.trim() !== ""));

            const loc = getPageLocation();
            const targetSlug = PROVIDER_OVERRIDE
              ? slugify(PROVIDER_OVERRIDE)
              : slugFromPath(loc.pathname);

            const match = allRows.find(row => {
              const fullName = `${row["First Name"] || ""} ${row["Last Name"] || ""}`;
              return slugify(fullName) === targetSlug;
            });

            if (!match){
              showNotFound();
              return;
            }

            renderProfile(match, headers);
            injectStructuredData(match);
          }catch(err){
            showError("Could not read the spreadsheet data. Double check the sheet is shared as 'Anyone with the link can view'.");
          }
        }
      }
    }
  };

  function renderProfile(row, headers){
    const firstName = row["First Name"] || "";
    const lastName = row["Last Name"] || "";
    const plainName = `${firstName} ${lastName}`.trim() || "—";
    const title = (row["Title"] || "").trim();
    const displayName = title ? `${plainName}, ${title}` : plainName;

    const typeVal = (row["Type"] || "").trim();
    const sexVal = (row["Sex"] || "").trim();
    const npiVal = (row["NPI"] || "").trim();
    const ageRangeVal = (row["Age Range"] || "").trim();
    const suiteVal = (row["Suite"] || "").trim();
    const locationVal = (row["Location"] || "").trim();
    const bioVal = (row["Biography"] || "").trim();
    const photoVal = (row["Photo URL"] || "").trim();
    const newPatientsVal = (row["New Patients"] || "").trim();
    const anyPatientsVal = (row["Any Patients"] || "").trim();

    // Point "Back to all providers" at the right directory page for this
    // provider's Type, so a prescriber's page links back to /prescribers
    // and a therapist's page links back to /therapists.
    const backLink = document.getElementById('backLink');
    if (/^prescriber$/i.test(typeVal)) backLink.href = "/prescribers";
    else if (/^therapist$/i.test(typeVal)) backLink.href = "/therapists";

    const photoHtml = photoVal
      ? `<img class="profile-photo" src="${escapeHtml(photoVal)}" alt="${escapeHtml(displayName)}${typeVal ? ', ' + escapeHtml(typeVal) : ''}${locationVal ? ' in ' + escapeHtml(formatLocation(locationVal)) : ''}" loading="lazy" onerror="this.remove()" />`
      : `<div class="profile-photo profile-photo-initials">${escapeHtml(initials(plainName))}</div>`;

    const locationBadgeHtml = locationVal
      ? `<span class="location-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>${escapeHtml(formatLocation(locationVal))}</span>`
      : "";

    const suiteHtml = suiteVal
      ? `<span class="suite-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="1"/><circle cx="15" cy="12" r="1"/></svg>Suite ${escapeHtml(suiteVal)}</span>`
      : "";

    let statusHtml = "";
    if (anyPatientsVal && /^no$/i.test(anyPatientsVal)){
      statusHtml = `<div class="status-banner closed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>Currently not accepting any patients.</div>`;
    } else if (newPatientsVal && /^no$/i.test(newPatientsVal)){
      statusHtml = `<div class="status-banner closed"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>Currently not accepting new patients.</div>`;
    } else if (newPatientsVal && /^yes$/i.test(newPatientsVal)){
      statusHtml = `<div class="status-banner open"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Accepting new patients.</div>`;
    }

    const notAcceptingNew = newPatientsVal && /^no$/i.test(newPatientsVal);
    const telehealthHtml = (/^remote$/i.test(locationVal) && !notAcceptingNew)
      ? `<div class="telehealth-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>Telehealth appointments only.</div>`
      : "";

    const facts = [];
    if (typeVal) facts.push(["Type", typeVal]);
    if (sexVal) facts.push(["Sex", sexVal]);
    if (npiVal) facts.push(["NPI", npiVal]);
    if (ageRangeVal) facts.push(["Age Range", ageRangeVal]);
    const factsHtml = facts.length
      ? `<div class="facts-panel">${facts.map(([label, value]) =>
          `<div class="fact"><span class="fact-label">${escapeHtml(label)}</span><span class="fact-value">${escapeHtml(value)}</span></div>`
        ).join("")}</div>`
      : "";

    const bioHtml = bioVal
      ? `<div class="bio-heading">About ${escapeHtml(firstName || plainName)}</div><p class="bio-text">${escapeHtml(bioVal)}</p>`
      : "";

    document.getElementById('profileCard').innerHTML = `
      <div class="profile-header">
        ${photoHtml}
        <div class="profile-heading">
          <h1>${escapeHtml(displayName)}</h1>
          <div class="badge-row">
            ${locationBadgeHtml}
            ${suiteHtml}
          </div>
        </div>
      </div>
      ${statusHtml}
      ${telehealthHtml}
      ${factsHtml}
      ${bioHtml}
      <div class="cta-row">
        <a class="cta-primary" href="/new-patient">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Become A New Patient
        </a>
      </div>
    `;

    document.title = `${displayName} — Evolve Psychiatry`;
  }

  // Injects a single Physician schema object (richer than the directory's
  // ItemList version, since this whole page is dedicated to one person).
  function injectStructuredData(row){
    const firstName = row["First Name"] || "";
    const lastName = row["Last Name"] || "";
    const plainName = `${firstName} ${lastName}`.trim();
    if (!plainName) return;

    const title = (row["Title"] || "").trim();
    const typeVal = (row["Type"] || "").trim();
    const locationVal = (row["Location"] || "").trim();
    const npiVal = (row["NPI"] || "").trim();
    const bioVal = (row["Biography"] || "").trim();
    const photoVal = (row["Photo URL"] || "").trim();

    const physician = {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": plainName,
      "url": getPageLocation().href
    };
    if (title) physician.honorificSuffix = title;
    if (typeVal) physician.jobTitle = typeVal;
    if (photoVal) physician.image = photoVal;
    if (locationVal){
      const parts = formatLocation(locationVal).split(",").map(s => s.trim());
      physician.address = { "@type": "PostalAddress", "addressLocality": parts[0] };
      if (parts[1]) physician.address.addressRegion = parts[1];
    }
    if (npiVal){
      physician.identifier = { "@type": "PropertyValue", "propertyID": "NPI", "value": npiVal };
    }
    if (bioVal) physician.description = bioVal;
    physician.worksFor = {
      "@type": "MedicalOrganization",
      "name": "Evolve Psychiatry",
      "url": "https://evolvepsychiatry.com"
    };

    let script = document.getElementById('physicianStructuredData');
    if (!script){
      script = document.createElement('script');
      script.type = "application/ld+json";
      script.id = "physicianStructuredData";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(physician);
  }

  function loadSheet(){
    const script = document.createElement('script');
    script.src = buildUrl();
    script.onerror = () => showError("Couldn't reach the spreadsheet. Make sure it's shared as 'Anyone with the link can view'.");
    document.body.appendChild(script);
  }

  loadSheet();


})();

/*
 * ============================================================
 * HOW TO HOST THIS FILE (so every Squarespace page can share it)
 * ============================================================
 *
 * Option A — GitHub + jsDelivr (recommended, this is what your site
 * already uses for other third-party scripts, e.g. the popup and
 * mobile-menu-dropdown libraries in your header):
 *
 *   1. Create a public GitHub repository (or use an existing one).
 *   2. Add this file to it, e.g. as "provider-profile.js".
 *   3. Your embed URL is:
 *      https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/YOUR_REPO@main/provider-profile.js
 *   4. Paste that into squarespace-embed-snippet.html's script src on
 *      every provider page.
 *
 *   IMPORTANT — jsDelivr caches files for a while (sometimes up to a
 *   week) for performance. After you push an update to this file on
 *   GitHub, visit this URL once to force jsDelivr to refresh immediately:
 *      https://purge.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/YOUR_REPO@main/provider-profile.js
 *   Do that every time you edit this file, or your changes won't show
 *   up on the live pages right away.
 *
 * Option B — raw.githubusercontent.com (updates show almost instantly,
 * no cache-purge step needed, but it's a less conventional way to serve
 * production JS and GitHub could rate-limit or change this behavior):
 *
 *      https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/YOUR_REPO/main/provider-profile.js
 *
 * Either way: once hosted, you NEVER touch the Squarespace code block
 * again for content or design changes — only this one file, in one
 * place, updates every provider's page at once.
 */
