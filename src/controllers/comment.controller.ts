// Packages
import { inject, injectable } from 'inversify';
// Controllers
import { BaseController } from './abstractions/base.controller';
// Constants
import { TYPES } from '../constants/types';
// Types
import { ICommentController } from './abstractions/comment.controller.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';
import { ICommentService } from '../services/abstractions/comment.service.interface';

/**
 * A comment controller is used to perform CRUD operations with comments
 */
@injectable()
export class CommentController extends BaseController implements ICommentController {
	constructor(
		@inject(TYPES.ICommentService) private readonly postService: ICommentService,
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
	) {
		super(loggerService);
	}
}
