import dateFns from 'date-fns';

/**
 * Some helpers for the Handlebars engine
 */
export const hbsHelpers = {
	/**
	 * Method is used to format date using a specific format.
	 * @param date - The original date
	 * @param format - The string of tokens
	 * @returns The formatted date string
	 */
	dateFormat(date: string, format: string): string {
		return dateFns.format(date, format);
	},

	/**
	 * Method is used to compare two strings
	 * @param a - First argument for comparison
	 * @param b - Second argument for comparison
	 * @param options - Handlebars options
	 * @returns True if the arguments are equal. Otherwise false.
	 */
	ifEqual(a: string, b: string, options: any): boolean {
		if (a == b) {
			return options.fn(this);
		}

		return options.inverse(this);
	},

	/**
	 * Method is used to trim the string to the desired length
	 * @param text - Any text to trim
	 * @param length - Desired length
	 * @returns - A trimmed string
	 */
	cutString(text: string, length: string): string {
		const desiredLength = Number(length || 0);
		const ending = text?.length || 0 <= desiredLength ? '' : '...';

		return text.slice(0, desiredLength) + ending;
	},

	/**
	 * Method is used to get array length
	 * @param array - Any array
	 * @returns The number of all elements in the array
	 */
	getArrayLength(array: unknown[]): number {
		return array?.length || 0;
	},
};
