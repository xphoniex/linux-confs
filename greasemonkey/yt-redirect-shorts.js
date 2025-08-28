// ==UserScript==
// @name Redirect YouTube Shorts
// @version 1.0
// @author xphoniex
// @match  https://www.youtube.com/shorts/*
// @grant none
// @run-at document-start
// ==/UserScript==

const videoId = document.location.toString().match(/shorts\/(.{11})/)[1];

var newUrl = "https://www.youtube.com/watch?v=" + videoId;

location.replace(newUrl);
