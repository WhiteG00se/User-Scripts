// ==UserScript==
// @name         fextralife, block stream
// @description  block the twitch stream on fextralife
// @version      1.3
// @author       Tobias
// @match        *.wiki.fextralife.com/*
// @license      GNU
// @namespace    https://github.com/GreyGooseVX/Greasy-Fork-Scripts
// ==/UserScript==

let fextraStream = document.getElementById("fextravideo")
if (fextraStream != null) {
	fextraStream.remove()
}
