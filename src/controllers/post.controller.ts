// Packages
import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
// Controllers
import { BaseController } from './abstractions/base.controller';
// Middleware
import { ValidateMiddleware } from '../middleware/validate.middleware';
// Exceptions
import { BusinessException } from '../exceptions/business-exception';
// Dto
import { CreatePostDto } from '../dto/create-post.dto';
import { RequestParamsDto } from '../dto/request-params.dto';
// Constants
import { TYPES } from '../constants/types';
import { StatusCode } from '../constants/status-code.enum';
// Types
import { TRequest } from './abstractions/route.interface';
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
				handler: this.getAllPosts,
				middleware: [],
			},
			{
				path: '/:id',
				method: 'get',
				handler: this.getOnePost,
				middleware: [new ValidateMiddleware(RequestParamsDto, 'params')],
			},
			{
				path: '/',
				method: 'post',
				handler: this.createPost,
				middleware: [new ValidateMiddleware(CreatePostDto)],
			},
			{
				path: '/:id',
				method: 'delete',
				handler: this.deletePost,
				middleware: [new ValidateMiddleware(RequestParamsDto, 'params')],
			},
		]);
	}

	/**
	 * Method is used to get the list of posts
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 */
	public async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
		const posts = await this.postService.getAllPosts();

		this.ok(res, posts);
	}

	/**
	 * Method is used to get a post by its id
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If there is no post for the provided id, the business exception is returned
	 */
	public async getOnePost(req: Request, res: Response, next: NextFunction): Promise<void> {
		const post = await this.postService.getPostById(Number(req.params.id));

		if (!post) {
			return next(new BusinessException(StatusCode.NotFound, 'Post not found', '[PostController]'));
		}

		this.ok(res, post);
	}

	/**
	 * Method is used to create a new post
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If there is a post for the provided title, the business exception is returned
	 */
	public async createPost(req: TRequest<CreatePostDto>, res: Response, next: NextFunction): Promise<void> {
		const newPost = await this.postService.createPost(req.user.id, req.body);

		if (!newPost) {
			return next(new BusinessException(StatusCode.Conflict, 'Post already exists', '[PostController]'));
		}

		this.created(res, newPost);
	}

	/**
	 * Method is used to delete a post by its id
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If there is no post for the provided id, the business exception is returned
	 */
	public async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
		const deletedPost = await this.postService.deletePost(Number(req.params.id));

		if (!deletedPost) {
			return next(new BusinessException(StatusCode.NotFound, 'Post not found', '[PostController]'));
		}

		this.ok(res, { id: deletedPost.id });
	}
}
