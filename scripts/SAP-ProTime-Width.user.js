// ==UserScript==
// @name         SAP-ProTime-Width
// @description  SAP-ProTime-Width
// @version      1.2
// @author       Tobias L
// @match        https://fxp-erp.all-for-one.com/sap/bc/webdynpro/ppa/time_rel*
// @license      GPL-3.0-only
// @namespace    https://github.com/WhiteG00se/User-Scripts
// ==/UserScript==

var tableWidth = "95%"

const observer = new MutationObserver(() => {
	console.log("childList of body changed")
	fixWidth(tableWidth)
})

observer.observe(document.body, { childList: true, subtree: true })

function fixWidth(tableWidth) {
	let button = document.querySelector(".lsButton--focusable.lsButton--up.lsButton--design-standard")
	if (button && (button.innerText == "Release all documents" || button.innerText == "Alle Sätze freigeben")) {
		document.querySelectorAll("table").forEach((table) => {
			table.style.width = "100%"
		})
		document.querySelector(".lsPanel.lsPanel--padless.urGrpWhlWeb1").width = tableWidth
	}
}
