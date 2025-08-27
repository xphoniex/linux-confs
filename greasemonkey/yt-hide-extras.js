// ==UserScript==
// @name     Hide YouTube Extras
// @version  1.2
// @grant    none
// @match    https://www.youtube.com/watch*
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
  const mutations = mutationsArray.flat();
  mutationsArray = [];
  const addedNodes = mutations.map((mutation) => mutation.addedNodes).filter((addedNodes) => addedNodes);

  addedNodes.map((nodeList) => Array.from(nodeList)).flat().map((node) => {
    // whole thing on the right side (suggests) including image & text
    if (node.nodeName === 'YTD-COMPACT-VIDEO-RENDERER') {
      node.style.visibility = "hidden";
    }
    // added 2024/09/22
    if (node.nodeName === 'YTM-SHORTS-LOCKUP-VIEW-MODEL') {
      node.style.visibility = "hidden";
    }
    // ad on the right side above suggests
    if (node.nodeName === 'YTD-COMPANION-SLOT-RENDERER') {
      node.style.visibility = "hidden";
    }
    // thumbnail at the end of video
    if (node.classList && node.classList.contains('ytp-videowall-still-image')) {
      node.style.visibility = "hidden";
    }
    // comments content
    if (node.nodeName === 'YTD-COMMENT-VIEW-MODEL') {
      node.style.visibility = "hidden";
    }
    // right side video, added 2025/07/25
    if (node.nodeName === 'YT-LOCKUP-VIEW-MODEL') {
      node.style.visibility = "hidden";
    }
    // added 2025/08/12
    if (node.nodeName.toLowerCase() === 'ytd-comments') {
      node.style.visibility = "hidden";
    }
  });
  // thumbnail at the end of video
  for (const el of document.getElementsByClassName('ytp-videowall-still-image')) {
    if (el.style.visibility !== "hidden") {
      el.style.visibility = "hidden";
    }
  }
  // comments content
  //for (const el of document.getElementsByClassName('ytd-comment-view-model')) {
  //  if (el.style.visibility !== "hidden") {
  //    el.style.visibility = "hidden";
  //  }
  //}

}

const observer = new MutationObserver(debounceObserver);
observer.observe(document.body, { childList: true, subtree: true });
