// ==UserScript==
// @name         Poet Jira Dashboard 2.0 dev build
// @description  injects new UI into the dashboard with additional settings
// @version      3.0
// @author       Tobias
// @match        https://jira.poet.de/secure/Dashboard*
// @license      GNU
// @namespace    http://tampermonkey.net/
// @require      https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js
// @run-at       document-end
// ==/UserScript==

prepare()
performChanges()
setTimeout(function () {
	loadUI()
}, 50) // adding delay to avoid problems with Ajax

function prepare() {
	//add <div> after 1st <h1>
	document.getElementsByTagName("h1")[0].outerHTML += `<div 1 id="extensionUI" > </div>`
	//add <div> to head
	document.getElementsByTagName("head")[0].innerHTML += `<div id="extensionMeta" > </div>`
	// add id to sidebar
	document.getElementsByClassName("dashboard-tabs tabs vertical")[0].setAttribute("id", "sidebar")
}
function loadUI() {
	//add the UI to the <div>
	document.getElementById("extensionUI").innerHTML = `<form id="extensionFrom">
         <select id="refreshInterval">
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
            <option value="0">don't</option>
         </select>
         <label for="refreshInterval">minutes refresh interval</label>
         <br>
         <input id="removeSidebar" type="checkbox">
         <label for="removeSidebar">remove sidebar?</label>
      </form>`
	//load cookies to UI
	document.getElementById("refreshInterval").value = Cookies.get("refreshInterval")
	const removeSidebarBool = Cookies.get("removeSidebar") === "true"
	document.getElementById("removeSidebar").checked = removeSidebarBool
	//disable submit just in case
	document.getElementById("extensionFrom").onsubmit = function () {
		event.preventDefault()
	}
	//add functions to UI
	document.getElementById("refreshInterval").onchange = function () {
		writeFormToCookies()
		performChanges()
		loadUI()
	}
	document.getElementById("removeSidebar").onclick = function () {
		writeFormToCookies()
		performChanges()
		loadUI()
	}
	//make text light up golden to indicate that changes were successful
	document.getElementById("extensionFrom").style.color = "goldenrod"
	setTimeout(function () {
		document.getElementById("extensionFrom").style.color = "black"
	}, 1000)
}
function performChanges() {
	const refreshInterval = Cookies.get("refreshInterval")
	if (refreshInterval != "0") {
		document.getElementById("extensionMeta").innerHTML = `<meta http-equiv="refresh" content="${refreshInterval}">`
	} else {
		document.getElementById("extensionMeta").innerHTML = ``
	}
	if (Cookies.get("removeSidebar") == "true") {
		document.getElementById("sidebar").style.display = "none"
		document.getElementById("main").style.marginLeft = "0px"
	} else {
		document.getElementById("sidebar").style.display = "initial"
		document.getElementById("main").style.marginLeft = ""
	}
}
function writeFormToCookies() {
	Cookies.set("refreshInterval", document.getElementById("refreshInterval").value, { expires: 9999 })
	Cookies.set("removeSidebar", document.getElementById("removeSidebar").checked, { expires: 9999 })
}

