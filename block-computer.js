/* Android-phone-only guard. Blocks desktops, laptops, iPhones, iPads and Android desktop-mode. */
(function () {
  var ua = navigator.userAgent || "";
  var isAndroid = /Android/i.test(ua);
  var isMobileUA = /Mobile/i.test(ua);
  var hasTouch = (navigator.maxTouchPoints || 0) > 0;
  var smallScreen = Math.min(screen.width, screen.height) <= 900;
  if (isAndroid && isMobileUA && hasTouch && smallScreen) { window.BLOCKED = false; return; }

  window.BLOCKED = true;
  var s = "width:100dvw;height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;text-align:center;background:#FFFFFF;color:#121212;font-family:Roboto,sans-serif;";
  document.body.style.cssText = "margin:0;overflow:hidden;background:#FFFFFF";
  document.body.innerHTML =
    '<div style="' + s + '">' +
    '<svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#DF1E5A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>' +
    '<div style="font-size:28px;font-weight:700">Android Phones Only</div>' +
    '<div style="font-size:20px;color:#5F5F5F">Gospel For All is built for Android phones. Open this link on your Android phone using Chrome, and turn off Desktop site mode.</div>' +
    '</div>';
})();
