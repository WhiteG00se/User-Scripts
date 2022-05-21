// ==UserScript==
// @name         jira, improve dashboard
// @description  injects new UI into the dashboard with additional settings
// @version      3.0
// @author       Tobias L
// @include      */jira.*/Dashboard*
// @include      */jira/*/Dashboard*
// @include      *.jira.*/Dashboard*
// @license      GPL-3.0-only
// @namespace    https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==

loadUI()
changeRefreshInterval()
changeSidebar()
addEventListeners()

function loadUI() {
	//add extensionUI div after dashboard title
	document.getElementsByClassName("aui-page-header-inner")[0].outerHTML += `<div id="extensionUI" ></div>`
	//add extensionMeta div to head
	document.getElementsByTagName("head")[0].innerHTML += `<div id="extensionMeta" > </div>`
	//load extensionForm into extensionUI
	const extensionFrom = `<form id="extensionFrom">
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
	document.getElementById("extensionUI").innerHTML = extensionFrom
	//load local storage to UI
	document.getElementById("extensionRefreshInterval").value = localStorage.getItem("extensionRefreshInterval")
	const extensionRemoveSidebarBool = localStorage.getItem("extensionRemoveSidebar") === "true"
	document.getElementById("extensionRemoveSidebar").checked = extensionRemoveSidebarBool
}
function addEventListeners() {
	document.getElementById("extensionFrom").onsubmit = (event) => {
		event.preventDefault()
	}
	document.getElementById("extensionRefreshInterval").onchange = (event) => {
		writeFormToLocalStorage()
		changeRefreshInterval()
	}
	document.getElementById("extensionRemoveSidebar").onclick = (event) => {
		writeFormToLocalStorage()
		window.location.reload()
	}
}

function changeRefreshInterval() {
	const extensionRefreshInterval = localStorage.getItem("extensionRefreshInterval")
	document.getElementById(
		"extensionMeta"
	).innerHTML = `<meta http-equiv="refresh" content="${extensionRefreshInterval}">`
	//make text light up golden to indicate that changes were successful
	let label = document.querySelector('[for="extensionRefreshInterval"]')
	label.style.color = "goldenrod"
	setTimeout(function () {
		label.style.color = "black"
	}, 1000)
}
function changeSidebar() {
	if (localStorage.getItem("extensionRemoveSidebar") == "true") {
		document.querySelector("#dashboard .dashboard-tabs").remove()
	}
}

function writeFormToLocalStorage() {
	localStorage.setItem("extensionRefreshInterval", document.getElementById("extensionRefreshInterval").value)
	localStorage.setItem("extensionRemoveSidebar", document.getElementById("extensionRemoveSidebar").checked)
}
