// ==UserScript==
// @name         fextralife, block stream
// @description  block the twitch stream on fextralife
// @version      1.4
// @author       Tobias L
// @match        *.wiki.fextralife.com/*
// @license      GPL-3.0-only
// @namespace    https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==

let fextraStream = document.querySelector("#sidebar-wrapper .sidebar-nav #fextravideo")
if (fextraStream != null) {
	fextraStream.remove()
}