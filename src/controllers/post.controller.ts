// Packages
import { inject, injectable } from 'inversify';
import { Response, NextFunction } from 'express';
// Controllers
import { BaseController } from './abstractions/base.controller';
// Middleware
import { AuthGuard } from '../middleware/auth.guard';
import { ValidateMiddleware } from '../middleware/validate.middleware';
// Exceptions
import { BusinessException } from '../exceptions/business-exception';
// Dto
import { CreatePostDto } from '../dto/create-post.dto';
import { RequestParamsDto } from '../dto/request-params.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
// Constants
import { TYPES } from '../constants/types';
import { StatusCode } from '../constants/status-code.enum';
// Types
import { IPostController } from './abstractions/post.controller.interface';
import { IPostService } from '../services/abstractions/post.service.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';
import { ICommentService } from '../services/abstractions/comment.service.interface';
import { TRequestWithBody, TRequestWithParams, TRequest, TRequestWithParamsAndBody } from './abstractions/route.interface';

/**
 * A post controller is used to perform CRUD operations with posts and render its views
 */
@injectable()
export class PostController extends BaseController implements IPostController {
	constructor(
		@inject(TYPES.IPostService) private readonly postService: IPostService,
		@inject(TYPES.ICommentService) private readonly commentService: ICommentService,
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
				handler: this.getPosts,
			},
			{
				path: '/:id',
				method: 'get',
				handler: this.getPostById,
				middleware: [new ValidateMiddleware(RequestParamsDto, 'params')],
			},
			{
				path: '/:id',
				method: 'post',
				handler: this.createComment,
				middleware: [
					new AuthGuard(),
					new ValidateMiddleware(RequestParamsDto, 'params'),
					new ValidateMiddleware(CreateCommentDto),
				],
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
	public async getPosts(req: TRequest, res: Response): Promise<void> {
		const posts = await this.postService.getPosts();

		this.ok(res, posts);
	}

	/**
	 * Method is used to get a post by its id
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If there is no post for the provided id, the business exception is returned
	 */
	public async getPostById(req: TRequestWithParams<RequestParamsDto>, res: Response): Promise<void> {
		const post = await this.postService.getPostById(Number(req.params.id));

		if (!post) {
			return res.status(StatusCode.NotFound).render('404');
		}

		return res.render('post', { post });
	}

	/**
	 * Method is used to create a new post
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If there is a post for the provided title, the business exception is returned
	 */
	public async createPost(req: TRequestWithBody<CreatePostDto>, res: Response, next: NextFunction): Promise<void> {
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
	public async deletePost(req: TRequestWithParams<RequestParamsDto>, res: Response, next: NextFunction): Promise<void> {
		const deletedPost = await this.postService.deletePost(Number(req.params.id));

		if (!deletedPost) {
			return next(new BusinessException(StatusCode.NotFound, 'Post not found', '[PostController]'));
		}

		this.ok(res, { id: deletedPost.id });
	}

	/**
	 * Method is used to create a new comment
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 */
	public async createComment(req: TRequestWithParamsAndBody<RequestParamsDto, CreateCommentDto>, res: Response): Promise<void> {
		const authorId = req.user.id;
		const postId = Number(req.params.id);

		const newComment = await this.commentService.createComment(authorId, postId, req.body);

		if (!newComment) {
			return res.status(StatusCode.BadRequest).redirect('404');
		}

		const post = await this.postService.getPostById(postId);

		return res.render('post', { post });
	}
}
