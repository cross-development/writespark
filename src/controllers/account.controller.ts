// Packages
import { inject, injectable } from 'inversify';
// Controllers
import { BaseController } from './abstractions/base.controller';
// DTO
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
// Middleware
import { ValidateMiddleware } from '../middleware/validate.middleware';
// Constants
import { TYPES } from '../constants/types';
import { StatusCode } from '../constants/status-code.enum';
// Types
import { TRequest, TRequestWithBody, TResponse } from './abstractions/route.interface';
import { IAccountController } from './abstractions/account.controller.interface';
import { IAccountService } from '../services/abstractions/account.service.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';
import { IJwtService } from '../services/abstractions/jwt.service.interface';

/**
 * An account controller is used to perform CRUD operations with account
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
	 * Method is used to render the login view
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async renderLogin(req: TRequest, res: TResponse): Promise<void> {
		return res.render('auth/login');
	}

	/**
	 * Method is used to login a user
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async login(req: TRequestWithBody<LoginDto>, res: TResponse): Promise<void> {
		const existingUser = await this.accountService.validateUser(req.body);

		if (!existingUser) {
			this.loggerService.error('[AccountController: login]', 'User not found');

			return res.status(StatusCode.BadRequest).redirect('/auth/login');
		}

		const accessToken = this.jwtService.sign({ id: existingUser.id, email: existingUser.email });

		res.cookie('accessToken', accessToken, { httpOnly: true });

		return res.redirect('/');
	}

	/**
	 * Method is used to render the register view
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async renderRegister(req: TRequest, res: TResponse): Promise<void> {
		return res.render('auth/register');
	}

	/**
	 * Method is used to register a new user
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async register(req: TRequestWithBody<RegisterDto>, res: TResponse): Promise<void> {
		const newUser = await this.accountService.createUser(req.body);

		if (!newUser) {
			this.loggerService.error('[AccountController: register]', 'User already exists');

			return res.status(StatusCode.BadRequest).redirect('/auth/register');
		}

		const accessToken = this.jwtService.sign({ id: newUser.id, email: newUser.email });

		res.cookie('accessToken', accessToken, { httpOnly: true });

		return res.redirect('/');
	}

	/**
	 * Method is used to logout user
	 * @param req - The express request
	 * @param res - The express response
	 */
	public async logout(req: TRequest, res: TResponse): Promise<void> {
		res.clearCookie('accessToken');

		return res.redirect('/');
	}
}
