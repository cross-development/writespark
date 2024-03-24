// Packages
import { inject, injectable } from 'inversify';
// Persistence
import { PostModel } from '@prisma/client';
// Domain
import { Post } from '../domain/post';
// Dto
import { CreatePostDto } from '../dto/create-post.dto';
// Repositories
import { PostRepository } from '../repositories/post.repository';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IPostService } from './abstractions/post.service.interface';

/**
 * Post service is used to interact with the post repository
 */
@injectable()
export class PostService implements IPostService {
	constructor(@inject(TYPES.IPostRepository) private readonly postRepository: PostRepository) {}

	/**
	 * Method is used to get the list of posts including author info and comments
	 * @param authorId - An author id
	 * @returns A list of all posts including author info and comments
	 */
	public async getPosts(authorId?: number): Promise<PostModel[]> {
		return this.postRepository.getAll(authorId);
	}

	/**
	 * Method is used to get a post by its id including author info and comments
	 * @param id - A post id
	 * @returns Post or null if the post has not been found
	 */
	public async getPostById(id: number): Promise<PostModel | null> {
		return this.postRepository.getOne({ id });
	}

	/**
	 * Method is used to create a new post
	 * @param authorId - An author id
	 * @param dto - Create post dto
	 * @returns A new post if it has been created successfully. Otherwise null
	 */
	public async createPost(authorId: number, dto: CreatePostDto): Promise<PostModel | null> {
		const { title, content } = dto;

		const existingPost = await this.postRepository.getOne({ title });

		if (existingPost) {
			return null;
		}

		const newPost = new Post(title, content, authorId);

		return this.postRepository.create(newPost);
	}

	/**
	 * Method is used to delete a post by its id
	 * @param id - A post Id
	 * @returns A post if it has been deleted successfully. Otherwise null
	 */
	public async deletePost(id: number): Promise<PostModel | null> {
		const post = await this.postRepository.getOne({ id });

		if (!post) {
			return null;
		}

		return this.postRepository.delete(id);
	}
}
