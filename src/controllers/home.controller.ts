// Packages
import { inject, injectable } from 'inversify';
// Controllers
import { BaseController } from './abstractions/base.controller';
// Constants
import { TYPES } from '../constants/types';
// Types
import { TRequest, TResponse } from './abstractions/route.interface';
import { IHomeController } from './abstractions/home.controller.interface';
import { IPostService } from '../services/abstractions/post.service.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';
import { IUserService } from '../services/abstractions/user.service.interface';

/**
 * A home controller is used to perform some CRUD operations and render its views
 */
@injectable()
export class HomeController extends BaseController implements IHomeController {
	constructor(
		@inject(TYPES.IPostService) private readonly postService: IPostService,
		@inject(TYPES.IUserService) private readonly userService: IUserService,
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
			{
				path: '/400',
				method: 'get',
				handler: this.renderBadRequest,
			},
			{
				path: '/404',
				method: 'get',
				handler: this.renderNotFound,
			},
		]);
	}

	/**
	 * Method is used to render home view (feed)
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async renderFeed(req: TRequest, res: TResponse): Promise<void> {
		const posts = await this.postService.getPosts();

		const topUsers = await this.userService.getTopUsers();

		const postsByCategories = {
			top: posts[0],
			trending: posts.slice(1, 3),
			latest: posts.slice(3),
		};

		return res.render('index', { posts: postsByCategories, topUsers });
	}

	/**
	 * Method is used to render a bad request view
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async renderBadRequest(req: TRequest, res: TResponse): Promise<void> {
		return res.render('400');
	}

	/**
	 * Method is used to render a not found view
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async renderNotFound(req: TRequest, res: TResponse): Promise<void> {
		return res.render('404');
	}
}
