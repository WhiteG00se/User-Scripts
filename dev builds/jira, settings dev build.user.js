// ==UserScript==
// @name jira, settings dev build
// @description needs work
// @version 1.0
// @author Tobias L
// @include */jira.*
// @include */jira/*
// @include *.jira.*
// @license GPL-3.0-only
// @namespace https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==

runCodeForPagetype(getPagetype())

function runCodeForPagetype(pagetype) {
	modalCode()
	switch (pagetype) {
		case "dashboard":
			dashboardPageCode()
			break
		case "ticket":
			ticketPageCode()
			break
	}
}
function getPagetype() {
	let URL = window.location.href
	let pagetype = "default"
	if (localStorage.getItem("ex_debugMode") == "true") console.log(URL)
	//check if URL contains "/dashboard.jspa" (not case sensitive)
	if (URL.toLowerCase().includes("/dashboard.jspa")) {
		pagetype = "dashboard"
	}
	//check if URL contains "/browse" (not case sensitive)
	if (URL.toLowerCase().includes("/browse")) {
		pagetype = "ticket"
	}
	if (localStorage.getItem("ex_debugMode") == "true") console.log(`the page type is: ${pagetype}`)
	return pagetype
}
function modalCode() {
	loadModalButton()
	loadModal()
	localStorageToModal()
	submitModal()
	function loadModalButton() {
		//load ex_modalButton into nav bar + add event listener to open the modal
		let ex_modalButton = `
	<button id="ex_modalButton">
		<h3>&#9889</h3>
	</button>`
		document.querySelector("#quicksearch-menu").insertAdjacentHTML("afterend", ex_modalButton)
		document.querySelector("#ex_modalButton").addEventListener("click", function () {
			document.querySelector("#ex_modal").style.display = "block"
			document.querySelector(".aui-blanket").removeAttribute("hidden")
		})
	}
	function loadModal() {
		//load ex_modal into page with "display: none"
		let modal = `
		<span id="ex_modal" style="display: none">
		<section class="aui-layer aui-dialog2 aui-dialog2-large" open="" style="z-index: 3000;" tabindex="-1">
			<header class="aui-dialog2-header">
				<h2 class="aui-dialog2-header-main">extention settings</h2>
			</header>
			<div class="aui-dialog2-content">
				<form>
					<h2>dashboard settings</h2>
					<table>
						<tr>
							<td>
								refresh the page <abbr title='does not refresh while the "Create Issue" dialoge is open'> every x minutes</abbr> (0 to disable)
							</td>
							<td>
								<select class="ex_modalSelect" id="ex_refreshDashboardInterval">
									<option value="0">0</option>
									<option value="60">1</option>
									<option value="120">2</option>
									<option value="180">3</option>
									<option value="240">4</option>
									<option value="300">5</option>
									<option value="360">6</option>
									<option value="420">7</option>
									<option value="480">8</option>
									<option value="540">9</option>
									<option value="600">10</option>
									<option value="660">11</option>
									<option value="720">12</option>
									<option value="780">13</option>
									<option value="840">14</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>
								remove sidebar?
							</td>
							<td>
								<input type="checkbox" class="ex_modalCheckbox" id="ex_removeSidebar">
							</td>
						</tr>
					</table>
					<hr>
					<h2>ticket page settings</h2>
					<table>
						<tr>
							<td>
								load all comments <abbr title="when the ticket page is loaded"> right away</abbr>
							</td>
							<td>
								<input type="checkbox" class="ex_modalCheckbox" id="ex_shouldLoadAllCommentsDuringPageLoad">
							</td>
						</tr>
						<tr>
							<td>
								show buttons to expand/collapse all comments at once
							</td>
							<td>
								<input type="checkbox" class="ex_modalCheckbox" id="ex_showExpandCollapseButtons">
							</td>
						</tr>
						<tr>
							<td>
								default comment order
							</td>
							<td>
								<select class="ex_modalSelect" id="ex_selectCommentOrder">
									<option value="newestFirst">newest first</option>
									<option value="oldestFirst">oldest first</option>
									<option value="jiraDefault">jira default</option>
								</select>
							</td>
						</tr>
					</table>
					<hr>
					<h2>dev settings</h2>
					<table>
						<tr>
							<td>
								console logs for debugging
							</td>
							<td>
								<input type="checkbox" class="ex_modalCheckbox" id="ex_debugMode">
							</td>
					</table>
				</form>
			</div>
			<footer class="aui-dialog2-footer">
				<div class="aui-dialog2-footer-actions">
					<button id="ex_modal-submit-button" class="aui-button aui-button-primary" resolved="">Submit</button>
					<button id="ex_modal-cancel-button" class="aui-button aui-button-link" resolved="">Cancel</button>
				</div>
				<div class="aui-dialog2-footer-hint">Made by Tobias L</div>
			</footer>
		</section>
	</span>
	<div aria-hidden="true" class="aui-blanket" tabindex="0" hidden=""></div>
	`
		document.querySelector("body").insertAdjacentHTML("beforeend", modal)
		//add event listener to cancel button
		document.querySelector("#ex_modal-cancel-button").addEventListener("click", function () {
			document.querySelector("#ex_modal").style.display = "none"
			document.querySelector(".aui-blanket").setAttribute("hidden", "")
		})
	}
	function localStorageToModal() {
		//load values from localStorage to modal
		//load values for class ex_modalCheckbox
		document.querySelectorAll(".ex_modalCheckbox").forEach(function (element) {
			if (localStorage.getItem(element.id) == "true") {
				element.checked = true
			} else {
				element.checked = false
			}
		})
		//load values for class ex_modalSelect
		document.querySelectorAll(".ex_modalSelect").forEach(function (element) {
			element.value = localStorage.getItem(element.id)
		})
	}
	function submitModal() {
		//add event listener to submit button
		document.querySelector("#ex_modal-submit-button").addEventListener("click", function () {
			//set all values with class "ex_modalCheckbox" to localStorage
			document.querySelectorAll(".ex_modalCheckbox").forEach(function (element) {
				localStorage.setItem(element.id, element.checked)
			})
			//set all values with class "ex_modalSelect" to localStorage
			document.querySelectorAll(".ex_modalSelect").forEach(function (element) {
				localStorage.setItem(element.id, element.value)
			})
			//reload page
			location.reload()
		})
	}
}
function ticketPageCode() {
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
}
function dashboardPageCode() {
	removeSidebar()
	refreshDashboard()
	function removeSidebar() {
		if (localStorage.getItem("ex_removeSidebar") != "true") return //check localStorage
		document.querySelector("#dashboard .dashboard-tabs").remove()
		if (localStorage.getItem("ex_debugMode") == "true") console.log("Sidebar removed")
	}
	function refreshDashboard() {
		const interval = parseInt(localStorage.getItem("ex_refreshDashboardInterval"))
		if (interval == null || interval == "0") return // check localStorage
		setInterval(function () {
			// check if there is an element with id "create-issue-dialog"
			if (document.querySelector("#create-issue-dialog") == null) {
				location.reload()
			} else {
				if (localStorage.getItem("ex_debugMode") == "true")
					console.log('did not refresh because "Create Issue" dialog is open')
			}
		}, interval * 1000)

		// log to console if debug mode is enabled
		if (localStorage.getItem("ex_debugMode") == "true")
			console.log("Refreshing dashboard every " + interval + " seconds")
	}
}
