// Dto
import { CreatePostDto } from '../../dto/create-post.dto';
// Types
import { TPostModel } from '../../types/post.types';

export interface IPostService {
	getPosts(authorId?: number): Promise<TPostModel[]>;
	getPostById(id: number): Promise<TPostModel | null>;
	createPost(authorId: number, dto: CreatePostDto): Promise<TPostModel | null>;
	deletePost(id: number): Promise<TPostModel | null>;
}
