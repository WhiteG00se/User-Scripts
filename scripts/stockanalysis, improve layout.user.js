// ==UserScript==
// @name         stockanalysis, improve layout
// @description  improves the layout of some tables to show more columns at once
// @version      2.1
// @author       Tobias L
// @match        https://stockanalysis.com/stocks/*/financials*
// @license      GPL-3.0-only
// @namespace    https://github.com/WhiteG00se/User-Scripts
// ==/UserScript==

setTimeout(function () {
	document.querySelector('#main > div.table-wrap.svelte-17fayh1').className = ''
}, 200)
