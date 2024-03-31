/**
 * A post entity used to create a post object
 */
export class Post {
	constructor(
		private readonly _title: string,
		private readonly _content: string,
		private readonly _authorId: number,
	) {}

	public get title(): string {
		return this._title;
	}

	public get content(): string {
		return this._content;
	}

	public get authorId(): number {
		return this._authorId;
	}
}
