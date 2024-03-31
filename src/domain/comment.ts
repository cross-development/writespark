/**
 * A comment entity used to create a comment object
 */
export class Comment {
	constructor(
		private readonly _body: string,
		private readonly _postId: number,
		private readonly _authorId: number,
	) {}

	public get body(): string {
		return this._body;
	}

	public get postId(): number {
		return this._postId;
	}

	public get authorId(): number {
		return this._authorId;
	}
}
