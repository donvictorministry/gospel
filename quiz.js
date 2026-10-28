/* quiz.js: the "More" landing page. Three buttons open full-screen pages with a back arrow
   that returns to More. Load after game.js, series1.js and series2.js (a missing file just hides its button). */
(function () {
  var page = document.getElementById("pQuiz");
  if (!page || window.BLOCKED || !window.GFA) return;
  var $ = function (i) { return document.getElementById(i); };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  var SER = window.TRIVIA_SERIES || {};
  var series = Object.keys(SER).map(function (k) { return SER[k]; }).sort(function (a, b) { return a.order - b.order; });
  var game = window.DV && DV.routes.game;
  var colors = ["var(--p)", "var(--p)"], icons = ["i-book", "i-quiz"];

  function btn(id, color, icon, title, sub) {
    return '<button class="mb" id="' + id + '" style="background:' + color + '"><span class="mi"><svg class="ic xl"><use href="#' + icon + '"/></svg></span>' +
      '<span class="mtx"><b>' + esc(title) + '</b><span>' + esc(sub) + '</span></span><svg class="ic chev"><use href="#i-chev"/></svg></button>';
  }

  /* Page */
  var html = "";
  if (game) html += btn("btnGame", "var(--p)", "i-game", "JESUS Slide Puzzle", "Slide the tiles to spell JESUS");
  series.forEach(function (s, i) {
    html += btn("btnS" + i, colors[i % colors.length], icons[i % icons.length], "Bible Trivia: " + s.title, s.subtitle + " (" + s.questions.length + " questions)");
  });
  page.innerHTML = '<div class="pgi"><div class="mhd" data-i="navMore"></div><p class="mps" data-i="moreSub"></p><div class="mbs">' + html + '</div></div>';

  /* Game page */
  if (game) {
    GFA.hook("gGame", game.open, game.close);
    var chrome = document.querySelector(".dvg-chrome"), ex = $("dvg-exit-btn");
    if (chrome && ex) {
      ex.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H4M10 6l-6 6 6 6"/></svg>';
      ex.setAttribute("aria-label", "Back");
      chrome.insertBefore(ex, chrome.firstChild);
    }
    $("btnGame").onclick = function () { GFA.open("gGame"); };
  }

  /* Trivia page (one full-screen modal reused by every series) */
  var sec = document.createElement("section");
  sec.className = "modal";
  sec.id = "mQuiz";
  sec.innerHTML = '<div class="mh"><button class="x" id="qBack" aria-label="Back"><svg class="ic"><use href="#i-back"/></svg></button><h2 id="qTitle"></h2></div><div id="qBody"></div>';
  document.body.appendChild(sec);
  $("qBack").onclick = GFA.close;

  var cur = null, qi = 0, score = 0, locked = false;
  function draw() {
    var n = cur.questions.length, b = $("qBody");
    locked = false;
    sec.scrollTop = 0;
    if (qi >= n) {
      b.innerHTML = '<div class="qr"><div class="qsc">' + score + ' / ' + n + '</div><p class="qq">' + (score === n ? "Perfect score!" : "Well done!") + '</p><p class="mp">' + esc(cur.reflection) + '</p>' +
        '<div class="stack"><button class="btn" id="qAgain">Play again</button><button class="btn alt" id="qMore">Back to More</button></div></div>';
      $("qAgain").onclick = function () { qi = 0; score = 0; draw(); };
      $("qMore").onclick = GFA.close;
      return;
    }
    var q = cur.questions[qi];
    b.innerHTML = '<div class="qp">Question ' + (qi + 1) + ' of ' + n + '</div><div class="qb"><i style="width:' + (qi / n * 100) + '%"></i></div>' +
      '<div class="qc">' + esc(q.cat) + ' · ' + esc(q.diff) + '</div><p class="qq">' + esc(q.text) + '</p><div class="qos">' +
      q.options.map(function (o, k) { return '<button class="qo" data-k="' + k + '">' + esc(o) + '</button>'; }).join("") + '</div><div id="qx"></div>';
    b.querySelectorAll(".qo").forEach(function (el) {
      el.onclick = function () {
        if (locked) return;
        locked = true;
        var k = +el.getAttribute("data-k");
        if (k === q.correct) score++; else el.classList.add("no");
        b.querySelectorAll(".qo")[q.correct].classList.add("ok");
        $("qx").innerHTML = '<div class="qv"><svg class="ic"><use href="#i-book"/></svg><span>' + esc(q.verse) + '</span></div><button class="btn" id="qn">' + (qi + 1 < n ? "Next question" : "See result") + '</button>';
        $("qn").onclick = function () { qi++; draw(); };
      };
    });
  }
  series.forEach(function (s, i) {
    $("btnS" + i).onclick = function () {
      cur = s; qi = 0; score = 0;
      $("qTitle").textContent = "Bible Trivia: " + s.title;
      draw();
      GFA.open("mQuiz");
    };
  });

  GFA.render();
})();
