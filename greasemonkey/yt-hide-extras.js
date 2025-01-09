// ==UserScript==
// @name     Hide YouTube Extras
// @version  1.1
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
    // added 2024/09/22
    for (const el of document.getElementsByTagName('ytm-shorts-lockup-view-model')) {
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
    // livechat -- doesn't work
    //for (const el of document.getElementsByClassName('yt-live-chat-item-list-renderer')) {
    //  el.style.visibility = "hidden"; // added 2024-10-18
    //}
  });
});

const config = {childList:true,subtree:true};
observer.observe(document.body, config);
