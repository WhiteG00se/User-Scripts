// ==UserScript==
// @name         jira, comments dev build
// @description  load all comments by default, add buttons to collapse or expand them
// @version      1.0
// @author       Tobias L
// @include      */jira.*/browse*
// @include      */jira/*/browse*
// @include      *.jira.*/browse*
// @license      GPL-3.0-only
// @namespace    https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==

loadAllComments()
loadUI()
reloadUI()
commentOrder()

function loadUI() {
	if (document.querySelector("#extensionUI") == null) {
		document.querySelector("#activitymodule_heading h4").outerHTML += `<span id="extensionUI" ></span>`
		let extensionUI = document.querySelector("#extensionUI")
		extensionUI.innerHTML = `<button id="expand">expand all</button> <button id="collapse">collapse all</button>`
		document.querySelector("#collapse").addEventListener("click", collapse)
		document.querySelector("#expand").addEventListener("click", expand)
	}
}
function reloadUI() {
	const monitoredNode = document.querySelector("body")
	const mutationObserver = new MutationObserver((entries) => {
		console.log(entries)
		loadUI()
		console.log("element restored")
	})
	mutationObserver.observe(monitoredNode, { childList: true, subtree: true })
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
function commentOrder() {
	let orderButton = document.querySelector("#activitymodule .issue-activity-sort-link .aui-iconfont-up")
	if (orderButton == null) return
	orderButton.click()
}
