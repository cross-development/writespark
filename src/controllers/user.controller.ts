// Packages
import { inject, injectable } from 'inversify';
// Controllers
import { BaseController } from './abstractions/base.controller';
// Dto
import { RequestParamsDto } from '../dto/request-params.dto';
// Middleware
import { ValidateMiddleware } from '../middleware/validate.middleware';
// Constants
import { TYPES } from '../constants/types';
import { StatusCode } from '../constants/status-code.enum';
// Types
import { IUserController } from './abstractions/user.controller.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';
import { IUserService } from '../services/abstractions/user.service.interface';
import { TRequest, TRequestWithParams, TResponse } from './abstractions/route.interface';

/**
 * A user controller is used to perform CRUD operations with users
 */
@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
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
				handler: this.renderAllUsers,
			},
			{
				path: '/:id',
				method: 'get',
				handler: this.renderUserProfile,
				middleware: [new ValidateMiddleware(RequestParamsDto, 'params')],
			},
		]);
	}

	/**
	 * Method is used to render a users view
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async renderAllUsers(req: TRequest, res: TResponse): Promise<void> {
		const users = await this.userService.getUsers();

		return res.render('users/index', { users });
	}

	/**
	 * Method is used to render one user view
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async renderUserProfile(req: TRequestWithParams<RequestParamsDto>, res: TResponse): Promise<void> {
		const user = await this.userService.getUserById(Number(req.params.id));

		if (!user) {
			return res.status(StatusCode.NotFound).render('404');
		}

		return res.render('users/user', user);
	}
}
