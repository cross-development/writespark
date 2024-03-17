// Packages
import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
// Controllers
import { BaseController } from './abstractions/base.controller';
// Middleware
import { AuthGuard } from '../middleware/auth.guard';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IUserController } from './abstractions/user.controller.interface';
import { IUserService } from '../services/abstractions/user.service.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';

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
				path: '/info',
				method: 'get',
				handler: this.info,
				middleware: [new AuthGuard()],
			},
		]);
	}

	public async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
