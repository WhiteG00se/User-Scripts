declare global {
	interface Element {
		click(): void
		innerText: string
		checked: boolean
		value: string
		style: CSSStyleDeclaration
	}
}

export {}
