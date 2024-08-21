// ==UserScript==
// @name     Hide YouTube Extras
// @version  1
// @grant    none
// @match    https://www.youtube.com/watch*
// @author   xphoniex
// ==/UserScript==


const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // thumbnail on the right side (suggests)
    //for (const el of document.getElementsByTagName('ytd-thumbnail')) {
    //  el.style.visibility = "hidden";
    //}
    //
    // whole thing on the right side (suggests) including image & text
    for (const el of document.getElementsByTagName('ytd-compact-video-renderer')) {
      el.style.visibility = "hidden";
    }
    // ad on the right side above suggests
    for (const el of document.getElementsByTagName('ytd-companion-slot-renderer')) {
      el.style.visibility = "hidden";
    }
    // thumbnail at the end of video
    for (const el of document.getElementsByClassName('ytp-videowall-still-image')) {
      el.style.visibility = "hidden";
    }
    // comments content
    for (const el of document.getElementsByClassName('ytd-comment-view-model')) {
      el.style.visibility = "hidden";
    }
  });
});

const config = {childList:true,subtree:true};
observer.observe(document.body, config);
