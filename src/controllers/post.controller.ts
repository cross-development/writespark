// Packages
import { inject, injectable } from 'inversify';
// Controllers
import { BaseController } from './abstractions/base.controller';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IPostController } from './abstractions/post.controller.interface';
import { IPostService } from '../services/abstractions/post.service.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';

/**
 * A post controller is used to perform CRUD operations with posts
 */
@injectable()
export class PostController extends BaseController implements IPostController {
	constructor(
		@inject(TYPES.IPostService) private readonly postService: IPostService,
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
	) {
		super(loggerService);
	}
}
