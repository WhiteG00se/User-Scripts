// ==UserScript==
// @name jira, improve ticket page dev build
// @description load all comments by default, add buttons to collapse or expand them
// @version 2.0
// @author Tobias L
// @include */jira.*/browse*
// @include */jira/*/browse*
// @include *.jira.*/browse*
// @license GPL-3.0-only
// @namespace https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==
ex_loadModal()
ex_loadAllCommentsDuringPageLoad()
ex_loadUI()
ex_restoreUI()
ex_commentOrder()
function ex_loadModal() {
	//load ex_modalButton into nav bar + add event listener to open modal
	let ex_modalButton = `<button id="ex_modalButton">
	<h3>&#9889</h3>
</button>`
	document.querySelector("#quicksearch-menu").insertAdjacentHTML("afterend", ex_modalButton)
	document.querySelector("#ex_modalButton").addEventListener("click", function () {
		document.querySelector("#ex_modal").style.display = "block"
		document.querySelector(".aui-blanket").removeAttribute("hidden")
	})
	//load modal into page with "display: none" + add event listener to cancel button
	let modal = `<span id="ex_modal" style="display: none">
	<section class="aui-layer aui-dialog2 aui-dialog2-large" open="" style="z-index: 3000;" tabindex="-1">
		<header class="aui-dialog2-header">
			<h2 class="aui-dialog2-header-main">Title</h2>
		</header>
		<div class="aui-dialog2-content">
			<form>
				<table>
					<tr>
						<td>
							load all comments <abbr title="when the ticket page is loaded"> right away</abbr>
						</td>
						<td>
							<input type="checkbox" id="ex_shouldLoadAllCommentsDuringPageLoad">
						</td>
					</tr>
					<tr>
						<td>
							show buttons to expand/collapse comments
						</td>
						<td>
							<input type="checkbox" id="ex_showExpandCollapseButtons">
						</td>
					</tr>
					<tr>
						<td>
							default comment order
						</td>
						<td>
							<select id="ex_commentOrder">
								<option value="newestFirst">newest first</option>
								<option value="oldestFirst">oldest first</option>
								<option value="jiraDefault">jira default</option>
							</select>
						</td>
					</tr>
				</table>
			</form>
		</div>
		<footer class="aui-dialog2-footer">
			<div class="aui-dialog2-footer-actions">
				<button id="ex_modal-submit-button" class="aui-button aui-button-primary" resolved="">Submit</button>
				<button id="ex_modal-close-button" class="aui-button aui-button-link" resolved="">Cancel</button>
			</div>
			<div class="aui-dialog2-footer-hint">Made by Tobias L</div>
		</footer>
	</section>
</span>
<div aria-hidden="true" class="aui-blanket" tabindex="0" hidden=""></div>`
	document.querySelector("body").insertAdjacentHTML("beforeend", modal)
	document.querySelector("#ex_modal-close-button").addEventListener("click", function () {
		document.querySelector("#ex_modal").style.display = "none"
		document.querySelector(".aui-blanket").setAttribute("hidden", "")
	})
	//add event listener to submit button
	document.querySelector("#ex_modal-submit-button").addEventListener("click", function () {
		//set localStorage
		localStorage.setItem(
			"ex_shouldLoadAllCommentsDuringPageLoad",
			document.querySelector("#ex_shouldLoadAllCommentsDuringPageLoad").checked
		)
		localStorage.setItem(
			"ex_showExpandCollapseButtons",
			document.querySelector("#ex_showExpandCollapseButtons").checked
		)
		localStorage.setItem("ex_commentOrder", document.querySelector("#ex_commentOrder").value)
		//reload page
		location.reload()
	})
	//load values from localStorage to modal
	document.querySelector("#ex_shouldLoadAllCommentsDuringPageLoad").checked =
		localStorage.getItem("ex_shouldLoadAllCommentsDuringPageLoad") == "true" ? true : false
	document.querySelector("#ex_showExpandCollapseButtons").checked =
		localStorage.getItem("ex_showExpandCollapseButtons") == "true" ? true : false
	document.querySelector("#ex_commentOrder").value = localStorage.getItem("ex_commentOrder")
}
function ex_loadUI() {
	if (document.querySelector("#ex_expandCollapseButtons") == null) {
		document.querySelector("#activitymodule_heading h4").outerHTML += `<span id="ex_expandCollapseButtons"></span>`
		let ex_expandCollapseButtons = document.querySelector("#ex_expandCollapseButtons")
		ex_expandCollapseButtons.innerHTML = `<button id="ex_expandComments">expand all</button> <button
	id="ex_collapseComments">collapse all</button>`
		document.querySelector("#ex_collapseComments").addEventListener("click", ex_collapseComments)
		document.querySelector("#ex_expandComments").addEventListener("click", ex_expandComments)
	}
}
function ex_restoreUI() {
	const ex_monitoredNode = document.querySelector("body")
	const ex_mutationObserver = new MutationObserver((entries) => {
		console.log(entries)
		ex_loadUI()
	})
	ex_mutationObserver.observe(ex_monitoredNode, { childList: true, subtree: true })
}
function ex_collapseComments() {
	document.querySelectorAll(".twixi-block").forEach(function (currentValue) {
		currentValue.classList.remove("expanded")
		currentValue.classList.add("collapsed")
	})
}
function ex_expandComments() {
	document.querySelectorAll(".twixi-block").forEach(function (currentValue) {
		currentValue.classList.remove("collapsed")
		currentValue.classList.add("expanded")
	})
}
function ex_loadAllCommentsDuringPageLoad() {
	if (localStorage.getItem("ex_shouldLoadAllCommentsDuringPageLoad") != "true") return
	const clickHere = document.getElementsByClassName("collapsed-comments")[0]
	if (clickHere == null) return //guard clause
	clickHere.click()
}
function ex_commentOrder() {
	let ex_orderButton
	switch (localStorage.getItem("ex_commentOrder")) {
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
