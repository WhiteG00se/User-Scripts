// ==UserScript==
// @name         Hide YouTube Shorts
// @version      1.0
// @author       Tobias L
// @match        https://www.youtube.com/*
// @license      GPL-3.0-only
// @namespace    https://github.com/WhiteG00se/User-Scripts
// @run-at       document-end
// @grant        none

// ==/UserScript==

async function init() {
	const style = document.createElement("style")
	style.textContent = `
    /* hide any direct /shorts/ links */
    a[href*="/shorts/"] { display: none !important }
  `
	document.head.appendChild(style)

	const removeShortsShelves = () => {
		document.querySelectorAll("ytd-rich-shelf-renderer").forEach((shelf) => {
			const title = shelf.querySelector("#title")
			if (title?.textContent.trim() === "Shorts") {
				shelf.remove()
			}
		})
	}

	removeShortsShelves()

	new MutationObserver(removeShortsShelves).observe(document.body, { childList: true, subtree: true })
}

init()
