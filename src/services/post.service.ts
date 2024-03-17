// Packages
import { injectable } from 'inversify';
// Types
import { IPostService } from './abstractions/post.service.interface';

@injectable()
export class PostService implements IPostService {}
