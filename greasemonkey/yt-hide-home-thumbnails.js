// ==UserScript==
// @name     Hide YouTube Home Thumbnails
// @version  1
// @match    https://www.youtube.com/
// @author   xphoniex
// @run-at   document-idle
// ==/UserScript==

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    for (const el of document.getElementsByClassName('style-scope ytd-rich-grid-media')) {
      el.style.visibility = 'hidden';
    }
  });
});

const config = {childList:true,subtree:true};
observer.observe(document.body, config);
