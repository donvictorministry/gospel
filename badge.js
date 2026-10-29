/* badge.js: Honor (12/12), Golden (10/12) and Silver (8/12) badges. Shown only at the end of a quiz.
   Each badge shows: ministry name, user name, date issued, president name, app URL and a line of verse. */
var Badge = (function () {
  var CFG = { ministry: "Biblefirm", president: "Rev. Dr. Chris Johnson, PhD" };
  var FONT = "'Plus Jakarta Sans', Roboto, sans-serif";
  var TIERS = [
    { key: "honor", name: "Honor Badge", min: 1, c1: "#DF1E5A", c2: "#6B0C2B", ink: "#FFFFFF", accent: "#DF1E5A",
      verse: ["Well done, thou good and faithful servant.", "Matthew 25:21"] },
    { key: "golden", name: "Golden Badge", min: 10 / 12, c1: "#F8DB74", c2: "#B8860B", ink: "#3A2A00", accent: "#B8860B",
      verse: ["I have fought a good fight, I have finished my course, I have kept the faith.", "2 Timothy 4:7"] },
    { key: "silver", name: "Silver Badge", min: 8 / 12, c1: "#F4F4F4", c2: "#8A8F98", ink: "#1E2329", accent: "#6B7280",
      verse: ["Wisdom is the principal thing; therefore get wisdom.", "Proverbs 4:7"] }
  ];

  function tierFor(score, n) {
    for (var i = 0; i < TIERS.length; i++) if (score / n >= TIERS[i].min - 1e-9) return TIERS[i];
    return null;
  }
  function rrect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }
  function wrap(c, text, x, y, maxW, lh) {
    var words = text.split(" "), line = "";
    words.forEach(function (w) {
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

  /* info: { name, date, series, score, n, url } */
  function make(t, info) {
    var W = 1080, H = 1350, cv = document.createElement("canvas"), c;
    cv.width = W; cv.height = H; c = cv.getContext("2d");
    var g = c.createLinearGradient(0, 0, W, H); g.addColorStop(0, t.c1); g.addColorStop(1, t.c2);
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.fillStyle = "#FFFFFF"; c.globalAlpha = 0.14;
    c.beginPath(); c.arc(W, 0, 380, 0, 7); c.fill(); c.beginPath(); c.arc(0, H, 320, 0, 7); c.fill();
    c.globalAlpha = 0.55; c.strokeStyle = t.ink; c.lineWidth = 6; rrect(c, 40, 40, W - 80, H - 80, 36); c.stroke();
    c.lineWidth = 2; rrect(c, 62, 62, W - 124, H - 124, 26); c.stroke(); c.globalAlpha = 1;

    c.textAlign = "center"; c.fillStyle = t.ink;
    if ("letterSpacing" in c) c.letterSpacing = "6px";
    c.font = "800 46px " + FONT; c.fillText(CFG.ministry.toUpperCase(), W / 2, 150);
    c.font = "600 32px " + FONT; c.fillText("BIBLE QUIZ", W / 2, 205);
    if ("letterSpacing" in c) c.letterSpacing = "2px";
    c.font = "800 80px " + FONT; c.fillText(t.name.toUpperCase(), W / 2, 318);
    if ("letterSpacing" in c) c.letterSpacing = "0px";
    c.font = "600 34px " + FONT; c.fillText(info.series, W / 2, 378);

    /* medal */
    var cx = W / 2, cy = 590;
    c.globalAlpha = 0.28; c.fillStyle = t.ink; c.beginPath(); c.arc(cx, cy, 192, 0, 7); c.fill(); c.globalAlpha = 1;
    var mg = c.createRadialGradient(cx - 50, cy - 60, 20, cx, cy, 170); mg.addColorStop(0, "#FFFFFF"); mg.addColorStop(1, t.c1);
    c.fillStyle = mg; c.beginPath(); c.arc(cx, cy, 166, 0, 7); c.fill();
    c.lineWidth = 8; c.strokeStyle = t.ink; c.stroke();
    c.fillStyle = t.accent; c.fillRect(cx - 9, cy - 128, 18, 62); c.fillRect(cx - 28, cy - 112, 56, 16);
    c.fillStyle = t.accent === "#DF1E5A" ? "#7A0F31" : t.ink;
    c.font = "800 118px " + FONT; c.fillText(info.score + "/" + info.n, cx, cy + 50);
    c.font = "700 30px " + FONT; c.fillText("SCORE", cx, cy + 106);

    /* user */
    c.fillStyle = t.ink;
    c.font = "italic 500 36px " + FONT; c.fillText("Awarded to", W / 2, 850);
    var sz = fit(c, info.name, "800", 88, 880);
    c.font = "800 " + sz + "px " + FONT; c.fillText(info.name, W / 2, 940);

    /* verse */
    c.font = "italic 500 38px " + FONT;
    var y = wrap(c, "\u201C" + t.verse[0] + "\u201D", W / 2, 1018, 860, 52);
    c.font = "700 32px " + FONT; c.fillText("\u2014 " + t.verse[1], W / 2, y + 52);

    /* date, president, url */
    c.textAlign = "left"; c.font = "600 26px " + FONT; c.fillText("DATE ISSUED", 110, 1198);
    c.font = "700 32px " + FONT; c.fillText(info.date, 110, 1242);
    c.textAlign = "right"; c.font = "600 26px " + FONT; c.fillText("PRESIDENT", W - 110, 1198);
    sz = fit(c, CFG.president, "700", 32, 470);
    c.font = "700 " + sz + "px " + FONT; c.fillText(CFG.president, W - 110, 1242);
    c.textAlign = "center";
    sz = fit(c, info.url, "600", 30, 860);
    c.font = "600 " + sz + "px " + FONT; c.fillText(info.url, W / 2, 1302);
    return cv;
  }

  function download(cv, key) {
    cv.toBlob(function (b) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = "Bible-Quiz-" + key + "-badge.png";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    }, "image/png");
  }

  return { CFG: CFG, tierFor: tierFor, make: make, download: download };
})();
