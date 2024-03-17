// Packages
import { injectable } from 'inversify';
// Types
import { IPostRepository } from './abstractions/post.repository.interface';

@injectable()
export class PostRepository implements IPostRepository {}
