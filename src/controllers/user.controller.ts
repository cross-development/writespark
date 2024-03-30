// Packages
import { inject, injectable } from 'inversify';
// Controllers
import { BaseController } from './abstractions/base.controller';
// Constants
import { TYPES } from '../constants/types';
// Types
import { IUserController } from './abstractions/user.controller.interface';
import { ILoggerService } from '../services/abstractions/logger.service.interface';
import { IUserService } from '../services/abstractions/user.service.interface';

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
	}
}
