// ==UserScript==
// @name Redirect Reddit
// @namespace https://www.reddit.com/
// @version 1.0
// @author xphoniex
// @match  https://www.reddit.com/*
// @include https://www.reddit.com/*
// @exclude https://www.reddit.com/media*
// @grant none
// @run-at document-start
// ==/UserScript==

var currentUrl = document.location.toString();
var newUrl = "https://old." + currentUrl.substr(12);

location.replace(newUrl);
