// ==UserScript==
// @name         YouTube ad skipper and speed changer
// @version      2.0
// @description  Simple ad skipper for youtube
// @author       xphoniex
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // 04/17
    //if (document.contains(document.getElementsByClassName('ytp-skip-ad-button')[0])) {
    //  document.getElementsByClassName('ytp-skip-ad-button')[0].click();
    //}
    // new
    if (document.contains(document.getElementsByClassName('ytp-ad-text ytp-ad-preview-text-modern')[0])) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'X', code: 'KeyX' }));
    }
    // case: ytp-ad-text ytp-ad-preview-text
    if (document.contains(document.getElementsByClassName('ytp-ad-text ytp-ad-preview-text')[0])) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'X', code: 'KeyX' }));
    }
    // 04/17
    if (document.contains(document.getElementsByClassName('ytp-ad-text')[0])) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'X', code: 'KeyX' }));
    }
    // 2024-11-02
    if (document.contains(document.getElementsByClassName('ytp-ad-player-overlay-layout__ad-info-container')[0])) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'X', code: 'KeyX' }));
    }
  });
});

const config = {childList:true,subtree:true};
observer.observe(document.body, config);
