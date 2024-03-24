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
import { TRequestWithBody } from './abstractions/route.interface';
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
				method: 'get',
				handler: this.renderLogin,
			},
			{
				path: '/login',
				method: 'post',
				handler: this.login,
				middleware: [new ValidateMiddleware(LoginDto)],
			},
			{
				path: '/register',
				method: 'get',
				handler: this.renderRegister,
			},
			{
				path: '/register',
				method: 'post',
				handler: this.register,
				middleware: [new ValidateMiddleware(RegisterDto)],
			},
			{
				path: '/logout',
				method: 'get',
				handler: this.logout,
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
	 * Method is used to render the login view
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 */
	public async renderLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
		return res.render('auth/login');
	}

	/**
	 * Method is used to login a user
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 * @returns - If the user not found, the business exception is returned
	 */
	public async login(req: TRequestWithBody<LoginDto>, res: Response, next: NextFunction): Promise<void> {
		const existingUser = await this.accountService.validateUser(req.body);

		if (!existingUser) {
			return res.redirect('auth/login');
		}

		const accessToken = this.jwtService.sign({ id: existingUser.id, email: existingUser.email });

		res.cookie('accessToken', accessToken, { httpOnly: true });

		return res.redirect('/');
	}

	/**
	 * Method is used to render the register view
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 */
	public async renderRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
		return res.render('auth/register');
	}

	/**
	 * Method is used to register a new user
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 */
	public async register(req: TRequestWithBody<RegisterDto>, res: Response, next: NextFunction): Promise<void> {
		const newUser = await this.accountService.createUser(req.body);

		if (!newUser) {
			return res.redirect('auth/register');
		}

		const accessToken = this.jwtService.sign({ id: newUser.id, email: newUser.email });

		res.cookie('accessToken', accessToken, { httpOnly: true });

		return res.redirect('/');
	}

	/**
	 * Method is used to logout user
	 * @param req - The express request
	 * @param res - The express response
	 * @param next - The next function called to pass the request further
	 */
	public async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.clearCookie('accessToken');

		return res.redirect('/');
	}
}
