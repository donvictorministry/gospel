(function () {
  if (window.BLOCKED) return;

  var CONTACT = {
    email: "donvictorministry@gmail.com", 
    phone: "+2347035794649",     
    whatsapp: "2348086590253",
    facebook: "https://facebook.com/Rev.DonVictor"  
  };

  var $ = function (id) { return document.getElementById(id); };
  var lang = "en", vi = 0, deferred = null, tt = null;

  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var saved = load("bf_lang");
  var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  lang = (saved && LANGS[saved]) ? saved : (LANGS[nav] ? nav : "en");

  function toast(msg, kind, ms) {
    $("toastMsg").textContent = msg;
    $("toastIco").className = "ali " + (kind || "");
    $("toastUse").setAttribute("href", kind === "ok" ? "#i-check" : kind === "err" ? "#i-x" : "#i-info");
    $("toast").classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(function () { $("toast").classList.remove("show"); }, ms || 2600);
  }
  $("toast").onclick = function () { $("toast").classList.remove("show"); };

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function col(c) { return /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]{3,20})$/.test(c) ? c : ""; }
  function tickItem(it) {
    var b = col(it[1]), c = col(it[2]), st = (b ? "background:" + b + ";" : "") + (c ? "color:" + c + ";" : "");
    return "<span" + (st ? ' class="tm" style="' + st + '"' : "") + ">" + esc(it[0]) + "</span><i></i>";
  }

  function render() {
    var t = T.en;
    document.documentElement.lang = "en";
    document.querySelectorAll("[data-i]").forEach(function (e) {
      var k = e.getAttribute("data-i");
      var tv = t[k] || T.en[k];
      if (tv) e.textContent = tv;
    });
    var v = VERSES[vi];
    $("vtext").textContent = "\u201C" + v.text[lang] + "\u201D";
    $("vref").textContent = v.ref[lang];

    var items = (window.GFA_TK && GFA_TK.length) ? GFA_TK : t.ticker.map(function (m) { return [m, "", ""]; });
    var group = "";
    for (var r = 0; r < 2; r++) {
      items.forEach(function (it) { group += tickItem(it); });
    }
    $("tk").innerHTML = group + group;
    renderDev(t);
  }

  var sel = $("lang");
  Object.keys(LANGS).forEach(function (k) {
    var o = document.createElement("option");
    o.value = k; o.textContent = LANGS[k];
    sel.appendChild(o);
  });
  sel.value = lang;
  sel.onchange = function () { lang = sel.value; save("bf_lang", lang); render(); };

  $("btnNext").onclick = function () { vi = (vi + 1) % VERSES.length; render(); };

  /* Drawers and modals use a back stack, like a native Android app:
     sidebar > page > back arrow returns to the sidebar > back arrow returns Home */
  var scrim = $("scrim"), stack = [], HOOKS = {};
  function showTop() {
    document.querySelectorAll(".drawer.open,.modal.open").forEach(function (m) { m.classList.remove("open"); });
    scrim.classList.remove("show");
    var id = stack[stack.length - 1];
    Object.keys(HOOKS).forEach(function (k) { var h = HOOKS[k]; if (k !== id && h.on) { h.on = false; h.close(); } });
    if (!id) return;
    if (HOOKS[id]) { if (!HOOKS[id].on) { HOOKS[id].on = true; HOOKS[id].open(); } return; }
    $(id).classList.add("open");
    if (id.charAt(0) === "d") scrim.classList.add("show");
    if (id === "mDev" && window.devMeasure) devMeasure();
    if (id === "mTeam" && window.teamMeasure) teamMeasure();
  }
  function openM(id) {
    if (stack[stack.length - 1] === id) return;
    stack.push(id);
    history.pushState({ n: stack.length }, "");
    showTop();
  }
  function closeM() { if (stack.length) history.back(); else showTop(); }
  window.addEventListener("popstate", function (e) {
    stack.length = Math.min(stack.length, (e.state && e.state.n) || 0);
    showTop();
  });
  scrim.onclick = closeM;
  document.querySelectorAll("[data-close]").forEach(function (b) { b.onclick = closeM; });
  document.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { openM(b.getAttribute("data-go")); }; });
  $("btnMenuL").onclick = function () { openM("dL"); };
  $("btnMenuR").onclick = function () { openM("dR"); };
  [["btnShare", "mShare"], ["btnContact", "mContact"], ["btnDev", "mDev"], ["btnAbout", "mAbout"],
   ["btnHow", "mHow"], ["btnTerms", "mTerms"], ["btnProp", "mProp"], ["btnSupport", "mSupport"]].forEach(function (p) {
    $(p[0]).onclick = function () { openM(p[1]); };
  });
  document.querySelectorAll(".drawer").forEach(function (d) {
    d.addEventListener("click", function (e) {
      var it = e.target.closest(".di");
      if (it && !it.hasAttribute("data-keep") && !document.querySelector(".modal.open")) closeM();
    });
  });

  /* Bottom navigation */
  document.querySelectorAll(".bi").forEach(function (b) {
    b.onclick = function () {
      document.querySelectorAll(".bi").forEach(function (x) { x.classList.toggle("on", x === b); });
      document.querySelectorAll(".pg").forEach(function (p) { p.classList.toggle("on", p.id === b.getAttribute("data-p")); });
    };
  });

  /* Install */
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; });
  window.addEventListener("appinstalled", function () { deferred = null; toast(T.en.installedOk, "ok"); });
  $("btnInstall").onclick = function () {
    if (window.matchMedia("(display-mode: standalone)").matches) { toast(T.en.installed); return; }
    if (deferred) { deferred.prompt(); deferred = null; } else { toast(T.en.noInstall); }
  };

  /* Share App: Bluetooth (Android share sheet), WhatsApp, Facebook */
  var url = location.href.split("#")[0];
  $("shBt").onclick = function () {
    if (navigator.share) {
      navigator.share({ title: "Gospel For All", text: T.en.shareText, url: url }).catch(function () {});
    } else { toast(T.en.shareFail, "err"); }
  };
  $("shWa").onclick = function () {
    window.open("https://wa.me/?text=" + encodeURIComponent(T.en.shareText + " " + url), "_blank");
  };
  $("shFb").onclick = function () {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "_blank");
  };

  /* Contact */
  $("cEmail").onclick = function () { CONTACT.email ? (location.href = "mailto:" + CONTACT.email) : toast(T.en.notSet, "err"); };
  $("cFb").onclick = function () { CONTACT.facebook ? window.open(CONTACT.facebook, "_blank") : toast(T.en.notSet, "err"); };
  $("cPhone").onclick = function () { CONTACT.phone ? (location.href = "tel:" + CONTACT.phone) : toast(T.en.notSet, "err"); };
  $("cWa").onclick = function () { CONTACT.whatsapp ? window.open("https://wa.me/" + CONTACT.whatsapp, "_blank") : toast(T.en.notSet, "err"); };

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }

  /* Themes: light (default) and dark */
  var THEMES = { light: "#FFFFFF", dark: "#121212" };
  var theme = THEMES[load("gfa_theme")] ? load("gfa_theme") : "light";
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    $("themeMeta").setAttribute("content", THEMES[theme]);
    document.querySelectorAll("[data-theme-opt]").forEach(function (b) {
      b.classList.toggle("sel", b.getAttribute("data-theme-opt") === theme);
    });
  }
  document.querySelectorAll("[data-theme-opt]").forEach(function (b) {
    b.onclick = function () { theme = b.getAttribute("data-theme-opt"); save("gfa_theme", theme); applyTheme(); };
  });
  applyTheme();

  render();

  /* Ministry stats count-up */
  document.querySelectorAll("[data-count]").forEach(function (b) {
    var end = parseInt(b.getAttribute("data-count"), 10), t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / 1800);
      b.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  /* Small shell used by game.js (the JESUS puzzle expects a DV object) */
  var dv = {
    routes: {},
    addNavItem: function () {},
    route: function (k, c) { dv.routes[k] = c; },
    logActivity: function () {},
    closeRoute: closeM
  };
  window.DV = dv;

  /* Hooks for popup.js, team.js and quiz.js */
  window.GFA = {
    open: openM,
    close: closeM,
    t: function (k) { return T.en[k]; },
    render: render,
    hook: function (id, open, close) { HOOKS[id] = { open: open, close: close, on: false }; },
    toast: toast
  };
})();
