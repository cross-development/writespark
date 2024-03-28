// Persistence
import { CommentModel } from '@prisma/client';
// Domain
import { Comment } from '../../domain/comment';

export interface ICommentRepository {
	create(data: Comment): Promise<CommentModel>;
}
