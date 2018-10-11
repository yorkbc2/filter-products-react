/**
 * Part from number (pfn)
 * @param  {number} n Maximum value
 * @param  {number} p The part of the value
 * @return {number}   The part number
 */
export const pfn = (n, p) => n * p / 100;

/**
 * Procent to number
 * @param  {number} n  Maximum Value
 * @param  {number} pn Part number from maxium
 * @return {number}    procents
 */
export const ntp = (n, pn) => pn * n / 100;

/**
 * Procent from part
 * @param  {number} n  Maximum Value
 * @param  {number} pn Part number from maxium
 * @return {number}    procents
 */
export const pft = (n, pn) => pn * 100 / n;

export const _qs = (function (){
	return {
		cache: {},
		$: function(selector) {
			return typeof this.cache[selector] === 'undefined'?
				this.cache[selector] = document.querySelectorAll(selector):
				this.cache[selector];
		}
	}
}());