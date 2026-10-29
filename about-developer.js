/* Developer modal data.
   To use your real photo: open index.html, find <img id="devPhoto"> and replace its src with your photo URL,
   or set DEV_PHOTO_URL below (example: "me.jpg" placed in the same folder).
   The popup and the team parade reuse this same photo automatically. */
var DEV_PHOTO_URL = "";
var DEV_NAME = "Chris Johnson, PhD";
/* Logo for the header and both sidebars: set a URL here, or replace icon-192.png */
var LOGO_URL = "";

function devLabel() {
  var L = T.en;
  var b = document.getElementById("devBio");
  var m = document.getElementById("devMore");
  if (b && m) m.textContent = b.classList.contains("clamp") ? (L.showMore || T.en.showMore) : (L.showLess || T.en.showLess);
}

function hl(s) {
  return s.split("\n").map(function (l, i) {
    return '<b class="vn">' + (i + 1) + "</b> " + l.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }).join("\n");
}

function renderDev(t) {
  var n = document.getElementById("devName");
  if (n) n.textContent = DEV_NAME;
  var p = document.getElementById("devPhoto");
  if (p && DEV_PHOTO_URL) p.src = DEV_PHOTO_URL;
  if (LOGO_URL) document.querySelectorAll(".li").forEach(function (i) { i.src = LOGO_URL; });
  var b = document.getElementById("devBio");
  if (b) b.innerHTML = hl(T.en.devBio + "\n" + T.en.devMore.join("\n"));
  devLabel();
}

/* Show more / Show less after 5 lines */
function devMeasure() {
  var b = document.getElementById("devBio");
  var m = document.getElementById("devMore");
  if (!b || !m) return;
  b.classList.add("clamp");
  m.hidden = !(b.scrollHeight > b.clientHeight + 2);
  devLabel();
}
(function () {
  var m = document.getElementById("devMore");
  if (m) m.onclick = function () {
    document.getElementById("devBio").classList.toggle("clamp");
    devLabel();
  };
})();

/* Verified Developer button */
(function () {
  var v = document.getElementById("devVerify");
  if (v) v.onclick = function () {
    if (window.GFA) GFA.toast(DEV_NAME + " is the verified founder and lead developer of Biblefirm.", "ok");
  };
})();
