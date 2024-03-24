// Packages
import { inject, injectable } from 'inversify';
import { Response, NextFunction, Request } from 'express';
// Controllers
import { BaseController } from './abstractions/base.controller';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IHomeController } from './abstractions/home.controller.interface';
import { IPostService } from '../services/abstractions/post.service.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';

/**
 * A home controller is used to perform some CRUD operations and render its views
 */
@injectable()
export class HomeController extends BaseController implements IHomeController {
	constructor(
		@inject(TYPES.IPostService) private readonly postService: IPostService,
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
	) {
		super(loggerService);

		this.registerRoutes();
	}

	/**
	 * Method is used to define and bind all endpoints in the controller
	 */
	private registerRoutes(): void {
		this.bindRoutes([
			{
				path: '/',
				method: 'get',
				handler: this.renderFeed,
			},
		]);
	}

	/**
	 * Method is used to render home page (feed)
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If there is no post for the provided id, the business exception is returned
	 */
	public async renderFeed(req: Request, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
		const posts = await this.postService.getPosts();

		return res.render('index', { posts });
	}
}
