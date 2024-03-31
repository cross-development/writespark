// Domain
import { Post } from '../../domain/post';
// Types
import { TPostModel, TPostParams } from '../../types/post.types';

export interface IPostRepository {
	getAll(authorId?: number): Promise<TPostModel[]>;
	getOne(params: TPostParams): Promise<TPostModel | null>;
	create(data: Post): Promise<TPostModel>;
	delete(id: number): Promise<TPostModel>;
}
