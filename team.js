/* team.js: ministry team data, team modal, and the occasional photo parade.
   EDIT THE TEAM ARRAY BELOW: put each member's real name, role, short tag, photo URL and bio.
   Leave photo as "" to keep the placeholder. */
var TEAM = [
  { name: "Amb. David Etim", tag: "Director", role: "Co Founder | Director | Senior Administrator", photo:"https://i.ibb.co/0RvC1sCc/Screenshot-20260214-191218.png",
    bio: "Amb. David is a worship leader and professional instrumentalist who has impacted thousands of lives across different nations through his live worship performances and numerous gospel albums. He is the Co-Founder, Director, and Senior Administrator of Don Victor Ministries, working closely with the Founder to strengthen the ministry’s operations and advance its global vision with integrity, unity, and excellence." },
  { name: "Team Member 2", tag: "Scripture", role: "Scripture and Content Editor", photo: "",
    bio: "Reviews every verse, devotional and message before it is published. Makes sure the Word is handled faithfully and clearly. Keeps the content simple enough for a new believer and deep enough to grow on." },
  { name: "Team Member 3", tag: "Translation", role: "Translation Lead", photo: "",
    bio: "Coordinates the translations for every language in the app, including Hausa, Yoruba and Igbo. Works with native speakers to proofread each text so that the Gospel is heard in the heart language of every reader." },
  { name: "Team Member 4", tag: "Community", role: "Community Manager", photo: "",
    bio: "Cares for the WhatsApp community and welcomes every new member. Answers questions, shares testimonies and celebrates each person who shares the app. Keeps the community warm, safe and encouraging." },
  { name: "Team Member 5", tag: "Media", role: "Media and Design Lead", photo: "",
    bio: "Creates the verse cards, graphics and short videos that carry the message across social media. Keeps the look of every app clean, simple and beautiful, so the focus always stays on Jesus and His Word." },
  { name: "Team Member 6", tag: "Outreach", role: "Outreach Coordinator", photo: "",
    bio: "Builds partnerships with churches, campuses and ministries on all six continents. Plans outreach campaigns, trains local volunteers and tracks how far the Gospel is spreading, one share at a time." },
  { name: "Team Member 7", tag: "Support", role: "Technical Support Lead", photo: "",
    bio: "Helps users install and use the app, even on low-cost Android phones with weak internet. Tests every release, fixes problems fast and makes sure nobody is left behind because of technology." }
];

(function () {
  if (window.BLOCKED || !window.GFA) return;

  var PH = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23cfc3b8'/%3E%3Ccircle cx='75' cy='58' r='26' fill='%23857467'/%3E%3Cpath d='M20 150c4-36 28-52 55-52s51 16 55 52z' fill='%23857467'/%3E%3C/svg%3E";
  function src(m) { return m.photo || PH; }

  /* Team modal */
  var cards = "";
  TEAM.forEach(function (m) {
    cards += '<div class="tc"><img class="tp" src="' + src(m) + '" width="150" height="150" alt="' + m.name + '">' +
      '<div class="tn2">' + m.name + '</div><div class="tr">' + m.role + '</div><p class="tbio">' + m.bio + '</p></div>';
  });
  var sec = document.createElement("section");
  sec.className = "modal tm";
  sec.id = "mTeam";
  sec.innerHTML =
    '<div class="mh"><button class="x" id="tClose" aria-label="Back"><svg class="ic"><use href="#i-back"/></svg></button><h2 data-i="teamTitle"></h2>' +
    '<button class="x" id="tDown" aria-label="Jump to bottom"><svg class="ic"><use href="#i-down"/></svg></button></div>' +
    '<div class="tl" id="tl">' + cards + '</div>' +
    '<div class="tb"><button class="fab" id="tUp" aria-label="Jump to top"><svg class="ic"><use href="#i-up"/></svg></button></div>';
  document.body.appendChild(sec);
  GFA.render();

  var tl = document.getElementById("tl");
  document.getElementById("tDown").onclick = function () { tl.scrollTo({ top: tl.scrollHeight, behavior: "smooth" }); };
  document.getElementById("tUp").onclick = function () { tl.scrollTo({ top: 0, behavior: "smooth" }); };
  document.getElementById("tClose").onclick = GFA.close;
  var bt = document.getElementById("btnTeam");
  if (bt) bt.onclick = function () { tl.scrollTop = 0; GFA.open("mTeam"); };

  /* Occasional photo parade: developer first, then the whole team, drifting slowly across the screen */
  var running = false;
  function canRun() {
    return !running && document.visibilityState === "visible" &&
      !document.querySelector(".modal.open,.drawer.open") && !document.querySelector(".pop");
  }
  function parade() {
    if (!canRun()) return;
    running = true;
    var dev = document.getElementById("devPhoto");
    var items = [{ s: dev ? dev.src : PH, n: DEV_NAME.split(" ")[0] }];
    TEAM.forEach(function (m) { items.push({ s: src(m), n: m.tag }); });
    var strip = document.createElement("div");
    strip.className = "pr";
    strip.innerHTML = items.map(function (p) {
      return '<div class="pit"><img src="' + p.s + '" width="96" height="96" alt=""><span>' + p.n + '</span></div>';
    }).join("");
    document.body.appendChild(strip);
    strip.onclick = function () { strip.remove(); running = false; tl.scrollTop = 0; GFA.open("mTeam"); };
    var w = strip.scrollWidth, vw = window.innerWidth, dist = vw + w;
    var a = strip.animate(
      [{ transform: "translateX(" + vw + "px)", opacity: 0 }, { opacity: 1, offset: 0.06 },
       { opacity: 1, offset: 0.94 }, { transform: "translateX(-" + w + "px)", opacity: 0 }],
      { duration: Math.round(dist / 42 * 1000), easing: "linear", fill: "forwards" });
    a.onfinish = function () { if (strip.parentNode) strip.remove(); running = false; };
  }
  function schedule(ms) {
    setTimeout(function () { parade(); schedule(45000 + Math.random() * 45000); }, ms);
  }
  schedule(22000);
})();
