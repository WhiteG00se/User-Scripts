// ==UserScript==
// @name         Poet Jira Dashboard Rewrite
// @description  injects new UI into the dashboard with additional settings
// @version      2.4
// @author       Tobias
// @include      */jira.*/secure/Dashboard*
// @include      */jira/*/secure/Dashboard*
// @include      *.jira.*/secure/Dashboard*
// @license      GNU
// @namespace    http://tampermonkey.net/
// ==/UserScript==

setTimeout(function () {
	wrap()
	loadUI()
	performChanges()
}, 200)

function wrap() {
	//wrap <div> around 1st <h1>
	document.getElementsByClassName("aui-page-header-inner")[0].outerHTML += `<div id="extensionUI" ></div>`
	//add <div> to head
	document.getElementsByTagName("head")[0].innerHTML += `<div id="extensionMeta" > </div>`
	// add id to sidebar
	document.getElementsByClassName("dashboard-tabs tabs vertical")[0].setAttribute("id", "sidebar")
}
function loadUI() {
	//add the UI to the <div>
	document.getElementById("extensionUI").innerHTML += `<form id="extensionFrom">
				<select id="extensionRefreshInterval">
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
				<label for="extensionRefreshInterval">minutes (refresh interval)</label>
				<br>
				<input id="extensionRemoveSidebar" type="checkbox">
				<label for="extensionRemoveSidebar">remove sidebar?</label>
			</form>`
	//load local storage to UI
	document.getElementById("extensionRefreshInterval").value = localStorage.getItem("extensionRefreshInterval")
	const extensionRemoveSidebarBool = localStorage.getItem("extensionRemoveSidebar") === "true"
	document.getElementById("extensionRemoveSidebar").checked = extensionRemoveSidebarBool
	//disable submit just in case
	document.getElementById("extensionFrom").onsubmit = (event) => {
		event.preventDefault()
	}
	//add functions to UI
	document.getElementById("extensionRefreshInterval").onchange = (event) => {
		writeFormToLocalStorage()
		performChanges()
	}
	document.getElementById("extensionRemoveSidebar").onclick = (event) => {
		writeFormToLocalStorage()
		performChanges()
	}
}
function performChanges() {
	const extensionRefreshInterval = localStorage.getItem("extensionRefreshInterval")
	document.getElementById(
		"extensionMeta"
	).innerHTML = `<meta http-equiv="refresh" content="${extensionRefreshInterval}">`
	if (localStorage.getItem("extensionRemoveSidebar") == "true") {
		document.getElementById("sidebar").style.display = "none"
		document.getElementById("main").style.marginLeft = "0px"
	} else {
		document.getElementById("sidebar").style.display = "initial"
		document.getElementById("main").style.marginLeft = ""
	}
}
function writeFormToLocalStorage() {
	localStorage.setItem("extensionRefreshInterval", document.getElementById("extensionRefreshInterval").value)
	localStorage.setItem("extensionRemoveSidebar", document.getElementById("extensionRemoveSidebar").checked)
}
