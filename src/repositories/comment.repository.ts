// Packages
import { injectable } from 'inversify';
// Types
import { ICommentRepository } from './abstractions/comment.repository.interface';

@injectable()
export class CommentRepository implements ICommentRepository {}
