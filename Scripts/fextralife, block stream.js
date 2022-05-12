// ==UserScript==
// @name         fextralife, block stream
// @description  block the twitch stream on fextralife
// @version      1.2
// @author       Tobias
// @match        *.wiki.fextralife.com/*
// @license      GNU
// @namespace    https://github.com/GreyGooseVX/Greasy-Fork-Scripts
// ==/UserScript==

let videoSidebar = document.getElementById("sidebar-wrapper")
if (videoSidebar != null) {
	videoSidebar.remove()
}
