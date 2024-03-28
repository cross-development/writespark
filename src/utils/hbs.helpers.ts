import dateFns from 'date-fns';

/**
 * Some helpers for the Handlebars engine
 */
export const hbsHelpers = {
	dateFormat(date: string, format: string): string {
		return dateFns.format(date, format);
	},
	ifEqual(a: string, b: string, options: any): boolean {
		if (Number(a) === Number(b)) {
			return options.fn(this);
		}

		return options.inverse(this);
	},
	cutString(text: string, length: string): string {
		const ending = text.length <= +length ? '' : '...';

		return text.slice(0, +length) + ending;
	},
	getArrayLength(array: unknown[]): number {
		return array?.length;
	},
};
