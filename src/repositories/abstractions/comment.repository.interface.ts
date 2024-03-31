// Domain
import { Comment } from '../../domain/comment';
// Types
import { TCommentModel } from '../../types/comment.types';

export interface ICommentRepository {
	create(data: Comment): Promise<TCommentModel>;
}
