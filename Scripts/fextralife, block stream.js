// ==UserScript==
// @name         fextralife, block stream
// @description  block the twitch stream on fextralife
// @version      1.0
// @author       Tobias
// @match        *.wiki.fextralife.com/*
// @license      GNU
// @namespace    http://tampermonkey.net/
// ==/UserScript==

let videoSidebar = document.getElementById("sidebar-wrapper")
if (videoSidebar != null) {
	videoSidebar.remove()
}
