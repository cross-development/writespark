// Packages
import { inject, injectable } from 'inversify';
// Domain
import { Comment } from '../domain/comment';
// Dto
import { CreateCommentDto } from '../dto/create-comment.dto';
// Repositories
import { CommentRepository } from '../repositories/comment.repository';
// Constants
import { TYPES } from '../constants/types';
// Types
import { TCommentModel } from '../types/comment.types';
import { ICommentService } from './abstractions/comment.service.interface';

/**
 * Comment service is used to interact with the comment repository
 */
@injectable()
export class CommentService implements ICommentService {
	constructor(@inject(TYPES.ICommentRepository) private readonly commentRepository: CommentRepository) {}

	/**
	 * Method is used to create a new comment
	 * @param authorId - An author id
	 * @param postId - A post id
	 * @param dto - Create comment dto
	 * @returns A new comment if it has been created successfully. Otherwise null
	 */
	public async createComment(authorId: number, postId: number, dto: CreateCommentDto): Promise<TCommentModel> {
		const newComment = new Comment(dto.body, postId, authorId);

		return this.commentRepository.create(newComment);
	}
}
