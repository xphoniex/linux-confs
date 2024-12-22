// ==UserScript==
// @name     YouTube auto turn-on closed captions
// @version  1
// @grant    none
// @author   xphoniex
// @match    https://www.youtube.com/watch*
// ==/UserScript==

let mutationsArrayAttrs = [];
let mutationsArrayAdds = [];
let observerDebounceTimer;
let btn = document.getElementsByClassName('ytp-subtitles-button ytp-button')[0] || undefined;

let observer1 = undefined; // observes only the subtitle button
let observer2 = undefined; // observes document.body

function debounceObserverAttrs(mutations) {
  clearTimeout(observerDebounceTimer);
  mutationsArrayAttrs.push(mutations);
  observerDebounceTimer = setTimeout(dealWithMutationsAttrs, 10);
}

function dealWithMutationsAttrs() {
  const mutations = mutationsArrayAttrs.flat();
  mutationsArrayAttrs = [];
  const changedAttrs = mutations.map((mutation) => mutation.attributeName).filter((changedAttrs) => changedAttrs);
  changedAttrs.forEach((attr) => {
    if (/*attr === 'aria-pressed' && */btn.ariaPressed === 'false') {
      btn.click();
    }
  });
}

function debounceObserverAdds(mutations) {
  clearTimeout(observerDebounceTimer);
  mutationsArrayAdds.push(mutations);
  observerDebounceTimer = setTimeout(dealWithMutationsAdds, 10);
}

function dealWithMutationsAdds() {
  const mutations = mutationsArrayAdds.flat()
  mutationsArrayAdds = [];

  const addedNodes = mutations.map((mutation) => mutation.addedNodes).filter((addedNodes) => addedNodes);
  const withTag = addedNodes.map((nodeList) => Array.from(nodeList)).flat().filter((node) => {
    return node.nodeName === 'BUTTON' && node.className === 'ytp-subtitles-button ytp-button';
  })
  withTag.forEach((el) => {
    btn = el;
    
    observer1 = new MutationObserver(debounceObserverAttrs);
    observer1.observe(btn, { attributes: true });
      
    observer2.disconnect(); // we're done observing document.body
      
    if (el.ariaPressed === 'false') {
      el.click();
    }
  })
}

function watchForMutations() {
  if (btn) {
  	observer1 = new MutationObserver(debounceObserverAttrs);
    observer1.observe(btn, { attributes: true });
  } else {
    observer2 = new MutationObserver(debounceObserverAdds);
    observer2.observe(document.body, { childList: true, subtree: true });
  }
}

//if (btn) {
//  // sometimes beginning is just ads - click won't transfer to actual video
//  // other times, when disabling captions using 'c', attrs mutations won't hit
//  // and you can't just rely on this because not always the `btn` is set at the start
//  setInterval(() => { if (btn.ariaPressed === 'false') { btn.click(); } }, 5 * 1000);
//}

watchForMutations();
