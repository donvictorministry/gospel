/* quiz.js: the "More" landing page. Three buttons open full-screen pages with a back arrow
   that returns to More. Load after game.js, series1.js and series2.js (a missing file just hides its button). */
(function () {
  var page = document.getElementById("pQuiz");
  if (!page || window.BLOCKED || !window.GFA) return;
  var $ = function (i) { return document.getElementById(i); };

  /* BADGE LAYOUT: clean app link (no index.html) and a ministry logo that measures 140px on a phone screen (420px on the badge) */
  Share.url = function () { return location.origin + location.pathname.replace(/index\.html$/i, ""); };
  if (window.Badge) (function () {
    var FONT = "'Plus Jakarta Sans', Roboto, sans-serif", logo = null;
    if (Badge.CFG.logo) {
      var im = new Image();
      im.crossOrigin = "anonymous";
      im.onload = function () { logo = im; };
      im.src = Badge.CFG.logo;
    }
    function rr(c, x, y, w, h, r) {
      c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
    }
    function wrap(c, text, x, y, maxW, lh) {
      var line = "";
      text.split(" ").forEach(function (w) {
        var t = line ? line + " " + w : w;
        if (c.measureText(t).width > maxW && line) { c.fillText(line, x, y); line = w; y += lh; } else line = t;
      });
      c.fillText(line, x, y);
      return y;
    }
    function fit(c, text, weight, size, maxW) {
      while (size > 24) { c.font = weight + " " + size + "px " + FONT; if (c.measureText(text).width <= maxW) break; size -= 2; }
      return size;
    }
    Badge.make = function (t, info) {
      var W = 1080, H = 1650, cv = document.createElement("canvas"), c, sz;
      cv.width = W; cv.height = H; c = cv.getContext("2d");
      var g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, t.c1); g.addColorStop(1, t.c2);
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      c.fillStyle = "#FFFFFF"; c.globalAlpha = 0.14;
      c.beginPath(); c.arc(W, 0, 380, 0, 7); c.fill(); c.beginPath(); c.arc(0, H, 320, 0, 7); c.fill();
      c.globalAlpha = 0.55; c.strokeStyle = t.ink; c.lineWidth = 6; rr(c, 40, 40, W - 80, H - 80, 36); c.stroke();
      c.lineWidth = 2; rr(c, 62, 62, W - 124, H - 124, 26); c.stroke(); c.globalAlpha = 1;

      c.textAlign = "center"; c.fillStyle = t.ink;
      if ("letterSpacing" in c) c.letterSpacing = "6px";
      c.font = "800 46px " + FONT; c.fillText(Badge.CFG.ministry.toUpperCase(), W / 2, 140);
      c.font = "600 32px " + FONT; c.fillText("BIBLE QUIZ", W / 2, 192);
      if ("letterSpacing" in c) c.letterSpacing = "2px";
      c.font = "800 80px " + FONT; c.fillText(t.name.toUpperCase(), W / 2, 300);
      if ("letterSpacing" in c) c.letterSpacing = "0px";
      c.font = "600 34px " + FONT; c.fillText(info.series, W / 2, 358);

      /* ministry logo: 420px circle = 140px on a 360px-wide phone screen */
      var cx = W / 2, cy = 650, R = 210;
      c.globalAlpha = 0.28; c.fillStyle = t.ink; c.beginPath(); c.arc(cx, cy, R + 26, 0, 7); c.fill(); c.globalAlpha = 1;
      c.fillStyle = "#FFFFFF"; c.beginPath(); c.arc(cx, cy, R + 12, 0, 7); c.fill();
      if (logo) {
        c.save(); c.beginPath(); c.arc(cx, cy, R, 0, 7); c.clip();
        c.drawImage(logo, cx - R, cy - R, R * 2, R * 2); c.restore();
      } else {
        c.fillStyle = t.accent; c.fillRect(cx - 24, cy - 110, 48, 220); c.fillRect(cx - 80, cy - 60, 160, 44);
      }
      c.lineWidth = 10; c.strokeStyle = t.ink; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.stroke();

      c.fillStyle = t.ink;
      c.font = "800 56px " + FONT; c.fillText("Score " + info.score + "/" + info.n, W / 2, 975);
      c.font = "italic 500 36px " + FONT; c.fillText("Awarded to", W / 2, 1045);
      sz = fit(c, info.name, "800", 88, 880);
      c.font = "800 " + sz + "px " + FONT; c.fillText(info.name, W / 2, 1135);

      c.font = "italic 500 38px " + FONT;
      var y = wrap(c, "\u201C" + t.verse[0] + "\u201D", W / 2, 1215, 860, 52);
      c.font = "700 32px " + FONT; c.fillText("\u2014 " + t.verse[1], W / 2, y + 52);

      c.textAlign = "left"; c.font = "600 26px " + FONT; c.fillText("DATE ISSUED", 110, 1395);
      c.font = "700 32px " + FONT; c.fillText(info.date, 110, 1439);
      c.textAlign = "right"; c.font = "600 26px " + FONT; c.fillText("PRESIDENT", W - 110, 1395);
      sz = fit(c, Badge.CFG.president, "700", 32, 470);
      c.font = "700 " + sz + "px " + FONT; c.fillText(Badge.CFG.president, W - 110, 1439);

      /* app link: its own room below the divider, inside the frame */
      c.globalAlpha = 0.4; c.fillStyle = t.ink; c.fillRect(W / 2 - 340, 1480, 680, 3); c.globalAlpha = 1;
      c.textAlign = "center";
      sz = 40;
      while (sz > 30) { c.font = "700 " + sz + "px " + FONT; if (c.measureText(info.url).width <= 880) break; sz -= 2; }
      c.font = "700 " + sz + "px " + FONT;
      if (c.measureText(info.url).width <= 880) c.fillText(info.url, W / 2, 1545);
      else {
        var mid = Math.floor(info.url.length / 2), cut = info.url.lastIndexOf("/", mid);
        if (cut < 9) cut = mid;
        c.font = "700 34px " + FONT;
        c.fillText(info.url.slice(0, cut + 1), W / 2, 1535);
        c.fillText(info.url.slice(cut + 1), W / 2, 1577);
      }
      return cv;
    };
  })();
  /* END BADGE LAYOUT */

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
    html += btn("btnS" + i, colors[i % colors.length], icons[i % icons.length], "Bible Quiz: " + s.title, s.subtitle + " (" + s.questions.length + " questions)");
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

  /* Trivia page: one full-screen modal. Four answers plus NEXT fit one screen (no scrolling). */
  var sec = document.createElement("section");
  sec.className = "modal";
  sec.id = "mQuiz";
  sec.innerHTML =
    '<div class="mh"><button class="x" id="qBack" aria-label="Back"><svg class="ic"><use href="#i-back"/></svg></button><h2 id="qTitle"></h2></div>' +
    '<div class="qh"><div id="qBody"></div>' +
    '<div class="qpop" id="qPop"><div class="qph"><span class="qpi" id="qPi"><svg class="ic"><use id="qPu" href="#i-check"/></svg></span><b id="qPt"></b><span class="qpc" id="qPc"></span>' +
    '<button class="x qpx" id="qPx" aria-label="Close"><svg class="ic"><use href="#i-x"/></svg></button></div>' +
    '<p class="qpv" id="qPv"></p><div class="qpb"><i id="qPb"></i></div></div></div>';
  document.body.appendChild(sec);

  var cur = null, qi = 0, score = 0, locked = false, tm = null, left = 0;

  function popClose() {
    clearInterval(tm);
    tm = null;
    $("qPop").classList.remove("show");
    var n = $("qn");
    if (n) n.disabled = false;
  }
  function popOpen(ok, verse) {
    clearInterval(tm);
    left = 10;
    var p = verse.split(" \u2014 "), bar = $("qPb");
    $("qPt").textContent = ok ? "Correct!" : "Not quite";
    $("qPi").className = "qpi " + (ok ? "" : "no");
    $("qPu").setAttribute("href", ok ? "#i-check" : "#i-x");
    $("qPv").innerHTML = "<b>" + esc(p[0]) + "</b><br>" + esc(p.slice(1).join(" \u2014 "));
    $("qPc").textContent = left + "s";
    bar.style.transition = "none";
    bar.style.width = "100%";
    $("qPop").classList.add("show");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bar.style.transition = "width 10s linear"; bar.style.width = "0%"; });
    });
    tm = setInterval(function () {
      left--;
      $("qPc").textContent = Math.max(left, 0) + "s";
      if (left <= 0) popClose();
    }, 1000);
  }
  $("qPx").onclick = popClose;
  $("qBack").onclick = function () { popClose(); GFA.close(); };

  function finish(n, b) {
    var t = window.Badge ? Badge.tierFor(score, n) : null, saved = "";
    try { saved = localStorage.getItem("gfa_name") || ""; } catch (e) {}
    var msg = score === n ? "Hallelujah! Perfect score!" : t ? "Praise God! Great job!" : "Well done! Keep growing!";
    b.innerHTML = '<div class="qr"><div class="qsc">' + score + ' / ' + n + '</div><p class="qq jub">' + msg + '</p>' +
      (t ? '<p class="mp">You earned the <b>' + t.name + '</b>! Enter your name, then download or share it.</p>' +
        '<img class="qprev" id="qPrev" alt="Your badge"><input class="qin" id="qName" type="text" maxlength="40" placeholder="Your full name" autocomplete="off" value="' + esc(saved) + '">' +
        '<div class="stack"><button class="btn" id="qDl"><svg class="ic"><use href="#i-dl"/></svg><span>Download Badge</span></button>' +
        '<button class="btn tn" id="qSh"><svg class="ic"><use href="#i-share"/></svg><span>Share Badge</span></button></div>'
        : '<p class="mp">Score 8 out of 12 or more to earn a badge. You can do it, try again!</p>') +
      '<p class="mp">' + esc(cur.reflection) + '</p>' +
      '<div class="stack"><button class="btn alt" id="qAgain">Play again</button><button class="btn alt" id="qMore">Back to More</button></div></div>';
    $("qAgain").onclick = function () { qi = 0; score = 0; if (window.Confetti) Confetti.stop(); draw(); };
    $("qMore").onclick = GFA.close;
    if (window.Confetti) Confetti.celebrate(t ? (t.key === "honor" ? 3 : t.key === "golden" ? 2 : 1) : 0);
    if (!t) return;
    function info(nm) {
      return { name: nm, date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        series: "Series " + cur.order + ": " + cur.title, score: score, n: n, url: Share.url() };
    }
    var pv = 0;
    function prev() { $("qPrev").src = Badge.make(t, info($("qName").value.trim() || "Your Name")).toDataURL("image/jpeg", 0.85); }
    function nameOk() {
      var nm = $("qName").value.trim();
      if (!nm) { GFA.toast("Please enter your name for the badge.", "err"); $("qName").focus(); return ""; }
      try { localStorage.setItem("gfa_name", nm); } catch (e) {}
      return nm;
    }
    prev();
    $("qName").oninput = function () { clearTimeout(pv); pv = setTimeout(prev, 350); };
    $("qDl").onclick = function () { var nm = nameOk(); if (nm) Badge.download(Badge.make(t, info(nm)), t.key); };
    $("qSh").onclick = function () {
      var nm = nameOk();
      if (!nm) return;
      Badge.make(t, info(nm)).toBlob(function (bl) {
        Share.file(bl, "Bible-Quiz-" + t.key + "-badge.png", nm + " earned the " + t.name + " on the Bible Quiz!");
      }, "image/png");
    };
  }

  function draw() {
    var n = cur.questions.length, b = $("qBody");
    locked = false;
    clearInterval(tm);
    $("qPop").classList.remove("show");
    if (qi >= n) { finish(n, b); return; }
    var q = cur.questions[qi];
    b.innerHTML = '<div class="qp">Question ' + (qi + 1) + ' of ' + n + '</div><div class="qb"><i style="width:' + (qi / n * 100) + '%"></i></div>' +
      '<div class="qc">' + esc(q.cat) + '</div><p class="qq">' + esc(q.text) + '</p><div class="qos">' +
      q.options.map(function (o, k) { return '<button class="qo" data-k="' + k + '">' + esc(o) + '</button>'; }).join("") +
      '<button class="btn qn" id="qn" disabled>' + (qi + 1 < n ? "Next" : "See result") + '</button></div>';
    b.querySelectorAll(".qo").forEach(function (el) {
      el.onclick = function () {
        if (locked) return;
        locked = true;
        var k = +el.getAttribute("data-k"), ok = k === q.correct;
        if (ok) { score++; if (window.Confetti) Confetti.burstFrom(el, 70); } else el.classList.add("no");
        b.querySelectorAll(".qo")[q.correct].classList.add("ok");
        popOpen(ok, q.verse);
      };
    });
    $("qn").onclick = function () { if (!this.disabled) { qi++; draw(); } };
  }
  series.forEach(function (s, i) {
    $("btnS" + i).onclick = function () {
      cur = s; qi = 0; score = 0;
      $("qTitle").textContent = "Bible Quiz: " + s.title;
      draw();
      GFA.open("mQuiz");
    };
  });

  GFA.render();
})();
