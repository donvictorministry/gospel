/* share.js: sharing helpers (system share sheet with an image, WhatsApp, Facebook). */
var Share = {
  url: function () { return location.href.split("#")[0]; },
  whatsapp: function (text) {
    window.open("https://wa.me/?text=" + encodeURIComponent(text + " " + Share.url()), "_blank");
  },
  facebook: function () {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(Share.url()), "_blank");
  },
  /* Shares an image file through the Android share sheet; falls back to WhatsApp text. */
  file: function (blob, name, text) {
    var f = new File([blob], name, { type: blob.type || "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      return navigator.share({ files: [f], text: text + " " + Share.url(), title: "Bible Quiz" }).catch(function () {});
    }
    Share.whatsapp(text);
  }
};
