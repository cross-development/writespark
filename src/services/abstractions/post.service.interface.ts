// Persistence
import { PostModel } from '@prisma/client';
// Dto
import { CreatePostDto } from '../../dto/create-post.dto';

export interface IPostService {
	getPosts(authorId?: number): Promise<PostModel[]>;
	getPostById(id: number): Promise<PostModel | null>;
	createPost(authorId: number, dto: CreatePostDto): Promise<PostModel | null>;
	deletePost(id: number): Promise<PostModel | null>;
}
