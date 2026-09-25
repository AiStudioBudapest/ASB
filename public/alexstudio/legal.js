/* Language layer of the four legal pages (impresszum, adatvedelem, aszf, cookie-tajekoztato).
   Each page holds the Hungarian text (visible by default, so it works without JS and for crawlers) plus one
   <div class="lang-block" data-lang="xx" hidden> per other language. This script shows the block that matches the
   language chosen on the main site (localStorage 'aistudio_lang', the same key), translates the page chrome
   (back link, document menu, title, description) and offers a small language switch. */
(function () {
  'use strict';
  var LANGS = ['hu', 'en', 'fr', 'es', 'de'], KEY = 'aistudio_lang';
  var UI = {
    hu: { back: '← Vissza az AiStudioBudapest oldalra', navLabel: 'Jogi dokumentumok', imp: 'Impresszum', priv: 'Adatvédelmi tájékoztató', terms: 'Általános Szerződési Feltételek', cookies: 'Cookie-tájékoztató', langLabel: 'Nyelv' },
    en: { back: '← Back to the AiStudioBudapest website', navLabel: 'Legal documents', imp: 'Legal notice', priv: 'Privacy notice', terms: 'Terms and Conditions', cookies: 'Cookie notice', langLabel: 'Language' },
    fr: { back: '← Retour au site AiStudioBudapest', navLabel: 'Documents juridiques', imp: 'Mentions légales', priv: 'Politique de confidentialité', terms: 'Conditions générales', cookies: 'Information sur les cookies', langLabel: 'Langue' },
    es: { back: '← Volver al sitio de AiStudioBudapest', navLabel: 'Documentos legales', imp: 'Aviso legal', priv: 'Política de privacidad', terms: 'Condiciones generales', cookies: 'Información sobre cookies', langLabel: 'Idioma' },
    de: { back: '← Zurück zur AiStudioBudapest-Website', navLabel: 'Rechtliche Dokumente', imp: 'Impressum', priv: 'Datenschutzerklärung', terms: 'Allgemeine Geschäftsbedingungen', cookies: 'Cookie-Hinweise', langLabel: 'Sprache' }
  };
  var NAMES = { hu: 'HU', en: 'EN', fr: 'FR', es: 'ES', de: 'DE' };
  var meta = {};
  try { meta = JSON.parse(document.getElementById('legalMeta').textContent) || {}; } catch (e) {}

  function stored() {
    try { var v = localStorage.getItem(KEY); if (v && LANGS.indexOf(v) !== -1) return v; } catch (e) {}
    return 'hu';
  }
  function apply(lang) {
    var ui = UI[lang] || UI.hu;
    document.documentElement.lang = lang;
    Array.prototype.forEach.call(document.querySelectorAll('.lang-block'), function (b) {
      var on = b.getAttribute('data-lang') === lang;
      if (on) b.removeAttribute('hidden'); else b.setAttribute('hidden', '');
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-ui]'), function (el) {
      var t = ui[el.getAttribute('data-ui')]; if (t) el.textContent = t;
    });
    var nav = document.querySelector('.legal-nav'); if (nav) nav.setAttribute('aria-label', ui.navLabel);
    var m = meta[lang] || meta.hu;
    if (m) {
      if (m.title) document.title = m.title;
      var d = document.querySelector('meta[name="description"]'); if (d && m.description) d.setAttribute('content', m.description);
    }
    var pills = document.getElementById('langPills');
    if (pills) {
      pills.setAttribute('aria-label', ui.langLabel);
      Array.prototype.forEach.call(pills.children, function (b) {
        var cur = b.getAttribute('data-lang') === lang;
        b.classList.toggle('active', cur);
        b.setAttribute('aria-pressed', cur ? 'true' : 'false');
      });
    }
  }
  function buildPills() {
    var pills = document.getElementById('langPills'); if (!pills) return;
    pills.setAttribute('role', 'group');
    LANGS.forEach(function (l) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = NAMES[l]; b.setAttribute('data-lang', l);
      b.addEventListener('click', function () {
        try { localStorage.setItem(KEY, l); } catch (e) {}
        apply(l);
      });
      pills.appendChild(b);
    });
  }
  buildPills();
  apply(stored());
  /* another tab (the main site) changed the language */
  window.addEventListener('storage', function (e) { if (e.key === KEY) apply(stored()); });
})();
