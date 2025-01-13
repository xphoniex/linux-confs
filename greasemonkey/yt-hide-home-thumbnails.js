// ==UserScript==
// @name     Hide YouTube Home Thumbnails
// @version  1.1
// @match    https://www.youtube.com/
// @author   xphoniex
// @run-at   document-idle
// ==/UserScript==

let mutationsArray = [];
let observerDebounceTimer;

function debounceObserver(mutations) {
  clearTimeout(observerDebounceTimer);
  mutationsArray.push(mutations);
  observerDebounceTimer = setTimeout(dealWithMutations, 10);
}

function dealWithMutations() {
  const mutations = mutationsArray.flat()
  mutationsArray = [];
  const addedNodes = mutations.map((mutation) => mutation.addedNodes).filter((addedNodes) => addedNodes);

  addedNodes.map((nodeList) => Array.from(nodeList)).flat().map((node) => {
    if (node.className === 'style-scope ytd-rich-grid-media') {
      node.style.visibility = 'hidden';
    }
  });
}

const observer = new MutationObserver(debounceObserver);
observer.observe(document.body, { childList: true, subtree: true });
