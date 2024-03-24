/**
 * Some helpers for the Handlebars engine
 */
export const hbsHelpers = {
	dateFormat(date: string): string {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(new Date(date));
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
};
