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
 * this one file and re-deploy it to wherever it's hosted.
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
.pp-widget .cta-secondary{
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:transparent;
    color:var(--accent) !important;
    font-size:15px;
    font-weight:700 !important;
    text-decoration:none;
    padding:12px 25px;
    border:1.5px solid var(--accent);
    border-radius:100px;
    transition:background .15s ease, color .15s ease;
  }
.pp-widget .cta-secondary:hover{
    background:var(--accent);
    color:#fff !important;
  }
.pp-widget .cta-secondary svg{
    width:16px;
    height:16px;
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

.pp-widget .breadcrumb-nav{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:6px;
    font-size:13px;
    color:var(--muted) !important;
    margin-bottom:20px;
  }
.pp-widget .breadcrumb-nav a{
    color:var(--muted) !important;
    font-weight:600 !important;
    text-decoration:none;
  }
.pp-widget .breadcrumb-nav a:hover{
    color:var(--accent) !important;
  }
.pp-widget .breadcrumb-nav .breadcrumb-sep{
    color:var(--line);
  }
.pp-widget .breadcrumb-nav .breadcrumb-current{
    color:var(--ink) !important;
    font-weight:600 !important;
  }

.pp-widget .photo-lightbox{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(28,43,51,0.75);
    z-index:1100;
    align-items:center;
    justify-content:center;
    padding:32px;
    cursor:zoom-out;
  }
.pp-widget .photo-lightbox.open{
    display:flex;
  }
.pp-widget .photo-lightbox img{
    max-width:min(420px, 90vw);
    max-height:80vh;
    border-radius:14px;
    box-shadow:0 20px 60px rgba(0,0,0,0.35);
    object-fit:cover;
  }
.pp-widget .profile-photo{
    cursor:zoom-in;
  }
.pp-widget .profile-photo-initials{
    cursor:default;
  }

@keyframes ppFadeInUp{
    from{opacity:0; transform:translateY(8px);}
    to{opacity:1; transform:translateY(0);}
  }
.pp-widget .pp-fade-in{
    animation:ppFadeInUp .45s ease both;
  }

.pp-widget .fact-value-copyable{
    display:inline-flex;
    align-items:center;
    gap:6px;
  }
.pp-widget .copy-btn{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:22px;
    height:22px;
    padding:0;
    border:none;
    background:none;
    color:var(--muted) !important;
    cursor:pointer;
    border-radius:5px;
    transition:background .15s ease, color .15s ease;
  }
.pp-widget .copy-btn:hover{
    background:var(--accent-soft);
    color:var(--accent) !important;
  }
.pp-widget .copy-btn svg{
    width:14px;
    height:14px;
  }
.pp-widget .copy-btn.copied{
    color:#1F6B49 !important;
  }

.pp-widget .related-section{
    margin-top:36px;
  }
.pp-widget .related-heading{
    font-size:16px;
    font-weight:700 !important;
    color:var(--ink) !important;
    margin-bottom:14px;
  }
.pp-widget .related-grid{
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:14px;
  }
@media (max-width:640px){
  .pp-widget .related-grid{grid-template-columns:1fr;}
}
.pp-widget .related-card{
    display:flex;
    flex-direction:column;
    align-items:center;
    text-align:center;
    gap:6px;
    background:var(--card);
    border:1px solid var(--line);
    border-radius:10px;
    padding:18px 14px;
    text-decoration:none;
    transition:border-color .15s ease, box-shadow .15s ease;
  }
.pp-widget .related-card:hover{
    border-color:#C7D2D2;
    box-shadow:0 4px 16px rgba(28,43,51,0.06);
  }
.pp-widget .related-photo{
    width:64px;
    height:64px;
    border-radius:50%;
    object-fit:cover;
    background:var(--accent-soft);
    cursor:default;
  }
.pp-widget .related-photo-initials{
    display:flex;
    align-items:center;
    justify-content:center;
    color:var(--accent) !important;
    font-weight:700 !important;
    font-size:20px;
  }
.pp-widget .related-name{
    font-size:13.5px;
    font-weight:700 !important;
    color:var(--ink) !important;
  }
.pp-widget .related-location{
    font-size:12px;
    font-weight:400 !important;
    color:var(--muted) !important;
  }

.pp-widget .sticky-cta{
    position:fixed;
    left:50%;
    bottom:20px;
    z-index:1050;
    display:inline-flex;
    align-items:center;
    gap:8px;
    background:var(--accent);
    color:#fff !important;
    font-size:14px;
    font-weight:700 !important;
    text-decoration:none;
    padding:12px 24px;
    border-radius:100px;
    box-shadow:0 4px 14px rgba(28,43,51,0.25);
    opacity:0;
    transform:translate(-50%, 12px);
    pointer-events:none;
    transition:opacity .2s ease, transform .2s ease, background .15s ease;
  }
.pp-widget .sticky-cta.visible{
    opacity:1;
    transform:translate(-50%, 0);
    pointer-events:auto;
  }
.pp-widget .sticky-cta:hover{
    background:#16223C;
  }
.pp-widget .sticky-cta svg{
    width:16px;
    height:16px;
  }
@media (max-width:600px){
  .pp-widget .sticky-cta{
    bottom:14px;
    padding:10px 20px;
    font-size:13px;
  }
}
`;
  const MARKUP = `<div class="pp-widget">
<div class="page-bg">
<div class="wrap">
  <nav class="breadcrumb-nav" aria-label="Breadcrumb">
    <a href="/clinician-directory">All Providers</a>
    <span class="breadcrumb-sep">/</span>
    <a href="/clinician-directory" id="breadcrumbType">Providers</a>
    <span class="breadcrumb-sep">/</span>
    <span class="breadcrumb-current" id="breadcrumbCurrent">Loading&hellip;</span>
  </nav>
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
  <div id="relatedProviders"></div>
</div>
</div>
</div>

<div class="photo-lightbox" id="photoLightbox">
  <img id="photoLightboxImg" src="" alt="" />
</div>

<a class="sticky-cta" id="stickyCta" href="/new-patient">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  Become A New Patient
</a>`;

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

            renderProfile(match, headers, allRows);
            injectStructuredData(match);
            injectBreadcrumbData(match);
          }catch(err){
            showError("Could not read the spreadsheet data. Double check the sheet is shared as 'Anyone with the link can view'.");
          }
        }
      }
    }
  };

  function renderProfile(row, headers, allRows){
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

    // Breadcrumb: "All Providers / Prescribers / <Name>" — the middle
    // segment's link and label depend on this provider's Type, so a
    // prescriber's page reads "Prescribers" and links to /prescribers,
    // and a therapist's page reads "Therapists" and links to /therapists.
    let backHref = "/clinician-directory";
    let backLabel = "Providers";
    if (/^prescriber$/i.test(typeVal)){
      backHref = "/prescribers";
      backLabel = "Prescribers";
    } else if (/^therapist$/i.test(typeVal)){
      backHref = "/therapists";
      backLabel = "Therapists";
    }
    const breadcrumbType = document.getElementById('breadcrumbType');
    breadcrumbType.href = backHref;
    breadcrumbType.textContent = backLabel;
    document.getElementById('breadcrumbCurrent').textContent = displayName;

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
      ? `<div class="facts-panel">${facts.map(([label, value]) => {
          if (label === "NPI"){
            return `<div class="fact"><span class="fact-label">${escapeHtml(label)}</span><span class="fact-value fact-value-copyable">${escapeHtml(value)}<button type="button" class="copy-btn" data-copy-value="${escapeHtml(value)}" aria-label="Copy NPI to clipboard"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button></span></div>`;
          }
          return `<div class="fact"><span class="fact-label">${escapeHtml(label)}</span><span class="fact-value">${escapeHtml(value)}</span></div>`;
        }).join("")}</div>`
      : "";

    const bioHtml = bioVal
      ? `<div class="bio-heading">About ${escapeHtml(firstName || plainName)}</div><p class="bio-text">${escapeHtml(bioVal)}</p>`
      : "";

    const profileCard = document.getElementById('profileCard');
    profileCard.innerHTML = `
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
        <a class="cta-secondary" href="/prescribers">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5 3 13a5 5 0 0 1 7-7l1 1"/><path d="M13.5 3.5 21 11a5 5 0 0 1-7 7l-1-1"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          View Prescribers
        </a>
        <a class="cta-secondary" href="/therapists">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          View Therapists
        </a>
      </div>
    `;
    profileCard.classList.add('pp-fade-in');

    document.title = `${displayName} — Evolve Psychiatry`;

    renderRelatedProviders(row, allRows, typeVal, locationVal);
    setupStickyCta(profileCard.querySelector('.cta-row'));
  }

  // Picks up to 3 other providers of the same Type — preferring ones in
  // the same Location first — so a dead-end profile page becomes a
  // browsing path to other providers instead of a stop sign.
  function pickRelatedProviders(currentRow, allRows, typeVal, locationVal){
    const currentSlug = slugify(`${currentRow["First Name"] || ""} ${currentRow["Last Name"] || ""}`);
    const typeLower = typeVal.toLowerCase();
    const locationLower = locationVal.toLowerCase();

    const sameType = allRows.filter(r => {
      const slug = slugify(`${r["First Name"] || ""} ${r["Last Name"] || ""}`);
      if (!slug || slug === currentSlug) return false;
      return (r["Type"] || "").trim().toLowerCase() === typeLower;
    });

    const sameLocation = sameType.filter(r => (r["Location"] || "").trim().toLowerCase() === locationLower && locationLower);
    const rest = sameType.filter(r => !sameLocation.includes(r));

    return {
      picks: [...sameLocation, ...rest].slice(0, 3),
      hasSameLocationMatch: sameLocation.length > 0
    };
  }

  function renderRelatedProviders(currentRow, allRows, typeVal, locationVal){
    const container = document.getElementById('relatedProviders');
    if (!typeVal || !allRows || !allRows.length){
      container.innerHTML = "";
      return;
    }

    const { picks, hasSameLocationMatch } = pickRelatedProviders(currentRow, allRows, typeVal, locationVal);
    if (!picks.length){
      container.innerHTML = "";
      return;
    }

    const heading = (hasSameLocationMatch && locationVal)
      ? `Other ${escapeHtml(typeVal)}s in ${escapeHtml(formatLocation(locationVal))}`
      : `Other ${escapeHtml(typeVal)}s You May Like`;

    const cardsHtml = picks.map(p => {
      const pFirst = p["First Name"] || "";
      const pLast = p["Last Name"] || "";
      const pName = `${pFirst} ${pLast}`.trim();
      const pTitle = (p["Title"] || "").trim();
      const pDisplay = pTitle ? `${pName}, ${pTitle}` : pName;
      const pSlug = slugify(pName);
      const pPhoto = (p["Photo URL"] || "").trim();
      const pLocation = (p["Location"] || "").trim();

      const pPhotoHtml = pPhoto
        ? `<img class="related-photo" src="${escapeHtml(pPhoto)}" alt="${escapeHtml(pDisplay)}" loading="lazy" onerror="this.remove()" />`
        : `<div class="related-photo related-photo-initials">${escapeHtml(initials(pName))}</div>`;

      return `<a class="related-card" href="/${pSlug}">
          ${pPhotoHtml}
          <span class="related-name">${escapeHtml(pDisplay)}</span>
          ${pLocation ? `<span class="related-location">${escapeHtml(formatLocation(pLocation))}</span>` : ""}
        </a>`;
    }).join("");

    container.innerHTML = `
      <div class="related-section pp-fade-in">
        <div class="related-heading">${heading}</div>
        <div class="related-grid">${cardsHtml}</div>
      </div>
    `;
  }

  // Shows the floating "Become A New Patient" button only while the
  // real CTA row (at the bottom of the card) is scrolled out of view,
  // so it never sits redundantly on top of the same button.
  function setupStickyCta(ctaRow){
    const stickyCta = document.getElementById('stickyCta');
    if (!ctaRow || !stickyCta || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        stickyCta.classList.toggle('visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    observer.observe(ctaRow);
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

  // Injects a BreadcrumbList matching the visible breadcrumb nav above
  // the card, so search engines can show the same trail in results.
  function injectBreadcrumbData(row){
    const firstName = row["First Name"] || "";
    const lastName = row["Last Name"] || "";
    const plainName = `${firstName} ${lastName}`.trim();
    if (!plainName) return;
    const title = (row["Title"] || "").trim();
    const displayName = title ? `${plainName}, ${title}` : plainName;
    const typeVal = (row["Type"] || "").trim();

    const site = "https://evolvepsychiatry.com";
    const items = [
      { "@type": "ListItem", "position": 1, "name": "All Providers", "item": `${site}/clinician-directory` }
    ];
    if (/^prescriber$/i.test(typeVal)){
      items.push({ "@type": "ListItem", "position": 2, "name": "Prescribers", "item": `${site}/prescribers` });
    } else if (/^therapist$/i.test(typeVal)){
      items.push({ "@type": "ListItem", "position": 2, "name": "Therapists", "item": `${site}/therapists` });
    }
    items.push({ "@type": "ListItem", "position": items.length + 1, "name": displayName, "item": getPageLocation().href });

    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };

    let script = document.getElementById('breadcrumbStructuredData');
    if (!script){
      script = document.createElement('script');
      script.type = "application/ld+json";
      script.id = "breadcrumbStructuredData";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(breadcrumbData);
  }

  function loadSheet(){
    const script = document.createElement('script');
    script.src = buildUrl();
    script.onerror = () => showError("Couldn't reach the spreadsheet. Make sure it's shared as 'Anyone with the link can view'.");
    document.body.appendChild(script);
  }

  // Photo lightbox — only real photos (actual <img> elements) are
  // zoomable; the initials fallback (a plain div) is not clickable.
  document.getElementById('profileCard').addEventListener('click', (e) => {
    const img = e.target.closest('img.profile-photo');
    if (!img) return;
    const lightbox = document.getElementById('photoLightbox');
    const lightboxImg = document.getElementById('photoLightboxImg');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });

  document.getElementById('photoLightbox').addEventListener('click', () => {
    document.getElementById('photoLightbox').classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){
      document.getElementById('photoLightbox').classList.remove('open');
    }
  });

  // Copy-NPI button — brief "copied" visual feedback, no external
  // dependency, falls back silently on browsers without Clipboard API.
  document.getElementById('profileCard').addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const value = btn.dataset.copyValue || "";
    if (!value || !navigator.clipboard) return;
    navigator.clipboard.writeText(value).then(() => {
      const original = btn.innerHTML;
      btn.classList.add('copied');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = original;
      }, 1500);
    }).catch(() => {});
  });

  loadSheet();


})();

/*
 * ============================================================
 * HOW TO HOST THIS FILE (so every Squarespace page can share it)
 * ============================================================
 *
 * Currently hosted via GitHub Pages with a custom domain (CNAME), e.g.:
 *   https://provider-unique-page-public.evolvepsychiatry.com/provider-profile.js
 *
 * GitHub Pages serves the repo's current content directly — pushing a
 * commit updates the live file within roughly a minute, no manual CDN
 * purge step required. Your own browser can still cache the script
 * file locally though, so a hard refresh or incognito window rules
 * that out when checking a fresh change.
 *
 * (Earlier this was served via jsDelivr's GitHub CDN, which DID require
 * a manual purge after every edit — see git history / prior notes if
 * you ever need to fall back to that setup.)
 */
