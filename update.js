/* update.js: "New version available" pop-up. Self-contained: its own CSS, HTML and JavaScript.
   It needs only sw.js (sw.js must wait for the page and answer the message "SKIP_WAITING").
   Flow: you bump sw.js -> users get the pop-up the next time they open or return to the app
   -> Update Now -> spinner at screen center -> app reloads on the new version -> thank-you message.
   Later -> the pop-up comes back each time the app is opened or returns to the screen while the update is waiting. */
(function () {
  if (!("serviceWorker" in navigator) || window.BLOCKED) return;

  var KEY = "gfau_done", reg = null, busy = false, root = null;
  var APP = "Gospel For All";

  /* ---------- CSS (uses the app theme when present, with built-in fallbacks) ---------- */
  var st = document.createElement("style");
  st.textContent =
    '.gfau{position:fixed;left:0;top:0;width:100dvw;height:100dvh;z-index:100003;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.45);font-family:inherit;-webkit-user-select:none;user-select:none}' +
    '.gfau.on{display:flex}' +
    '.gfau>*{display:none}' +
    '.gfau[data-v="ask"] .gfau-ask,.gfau[data-v="thx"] .gfau-thx{display:flex}' +
    '.gfau[data-v="load"] .gfau-load{display:flex}' +
    '.gfau-card{width:calc(100dvw - 48px);flex-direction:column;gap:14px;padding:28px 24px 24px;border-radius:28px;background:var(--sl,#F8F9FA);color:var(--os,#121212);box-shadow:0 8px 28px rgba(0,0,0,.35);animation:gfau-in .25s cubic-bezier(.2,0,0,1)}' +
    '.gfau-card h2{margin:0 0 4px;font-size:24px;font-weight:700;line-height:1.25;text-align:center}' +
    '.gfau-card p{margin:0;font-size:20px;line-height:1.55;text-align:left}' +
    '.gfau-b{position:relative;overflow:hidden;width:100%;height:56px;border:0;border-radius:28px;font-family:inherit;font-size:20px;font-weight:700;cursor:pointer}' +
    '.gfau-p{background:var(--p,#DF1E5A);color:var(--op,#FFFFFF)}' +
    '.gfau-p:active{background:var(--ph,#C2194D)}' +
    '.gfau-s{background:var(--sc,#F9D5E0);color:var(--osc,#7A0F31)}' +
    '.gfau-s:active{background:var(--pr,rgba(223,30,90,.2))}' +
    '.gfau-ico{align-self:center;width:64px;height:64px;border-radius:50%;background:#146C2E;display:flex;align-items:center;justify-content:center}' +
    '.gfau-ico svg{width:34px;height:34px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}' +
    '.gfau-load{flex-direction:column;align-items:center;gap:16px;padding:28px 36px;border-radius:28px;background:var(--sl,#F8F9FA);color:var(--os,#121212);box-shadow:0 8px 28px rgba(0,0,0,.35)}' +
    '.gfau-load p{margin:0;font-size:20px;font-weight:600}' +
    '.gfau-spin{width:68px;height:68px;animation:gfau-r 1.3s linear infinite}' +
    '.gfau-spin circle{fill:none;stroke:var(--p,#DF1E5A);stroke-width:5;stroke-linecap:round;stroke-dasharray:90 150;animation:gfau-d 1.3s ease-in-out infinite}' +
    '@keyframes gfau-r{to{transform:rotate(360deg)}}' +
    '@keyframes gfau-d{0%{stroke-dasharray:1 150;stroke-dashoffset:0}50%{stroke-dasharray:90 150;stroke-dashoffset:-35}100%{stroke-dasharray:90 150;stroke-dashoffset:-124}}' +
    '@keyframes gfau-in{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}';
  document.head.appendChild(st);

  /* ---------- HTML ---------- */
  root = document.createElement("div");
  root.className = "gfau";
  root.setAttribute("role", "alertdialog");
  root.innerHTML =
    '<div class="gfau-card gfau-ask"><h2>New version available</h2>' +
    '<p>A new version of ' + APP + ' is available. Update now to get the latest features and fixes.</p>' +
    '<button class="gfau-b gfau-p" id="gfauGo">Update Now</button>' +
    '<button class="gfau-b gfau-s" id="gfauLater">Later</button></div>' +
    '<div class="gfau-load"><svg class="gfau-spin" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"/></svg><p>Updating, please wait...</p></div>' +
    '<div class="gfau-card gfau-thx"><span class="gfau-ico"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></span>' +
    '<p>Thank you, you have updated with the latest version. Please share this app with others, God bless.</p>' +
    '<button class="gfau-b gfau-p" id="gfauShare">Share App</button>' +
    '<button class="gfau-b gfau-s" id="gfauClose">Close</button></div>';
  document.body.appendChild(root);

  /* ---------- behavior ---------- */
  function view(v) {
    root.setAttribute("data-v", v);
    if (v) root.classList.add("on"); else root.classList.remove("on");
  }
  function waiting() { return !!(reg && reg.waiting && navigator.serviceWorker.controller); }
  function check() { if (!busy && waiting() && !root.classList.contains("on")) view("ask"); }

  function apply() {
    busy = true;
    view("load");
    var once = false;
    function go() {
      if (once) return;
      once = true;
      try { localStorage.setItem(KEY, "1"); } catch (e) {}
      location.reload();
    }
    navigator.serviceWorker.addEventListener("controllerchange", go);
    if (reg && reg.waiting) reg.waiting.postMessage("SKIP_WAITING"); else go();
    setTimeout(go, 12000);
  }

  function share() {
    var url = location.origin + location.pathname.replace(/index\.html$/i, ""),
      text = APP + ": the Word of God in nine languages.";
    if (navigator.share) navigator.share({ title: APP, text: text, url: url }).catch(function () {});
    else window.open("https://wa.me/?text=" + encodeURIComponent(text + " " + url), "_blank");
  }

  document.getElementById("gfauGo").onclick = apply;
  document.getElementById("gfauLater").onclick = function () { view(""); };
  document.getElementById("gfauShare").onclick = share;
  document.getElementById("gfauClose").onclick = function () { view(""); };

  /* after the reload on the new version: say thank you once */
  var done = null;
  try { done = localStorage.getItem(KEY); localStorage.removeItem(KEY); } catch (e) {}
  if (done) view("thx");

  /* watch for a new sw.js */
  navigator.serviceWorker.ready.then(function (r) {
    reg = r;
    check();
    r.addEventListener("updatefound", function () {
      var w = r.installing;
      if (w) w.addEventListener("statechange", function () { if (w.state === "installed") check(); });
    });
    r.update().catch(function () {});
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") { r.update().catch(function () {}); check(); }
    });
  });
})();
