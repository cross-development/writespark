// Packages
import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
// Controllers
import { BaseController } from './abstractions/base.controller';
// DTO
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
// Middleware
import { ValidateMiddleware } from '../middleware/validate.middleware';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IAccountController } from './abstractions/account.controller.interface';
import { IAccountService } from '../services/abstractions/account.service.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';

/**
 * A user controller is used to perform CRUD operations with users
 */
@injectable()
export class AccountController extends BaseController implements IAccountController {
	constructor(
		@inject(TYPES.IAccountService) private readonly accountService: IAccountService,
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

	public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		throw new Error('Method not implemented.');
	}

	public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
