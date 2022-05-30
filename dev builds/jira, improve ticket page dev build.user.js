// ==UserScript==
// @name         jira, improve ticket page
// @description  load all comments by default, add buttons to collapse or expand them
// @version      2.0
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

// create a class to store collapse, expand and commentOrder


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
function loadModal() {
	//load modalButton into nav bar + add event listener to open modal
	let modalButton = `<button id="modalButton">
   <h3>&#9889</h3>
</button>`
	document.querySelector("#quicksearch-menu").insertAdjacentHTML("afterend", modalButton)
	document.querySelector("#modalButton").addEventListener("click", function () {
		document.querySelector("#extensionModal").style.display = "block"
		document.querySelector(".aui-blanket").removeAttribute("hidden")
	})
	//load modal into page with "display: none" + add event listener to for cancel button
	let modal = `<span id="extensionModal" style="display: none">
   <section class="aui-layer aui-dialog2 aui-dialog2-large" open="" style="z-index: 3000;" tabindex="-1">
      <header class="aui-dialog2-header">
         <h2 class="aui-dialog2-header-main">Title</h2>
      </header>
      <div class="aui-dialog2-content">
         Body
      </div>
      <footer class="aui-dialog2-footer">
         <div class="aui-dialog2-footer-actions">
            <button id="extensionModal-submit-button" class="aui-button aui-button-primary" resolved="">Submit</button>
            <button id="extensionModal-close-button" class="aui-button aui-button-link" resolved="">Cancel</button>
         </div>
         <div class="aui-dialog2-footer-hint">Made by Tobias L</div>
      </footer>
   </section>
</span>
<div aria-hidden="true" class="aui-blanket" tabindex="0" hidden=""></div>`
	document.querySelector("body").insertAdjacentHTML("beforeend", modal)
	document.querySelector("#extensionModal-close-button").addEventListener("click", function () {
		document.querySelector("#extensionModal").style.display = "none"
		document.querySelector(".aui-blanket").setAttribute("hidden", "")
	})
}
