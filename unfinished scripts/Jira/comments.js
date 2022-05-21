// ==UserScript==
// @name         Jira Comments
// @description  load all comments by default, add buttons to collapse or expand them
// @version      1.2
// @author       Tobias
// @match        https://jira.poet.de/browse/*
// @license      GNU
// @namespace    http://tampermonkey.net/
// ==/UserScript==

setTimeout(function () {
	loadAllComments()
	loadUI()
}, 1000)

function loadUI() {
	let addButtonsHere = document.getElementById("activitymodule_heading").getElementsByTagName("h4")[0]
	addButtonsHere.outerHTML += `<button id="expand">expand</button> <button id="collapse">collapse</button>`
	document.getElementById("collapse").addEventListener("click", collapse)
	document.getElementById("expand").addEventListener("click", expand)
}

function collapse() {
	document.getElementsByClassName("sd-activity-comment").forEach(function (currentValue) {
		currentValue.classList.remove("expanded")
		currentValue.classList.add("collapsed")
	})
}

function expand() {
	document.getElementsByClassName("sd-activity-comment").forEach(function (currentValue) {
		currentValue.classList.remove("collapsed")
		currentValue.classList.add("expanded")
	})
}

function loadAllComments() {
	const clickHere = document.getElementsByClassName("collapsed-comments")[0]
	if (clickHere == null) return
	clickHere.click()
}
