// Dto
import { CreateCommentDto } from '../../dto/create-comment.dto';
// Types
import { TCommentModel } from '../../types/comment.types';

export interface ICommentService {
	createComment(authorId: number, postId: number, dto: CreateCommentDto): Promise<TCommentModel>;
}
