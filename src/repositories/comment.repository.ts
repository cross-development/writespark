// Packages
import { inject, injectable } from 'inversify';
// Persistence
import { CommentModel } from '@prisma/client';
// Domain
import { Comment } from '../domain/comment';
// Services
import { PrismaService } from '../persistence/prisma.service';
// Constants
import { TYPES } from '../constants/types';
// Types
import { ICommentRepository } from './abstractions/comment.repository.interface';

/**
 * A comment repository that interacts with a comment model in the database
 */
@injectable()
export class CommentRepository implements ICommentRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	/**
	 * Method is used to create a new comment
	 * @param data - A comment entity
	 * @returns A new comment
	 */
	public create(data: Comment): Promise<CommentModel> {
		const { authorId, postId, body } = data;

		return this.prismaService.client.commentModel.create({ data: { authorId, postId, body } });
	}
}
