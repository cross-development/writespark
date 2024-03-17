// Packages
import { injectable } from 'inversify';
// Types
import { ICommentService } from './abstractions/comment.service.interface';

@injectable()
export class CommentService implements ICommentService {}
