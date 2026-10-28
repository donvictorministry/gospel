/* stats.js: Views, Reached and Likes with 24-hour limits (client side) and tiny server use.
   Paste your Apps Script Web app URL below (see Deployment.md). Empty = counts stay on this phone only. */
var STATS_URL = "";

(function () {
  if (window.BLOCKED || !window.GFA) return;
  var DAY = 86400000, KEYS = ["views", "reached", "likes"], ID = { views: "nV", reached: "nR", likes: "nL" };
  var $ = function (i) { return document.getElementById(i); };
  function ld(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function sv(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var S = { views: 0, reached: 0, likes: 0 }, sync = 0;
  try { var c = JSON.parse(ld("gfa_s") || "null"); if (c && c.t) { S = c.t; sync = c.a || 0; } } catch (e) {}

  var did = ld("gfa_did");
  if (!did) {
    var a = new Uint8Array(12);
    crypto.getRandomValues(a);
    did = Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
    sv("gfa_did", did);
  }

  function due(k) { return Date.now() - (+ld("gfa_t_" + k) || 0) > DAY; }
  function save() { sv("gfa_s", JSON.stringify({ t: S, a: sync })); }
  function paint() {
    KEYS.forEach(function (k) { $(ID[k]).textContent = (S[k] || 0).toLocaleString(); });
    $("btnViews").classList.toggle("done", !due("views"));
    $("btnReach").classList.toggle("done", !due("reached"));
    $("btnLike").classList.toggle("done", !due("likes"));
  }

  function call(q) {
    if (!STATS_URL) return;
    fetch(STATS_URL + "?" + q).then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.t) { S = j.t; sync = Date.now(); save(); paint(); }
    }).catch(function () {});
  }

  function hit(k, quiet) {
    if (!due(k)) { if (!quiet) GFA.toast(GFA.t("likedAlready")); return; }
    sv("gfa_t_" + k, Date.now());
    S[k] = (S[k] || 0) + 1;
    save(); paint();
    if (!quiet) GFA.toast(GFA.t("likedOk"), "ok");
    call("a=hit&k=" + k + "&d=" + did);
  }

  $("btnViews").onclick = function () {
    GFA.toast(GFA.t("viewsInfo"));
    if (STATS_URL && Date.now() - sync > 60000) call("a=get");
  };
  $("btnReach").onclick = function () { hit("reached"); };
  $("btnLike").onclick = function () { hit("likes"); };
  /* Ticker from the database: shown from the phone cache, refreshed at most every 10 minutes */
  try { var k0 = JSON.parse(ld("gfa_tk") || "null"); if (k0 && k0.length) { window.GFA_TK = k0; GFA.render(); } } catch (e) {}
  if (STATS_URL && Date.now() - (+ld("gfa_tka") || 0) > 600000) {
    fetch(STATS_URL + "?a=tk").then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.k) { sv("gfa_tka", Date.now()); sv("gfa_tk", JSON.stringify(j.k)); window.GFA_TK = j.k; GFA.render(); }
    }).catch(function () {});
  }

  /* Telemetry, once per device. If the ipapi lookup fails, the browser details are still sent. */
  function enc(v) { return encodeURIComponent(v || ""); }
  function telemetry() {
    if (!STATS_URL || ld("gfa_tel")) return;
    sv("gfa_tel", "1");
    fetch("https://ipapi.co/json/").then(function (r) { return r.json(); }).catch(function () { return null; }).then(function (g) {
      g = g && !g.error ? g : {};
      var cn = navigator.connection || {}, tz = "";
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
      call("a=tel&d=" + did + "&co=" + enc(g.country_name) + "&ci=" + enc(g.city) + "&isp=" + enc(g.org) +
        "&mn=" + enc(cn.type || cn.effectiveType) + "&ua=" + enc(navigator.userAgent) + "&tz=" + enc(tz || g.timezone) +
        "&sc=" + enc(screen.width + "x" + screen.height) + "&rf=" + enc(document.referrer));
    });
  }
  setTimeout(telemetry, 3000);

  paint();
  if (due("views")) hit("views", true);
  else if (Date.now() - sync > 300000) call("a=get");
})();
