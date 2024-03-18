// Packages
import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
// Controllers
import { BaseController } from './abstractions/base.controller';
// DTO
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
// Middleware
import { AuthGuard } from '../middleware/auth.guard';
import { ValidateMiddleware } from '../middleware/validate.middleware';
// Exceptions
import { BusinessException } from '../exceptions/business-exception';
// Constants
import { TYPES } from '../constants/types';
import { StatusCode } from '../constants/status-code.enum';
// Types
import { TRequest } from './abstractions/route.interface';
import { IAccountController } from './abstractions/account.controller.interface';
import { IAccountService } from '../services/abstractions/account.service.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';
import { IJwtService } from '../services/abstractions/jwt.service.interface';

/**
 * A user controller is used to perform CRUD operations with users
 */
@injectable()
export class AccountController extends BaseController implements IAccountController {
	constructor(
		@inject(TYPES.IAccountService) private readonly accountService: IAccountService,
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
		@inject(TYPES.IJwtService) private readonly jwtService: IJwtService,
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
				path: '/profile',
				method: 'get',
				handler: this.getProfile,
				middleware: [new AuthGuard()],
			},
			{
				path: '/login',
				method: 'post',
				handler: this.login,
				middleware: [new ValidateMiddleware(LoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				handler: this.register,
				middleware: [new ValidateMiddleware(RegisterDto)],
			},
		]);
	}

	/**
	 * Method is used to get a user profile
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If there is no user for the provided email, the business exception is returned
	 */
	public async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
		const profile = await this.accountService.getProfile(req.user?.email);

		if (!profile) {
			return next(new BusinessException(StatusCode.NotFound, 'User not found', '[AccountController]'));
		}

		const { password: _, ...restProfile } = profile;

		this.ok(res, restProfile);
	}

	/**
	 * Method is used to login a user
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If the user not found, the business exception is returned
	 */
	public async login(req: TRequest<LoginDto>, res: Response, next: NextFunction): Promise<void> {
		const existingUser = await this.accountService.validateUser(req.body);

		if (!existingUser) {
			return next(new BusinessException(StatusCode.NotFound, 'User not found', '[AccountController]'));
		}

		const accessToken = this.jwtService.sign({ id: existingUser.id, email: existingUser.email });

		this.auth(res, StatusCode.OK, accessToken);
	}

	/**
	 * Method is used to register a new user
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If the user already exists, the business exception is returned
	 */
	public async register(req: TRequest<RegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const newUser = await this.accountService.createUser(req.body);

		if (!newUser) {
			return next(new BusinessException(StatusCode.Conflict, 'User already exists', '[AccountController]'));
		}

		const accessToken = this.jwtService.sign({ id: newUser.id, email: newUser.email });

		this.auth(res, StatusCode.Created, accessToken);
	}
}
