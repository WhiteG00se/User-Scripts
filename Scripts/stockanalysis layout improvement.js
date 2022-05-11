// ==UserScript==
// @name         stockanalysis layout improvement
// @description  improves the layout of some tables to show more columns at once
// @version      1.0
// @author       Tobias
// @match        stockanalysis.com/stocks/*/financials*
// @license      GNU
// @namespace    http://tampermonkey.net/
// ==/UserScript==
 
document.getElementsByClassName("overflow-x-auto border border-gray-300")[0].className=""