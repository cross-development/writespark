// Packages
import { inject, injectable } from 'inversify';
// Persistence
import { PostModel } from '@prisma/client';
// Domain
import { Post } from '../domain/post';
// Services
import { PrismaService } from '../persistence/prisma.service';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IPostRepository, TPostParams } from './abstractions/post.repository.interface';

/**
 * A post repository that interacts with a post model in the database
 */
@injectable()
export class PostRepository implements IPostRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	/**
	 * Method is used to get all posts
	 * @returns A list of all posts
	 */
	public getAll(): Promise<PostModel[]> {
		// TODO: add query builder implementation
		return this.prismaService.client.postModel.findMany();
	}

	/**
	 * Method is used to get one post by its id
	 * @param params - A query params (some fields of the post to find by)
	 * @returns A post or null if the post doesn't exist
	 */
	public getOne(params: TPostParams): Promise<PostModel | null> {
		return this.prismaService.client.postModel.findUnique({ where: params });
	}

	/**
	 * Method is used to create a new post
	 * @param data - A post entity
	 * @returns A new post
	 */
	public create(data: Post): Promise<PostModel> {
		return this.prismaService.client.postModel.create({ data });
	}

	/**
	 * Method is used to delete a post by its id
	 * @param id - A post id
	 * @returns A deleted post
	 */
	public delete(id: number): Promise<PostModel> {
		return this.prismaService.client.postModel.delete({ where: { id } });
	}
}
