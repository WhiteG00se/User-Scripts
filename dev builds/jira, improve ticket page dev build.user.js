// ==UserScript==
// @name jira, improve ticket page dev build
// @description needs work
// @version 2.0
// @author Tobias L
// @include */jira.*/browse*
// @include */jira/*/browse*
// @include *.jira.*/browse*
// @license GPL-3.0-only
// @namespace https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==

loadAllCommentsDuringPageLoad()
commentOrder()
loadExpandCollapseButtons()
keepRestoringUI()

function loadAllCommentsDuringPageLoad() {
	if (localStorage.getItem("ex_shouldLoadAllCommentsDuringPageLoad") != "true") return //check localStorage
	const clickHere = document.getElementsByClassName("collapsed-comments")[0]
	if (clickHere == null) return //guard clause
	clickHere.click()
}
function commentOrder() {
	let ex_orderButton
	switch (localStorage.getItem("ex_selectCommentOrder")) {
		case "newestFirst":
			ex_orderButton = document.querySelector("#activitymodule .issue-activity-sort-link .aui-iconfont-up")
			if (ex_orderButton == null) return //guard clause
			ex_orderButton.click()
			break
		case "oldestFirst":
			ex_orderButton = document.querySelector("#activitymodule .issue-activity-sort-link .aui-iconfont-down")
			if (ex_orderButton == null) return //guard clause
			ex_orderButton.click()
			break
	}
}
// buttons to expand/collapse all comments at once
function loadExpandCollapseButtons() {
	if (localStorage.getItem("ex_showExpandCollapseButtons") != "true") return //check localStorage
	if (document.querySelector("#ex_expandCollapseButtons") != null) return //guard clause
	let ex_expandCollapseButtons = `
<span id="ex_expandCollapseButtons">
	<button id="expandComments">expand all</button>
	<button id="collapseComments">collapse all</button>
</span>
`
	document.querySelector("#activitymodule_heading h4").insertAdjacentHTML("afterend", ex_expandCollapseButtons)
	document.querySelector("#collapseComments").addEventListener("click", collapseComments)
	document.querySelector("#expandComments").addEventListener("click", expandComments)
}
function keepRestoringUI() {
	const monitoredNode = document.querySelector("body")
	const ex_mutationObserver = new MutationObserver((entries) => {
		if (localStorage.getItem("ex_debugMode") == "true") console.log(entries) //check localStorage
		loadExpandCollapseButtons()
	})
	ex_mutationObserver.observe(monitoredNode, { childList: true, subtree: true })
}
function collapseComments() {
	document.querySelectorAll(".twixi-block").forEach(function (currentValue) {
		currentValue.classList.remove("expanded")
		currentValue.classList.add("collapsed")
	})
}
function expandComments() {
	document.querySelectorAll(".twixi-block").forEach(function (currentValue) {
		currentValue.classList.remove("collapsed")
		currentValue.classList.add("expanded")
	})
}
// buttons to expand/collapse all comments at once
