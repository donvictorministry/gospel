/* popup.js: "Why I built this" card with circular photo and a typewriter that types and deletes
   each paragraph in turn, so the whole message is read in pieces. */
(function () {
  if (window.BLOCKED || !window.GFA) return;

  var SEG = [];
  var el = null, timer = null, i = 0, j = 0, mode = "type", txt, ico, dots;

  function photoSrc() { var p = document.getElementById("devPhoto"); return p ? p.src : ""; }

  function paintDots() {
    for (var k = 0; k < dots.children.length; k++) dots.children[k].className = k === i ? "on" : "";
  }

  function tick() {
    if (!el) return;
    var s = SEG[i];
    if (mode === "type") {
      j++;
      txt.textContent = s.t.slice(0, j);
      if (j >= s.t.length) {
        if (s.icon) ico.style.display = "inline-block";
        mode = "hold";
        timer = setTimeout(tick, 1500 + s.t.length * 60);
      } else { timer = setTimeout(tick, 38); }
    } else if (mode === "hold") {
      mode = "del";
      timer = setTimeout(tick, 150);
    } else {
      j = Math.max(0, j - 3);
      txt.textContent = s.t.slice(0, j);
      ico.style.display = "none";
      if (j <= 0) { i = (i + 1) % SEG.length; mode = "type"; paintDots(); timer = setTimeout(tick, 350); }
      else { timer = setTimeout(tick, 18); }
    }
  }

  function close() { clearTimeout(timer); if (el) { el.remove(); el = null; } }

  function open() {
    if (el || document.querySelector(".modal.open")) return;
    var P = T.en.popup;
    SEG = P.map(function (t, k) { return { t: t, icon: k === P.length - 1 }; });
    el = document.createElement("div");
    el.className = "pop";
    el.innerHTML =
      '<div class="pc" role="dialog">' +
      '<button class="x pcx" id="pClose" aria-label="Close"><svg class="ic"><use href="#i-x"/></svg></button>' +
      '<div class="dpw" style="--z:150px"><div class="ring"><span class="orb"><svg class="ic"><use href="#i-code"/></svg></span></div><div class="photo"><img src="' + photoSrc() + '" alt="' + DEV_NAME + '"></div></div>' +
      '<div class="pn">' + DEV_NAME + '</div>' +
      '<div class="pro" data-i="devRole"></div>' +
      '<div class="ptx"><span id="pTxt"></span><span class="cur"></span><svg class="ic f pic" id="pIco"><use href="#i-heart"/></svg></div>' +
      '<div class="dots" id="pDots"><span></span><span></span><span></span><span></span></div>' +
      '<button class="btn" id="pShare"><svg class="ic"><use href="#i-share"/></svg><span data-i="shareApp"></span></button>' +
      '</div>';
    document.body.appendChild(el);
    txt = document.getElementById("pTxt");
    ico = document.getElementById("pIco");
    dots = document.getElementById("pDots");
    document.getElementById("pClose").onclick = close;
    document.getElementById("pShare").onclick = function () { close(); GFA.open("mShare"); };
    GFA.render();
    i = 0; j = 0; mode = "type"; paintDots();
    timer = setTimeout(tick, 500);
  }

  var why = document.getElementById("btnWhy");
  if (why) why.onclick = open;

  var seen = false;
  try { seen = sessionStorage.getItem("gfa_pop") === "1"; sessionStorage.setItem("gfa_pop", "1"); } catch (e) {}
  if (!seen) setTimeout(open, 1800);
})();
