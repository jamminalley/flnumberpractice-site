// Audio playback for cheat-sheet number cards.
// Uses the Web Speech API (built into browsers, no audio files needed).
// Click any .ncard to hear the native-script text pronounced in the page's
// language. Falls back to silently no-op if SpeechSynthesis is unavailable.

(function () {
  if (typeof window === 'undefined') return;
  if (!('speechSynthesis' in window)) return;

  // Map URL slug → BCP-47 language tag
  const LANG_BY_SLUG = {
    'portuguese-pt': 'pt-PT',
    'portuguese-br': 'pt-BR',
    'spanish':       'es-ES',
    'french':        'fr-FR',
    'italian':       'it-IT',
    'german':        'de-DE',
    'dutch':         'nl-NL',
    'english':       'en-US',
    'russian':       'ru-RU',
    'hindi':         'hi-IN',
    'persian':       'fa-IR',
    'japanese':      'ja-JP',
    'korean':        'ko-KR',
    'mandarin':      'zh-CN',
    'arabic':        'ar-SA',
    'indonesian':    'id-ID',
    'tagalog':       'fil-PH',
    'vietnamese':    'vi-VN',
  };

  // Detect language from URL path: /portuguese-br/ → 'portuguese-br'
  const slug = window.location.pathname.split('/').filter(Boolean)[0];
  const lang = LANG_BY_SLUG[slug];
  if (!lang) return; // not a detail page — nothing to wire up

  let activeCard = null;

  function clearActive() {
    if (activeCard) {
      activeCard.classList.remove('speaking');
      activeCard = null;
    }
  }

  function speak(text, card) {
    if (!text) return;
    window.speechSynthesis.cancel();
    clearActive();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.9;

    utter.onstart = () => {
      activeCard = card;
      card.classList.add('speaking');
    };
    utter.onend = clearActive;
    utter.onerror = clearActive;

    window.speechSynthesis.speak(utter);
  }

  function extractSpoken(card) {
    // The card's primary text is .w (native script). Strip any .alt children
    // (alternate spellings like "doscientos / doscientas") so we read only the
    // primary form.
    const w = card.querySelector('.w');
    if (!w) return '';
    const clone = w.cloneNode(true);
    clone.querySelectorAll('.alt').forEach(el => el.remove());
    let text = clone.textContent.replace(/\s+/g, ' ').trim();
    // Cards sometimes contain "primary / secondary" forms without an .alt wrapper.
    // Take the part before the first slash.
    const slashIdx = text.indexOf(' / ');
    if (slashIdx > 0) text = text.substring(0, slashIdx).trim();
    return text;
  }

  function wireCard(card) {
    const text = extractSpoken(card);
    if (!text) return;

    card.classList.add('audio-ready');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'Play pronunciation: ' + text);

    card.addEventListener('click', () => speak(text, card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        speak(text, card);
      }
    });
  }

  function init() {
    document.querySelectorAll('.ncard').forEach(wireCard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
