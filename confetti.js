/* confetti.js: celebration effects.
   Confetti.burstFrom(element, count)  confetti burst from a button (correct answer)
   Confetti.celebrate(level)           end-of-quiz jubilation: 0 = small ... 3 = grand
   Confetti.stop()                     clears everything */
var Confetti = (function () {
  var cv = null, ctx = null, parts = [], raf = 0, W = 0, H = 0, pending = 0, timers = [], actx = null;
  var COLORS = ["#DF1E5A", "#C2194D", "#FF7BA3", "#FFFFFF", "#F5B800", "#146C2E", "#FFD9E3", "#1877F2"];
  var SHAPES = ["rect", "rect", "circle", "star", "streamer"];
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function resize() {
    var d = window.devicePixelRatio || 1;
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * d); cv.height = Math.round(H * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  function ensure() {
    if (cv) return;
    cv = document.createElement("canvas");
    cv.style.cssText = "position:fixed;left:0;top:0;width:100dvw;height:100dvh;pointer-events:none;z-index:100001";
    document.body.appendChild(cv);
    ctx = cv.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
  }

  function add(p) { if (parts.length < 340) parts.push(p); }
  function piece(x, y, vx, vy) {
    add({ x: x, y: y, vx: vx, vy: vy, g: 0.2, drag: 0.992, rot: rnd(0, 6.28), vr: rnd(-0.25, 0.25),
      s: rnd(9, 17), c: pick(COLORS), shape: pick(SHAPES), life: 0, max: rnd(120, 220), tilt: rnd(0, 6.28) });
  }
  function balloon() {
    add({ x: rnd(30, W - 30), y: H + rnd(30, 140), vx: 0, vy: -rnd(2.2, 3.8), g: 0, drag: 1, rot: 0, vr: 0,
      s: rnd(14, 22), c: pick(COLORS.slice(0, 3).concat(["#F5B800", "#146C2E"])), shape: "balloon", life: 0, max: 9999, tilt: rnd(0, 6.28) });
  }

  function star(r) {
    ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      var a = i * Math.PI / 5 - Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
      ctx[i ? "lineTo" : "moveTo"](Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath(); ctx.fill();
  }
  function draw(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.shape === "balloon" ? 1 : Math.max(0, Math.min(1, (p.max + 120 - p.life) / 60));
    ctx.fillStyle = p.c;
    if (p.shape === "rect") ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.6);
    else if (p.shape === "circle") { ctx.beginPath(); ctx.arc(0, 0, p.s / 2.4, 0, 6.283); ctx.fill(); }
    else if (p.shape === "star") star(p.s * 0.7);
    else if (p.shape === "streamer") { ctx.scale(1, Math.cos(p.life / 6)); ctx.fillRect(-p.s * 1.2, -2, p.s * 2.4, 4); }
    else if (p.shape === "balloon") {
      ctx.beginPath(); ctx.ellipse(0, 0, p.s * 1.5, p.s * 1.9, 0, 0, 6.283); ctx.fill();
      ctx.strokeStyle = "rgba(120,120,120,.75)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, p.s * 1.9); ctx.lineTo(Math.sin(p.life / 10) * 6, p.s * 4.6); ctx.stroke();
    }
    ctx.restore();
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];
      p.vx *= p.drag; p.vy = p.vy * p.drag + p.g;
      p.x += p.vx + (p.shape === "balloon" ? Math.sin(p.life / 18 + p.tilt) * 0.9 : 0);
      p.y += p.vy; p.rot += p.vr; p.life++;
      if (p.shape === "balloon" ? p.y < -160 : (p.y > H + 40 || p.life > p.max + 120)) { parts.splice(i, 1); continue; }
      draw(p);
    }
    raf = (parts.length || pending) ? requestAnimationFrame(frame) : 0;
    if (!raf) ctx.clearRect(0, 0, W, H);
  }
  function start() { if (!raf) raf = requestAnimationFrame(frame); }

  /* sound: short pop and a rising fanfare (needs a user tap first, which a quiz always has) */
  function tone(freqs, step, wave, vol) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      freqs.forEach(function (f, i) {
        var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + i * step;
        o.type = wave; o.frequency.value = f; o.connect(g); g.connect(actx.destination);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        o.start(t); o.stop(t + 0.36);
      });
    } catch (e) {}
  }

  function burst(x, y, n) {
    ensure();
    for (var i = 0; i < n; i++) {
      var a = rnd(-Math.PI * 0.95, -Math.PI * 0.05), sp = rnd(5, 13);
      piece(x, y, Math.cos(a) * sp, Math.sin(a) * sp);
    }
    start();
  }
  function burstFrom(el, n) {
    var r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, n || 70);
    tone([880, 1175], 0.07, "triangle", 0.25);
  }
  function cannon(side, n) {
    ensure();
    for (var i = 0; i < n; i++) {
      var a = side < 0 ? rnd(-1.35, -0.6) : rnd(-2.55, -1.8), sp = rnd(11, 20);
      piece(side < 0 ? 0 : W, H, Math.cos(a) * sp, Math.sin(a) * sp);
    }
    start();
  }
  function rain(n) {
    ensure();
    for (var i = 0; i < n; i++) piece(rnd(0, W), rnd(-60, -10), rnd(-1.5, 1.5), rnd(1, 4));
    start();
  }
  function later(ms, fn) {
    pending++;
    timers.push(setTimeout(function () { pending--; fn(); start(); }, ms));
  }

  function celebrate(level) {
    ensure();
    level = level || 0;
    var waves = level >= 3 ? 6 : level >= 2 ? 5 : level >= 1 ? 4 : 3;
    for (var w = 0; w < waves; w++) {
      (function (w) {
        later(w * 650, function () {
          cannon(-1, 34); cannon(1, 34); rain(24);
          if (w % 2 === 0) burst(W / 2, H * 0.6, 50);
        });
      })(w);
    }
    if (level >= 1) {
      later(500, function () { for (var i = 0; i < 7; i++) balloon(); });
      later(2300, function () { for (var i = 0; i < 6; i++) balloon(); });
    }
    if (level >= 3) later(3600, function () { for (var i = 0; i < 8; i++) balloon(); rain(50); });
    tone(level >= 2 ? [523, 659, 784, 1047, 1319, 1568] : [523, 659, 784, 1047], 0.13, "sine", 0.3);
  }
  function stop() {
    timers.forEach(clearTimeout);
    timers = []; pending = 0; parts = [];
    if (ctx) ctx.clearRect(0, 0, W, H);
  }

  return { burstFrom: burstFrom, celebrate: celebrate, stop: stop };
})();
