// Persistance
import { CommentModel } from '@prisma/client';
// Dto
import { CreateCommentDto } from '../../dto/create-comment.dto';

export interface ICommentService {
	createComment(authorId: number, postId: number, dto: CreateCommentDto): Promise<CommentModel>;
}
