var TEAM = [
  { name: "Amb. David Etim", tag: "Director", role: "Co Founder | Director | Senior Administrator", photo: "https://app.donvictorministry.org.ng/gospel/amb-pic.png",
    bio: "Amb. David is a worship leader and professional instrumentalist who has impacted thousands of lives across different nations through his live worship performances and numerous gospel albums. He is the Co-Founder, Director, and Senior Administrator of Don Victor Ministries, working closely with the Founder to strengthen the ministry’s operations and advance its global vision with integrity, unity, and excellence." },
  { name: "Pastor Vani Aldianto", tag: "Snr. Administrator", role: "Director | Senior Administrator", photo: "https://app.donvictorministry.org.ng/gospel/pastor-vani-photo.jpg",
    bio: "Brother Aldianto is a devoted, mission driven leader with a deep passion to see the gospel sent to the nations. As an ordained minister serving faithfully on the frontline. He serves as Senior Administrator of Don Victor Ministries, providing strategic oversight and coordinating the administrative structure of the online community." },
  { name: "Mrs. Irene Sayomi", tag: "Administrator", role: "Senior Administrator | Counselor", photo: "https://app.donvictorministry.org.ng/gospel/sis-irene.png",
    bio: "Mrs. Irene is a devoted child of God with a heart for souls and a deep passion for global evangelism. As Administrator of Don Victor Ministries, she serves with love, faithfulness, and dedication, providing steadfast support to the ministry and helping advance its vision of reaching nations with the gospel of Jesus Christ." },
  { name: "Pastor Michael Agwara, BSc", tag: "Administrator", role: "Administrator | Leader", photo: "https://app.donvictorministry.org.ng/gospel/mike-pastor-pic.png",
    bio: "Pastor Agwara  is a passionate servant of God, devoted soul winner, and dynamic public speaker with a passion for business and the gospel. He is the founder of De Michael Design, and serves as an Administrator of the Don Victor Ministries Online Community, contributing to its growth and effectiveness." },
  { name: "Apostle Joseph Kalu", tag: "Administrator", role: "Administrator", photo: "https://app.donvictorministry.org.ng/gospel/pastor-kalu.png",
    bio: "Pastor Kalu is a dedicated minister of the gospel, passionate about sound doctrine, biblical teaching, and evangelism. He uses drama to communicate the message of salvation and serves as an Administrator of the Don Victor Ministries Online Community, contributing to the advancement of the gospel." },
  { name: "Team Member 6", tag: "Outreach", role: "Outreach Coordinator", photo: "",
    bio: "Builds partnerships with churches, campuses and ministries on all six continents. Plans outreach campaigns, trains local volunteers and tracks how far the Gospel is spreading, one share at a time." },
  { name: "Mrs. Joy Don Victor", tag: "Director", role: "Director of Women Affairs", photo: "https://app.donvictorministry.org.ng/gospel/joy-pic.png",
    bio: "Mrs. Joy serves as the Director of Women Affairs at Don Victor Ministries, providing dedicated support to the ministry’s leadership. Through her prayers, wisdom, and commitment, she contributes to strengthening the ministry and advancing its global evangelistic vision." }
];

(function () {
  if (window.BLOCKED || !window.GFA) return;

  var PH = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23cfc3b8'/%3E%3Ccircle cx='75' cy='58' r='26' fill='%23857467'/%3E%3Cpath d='M20 150c4-36 28-52 55-52s51 16 55 52z' fill='%23857467'/%3E%3C/svg%3E";
  function src(m) { return m.photo || PH; }

  /* Team modal */
  var dph = document.getElementById("devPhoto");
  var FOUNDER = '<div class="tc tcp"><span class="tcb">Founder &amp; Director</span>' +
    '<div class="dpw" style="--z:188px"><div class="ring"><span class="orb"><svg class="ic"><use href="#i-code"/></svg></span></div><div class="photo"><img src="' + (dph ? dph.src : PH) + '" alt="' + DEV_NAME + '"></div></div>' +
    '<div class="tn2">' + DEV_NAME + '</div>' +
    '<div class="tr">' + T.en.devRole + '</div>' +
    '<button class="vpill" id="foundV"><svg class="ic f"><use href="#i-verified"/></svg><span>Verified Developer</span></button></div>';
  var cards = FOUNDER;
  TEAM.forEach(function (m, i) {
    cards += '<div class="tc tcp">' + (i < 3 ? '<span class="tcb">Director</span>' : "") + '<img class="tp" src="' + src(m) + '" width="150" height="150" alt="' + m.name + '">' +
      '<div class="tn2">' + m.name + '</div><div class="tr">' + m.role + '</div><button class="vpill" data-m="' + i + '"><svg class="ic f"><use href="#i-verified"/></svg><span>' + (i < 3 ? "Verified Director" : "Verified Team") + '</span></button><p class="tbio clamp">' + m.bio.replace(/([.!?]) +/g, "$1\n") + '</p><button class="tg tgm" hidden></button></div>';
  });
  var sec = document.createElement("section");
  sec.className = "modal tm";
  sec.id = "mTeam";
  sec.innerHTML =
    '<div class="mh"><button class="x" id="tClose" aria-label="Back"><svg class="ic"><use href="#i-back"/></svg></button><h2 data-i="teamTitle"></h2>' +
    '<button class="x" id="tDown" aria-label="Jump to bottom"><svg class="ic"><use href="#i-down"/></svg></button></div>' +
    '<div class="tl" id="tl">' + cards + '</div>' +
    '<button class="x tfab" id="tUp" aria-label="Jump to top"><svg class="ic"><use href="#i-up"/></svg></button>';
  document.body.appendChild(sec);
  document.getElementById("foundV").onclick = function () { GFA.open("mDev"); };
  GFA.render();

  var tl = document.getElementById("tl");
  tl.addEventListener("click", function (e) {
    var v = e.target.closest(".vpill");
    if (!v || v.id === "foundV") return;
    var k = +v.getAttribute("data-m"), m = TEAM[k];
    GFA.toast(m.name + (k < 3 ? " is a verified Director of Biblefirm. " : " is a verified member of the Biblefirm team. ") + m.role + ".", "ok", 5000);
  });
  window.teamMeasure = function () {
    tl.querySelectorAll(".tbio").forEach(function (p) {
      p.classList.add("clamp");
      var b = p.nextElementSibling;
      b.hidden = !(p.scrollHeight > p.clientHeight + 2);
      b.textContent = T.en.showMore;
    });
  };
  tl.addEventListener("click", function (e) {
    var b = e.target.closest(".tgm");
    if (!b) return;
    var p = b.previousElementSibling;
    p.classList.toggle("clamp");
    b.textContent = p.classList.contains("clamp") ? T.en.showMore : T.en.showLess;
  });
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
    var items = [{ s: dev ? dev.src : PH, n: DEV_NAME.split(" ")[0], dev: true }];
    TEAM.forEach(function (m) { items.push({ s: src(m), n: m.tag }); });
    var strip = document.createElement("div");
    strip.className = "pr";
    strip.innerHTML = items.map(function (p) {
      var im = p.dev ? '<div class="dpw" style="--z:100px"><div class="ring"><span class="orb"><svg class="ic"><use href="#i-code"/></svg></span></div><div class="photo"><img src="' + p.s + '" alt=""></div></div>' : '<img src="' + p.s + '" width="96" height="96" alt="">';
      return '<div class="pit">' + im + '<span>' + p.n + '</span></div>';
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
