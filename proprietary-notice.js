/* proprietary-notice.js: "Proprietary Software Notification */

var PROP_NOTICE = {
  title: "Proprietary Software Notification",
  head: "IMPORTANT NOTICE",
  paragraphs: [
    "This is a proprietary software product developed exclusively by Rev. Don Victor, PhD",
    "You are authorized to use this application for personal purposes only. Any unauthorized reproduction, distribution, or modification of this application is strictly prohibited and constitutes a violation of intellectual property law.",
    "Dr. Don Victor, DV Network Engine, actively monitors, detects, and safeguards against unauthorized access, modification, and unlawful tampering. Any infringement, misuse, or attempt to compromise the integrity of this application may result in appropriate legal action and other remedies available under applicable laws.",
  ],
  thanks: "Thank you for respecting the work and ministry behind this application.",
};

(function () {
  if (window.BLOCKED || !window.GFA) return;
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  var sec = document.createElement("section");
  sec.className = "modal mprop";
  sec.id = "mProp";
  sec.innerHTML =
    '<div class="mprh"><h2>' + esc(PROP_NOTICE.title) + '</h2>' +
    '<button class="x" id="propX" aria-label="Close"><svg class="ic"><use href="#i-x"/></svg></button></div>' +
    '<div class="pnc"><h3>' + esc(PROP_NOTICE.head) + '</h3>' +
    PROP_NOTICE.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div>' +
    '<p class="pnt">' + esc(PROP_NOTICE.thanks) + '</p>';
  document.body.appendChild(sec);
  document.getElementById("propX").onclick = GFA.close;
})();
