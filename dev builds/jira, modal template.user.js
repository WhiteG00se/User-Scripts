// ==UserScript==
// @name         jira, modal template
// @description  jira, modal template
// @version      1.0
// @author       Tobias L
// @include      */jira.*/browse*
// @include      */jira/*/browse*
// @include      *.jira.*/browse*
// @license      GPL-3.0-only
// @namespace    https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==

loadModal()

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
