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
