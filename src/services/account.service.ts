// Packages
import { inject, injectable } from 'inversify';
// Domain
import { User } from '../domain/user';
// Dto
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
// Constants
import { TYPES } from '../constants/types';
// Types
import { TUserModel } from '../types/user.types';
import { TServerConfig } from '../types/app.config.types';
import { IConfigService } from './abstractions/config.service.interface';
import { IAccountService } from './abstractions/account.service.interface';
import { IAccountRepository } from '../repositories/abstractions/account.repository.interface';
import { ILoggerService } from './abstractions/logger.service.interface';

/**
 * An account service is used to interact with an account repository
 */
@injectable()
export class AccountService implements IAccountService {
	constructor(
		@inject(TYPES.IConfigService) private readonly configService: IConfigService,
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
		@inject(TYPES.IAccountRepository) private readonly accountRepository: IAccountRepository,
	) {}

	/**
	 * Method is used to create a new user
	 * @param dto - A register DTO
	 * @returns A new user or null if the user already exists
	 */
	public async createUser(dto: RegisterDto): Promise<TUserModel | null> {
		const { email, name, password } = dto;

		const existingUser = await this.accountRepository.find(email);

		if (existingUser) {
			this.loggerService.error('[AccountService: createUser]', `User with email ${email} already exists`);

			return null;
		}

		const newUser = new User(email, name);

		const saltLength = this.configService.get<TServerConfig>('server').saltLength;

		await newUser.setPassword(password, saltLength);

		return this.accountRepository.create(newUser);
	}

	/**
	 * Method is used to validate a user by their email and password
	 * @param dto - A login DTO
	 * @returns A user or null if the user doesn't exist or their password is not valid
	 */
	public async validateUser(dto: LoginDto): Promise<TUserModel | null> {
		const { email, password } = dto;

		const existingUser = await this.accountRepository.find(email);

		if (!existingUser) {
			this.loggerService.error('[AccountService: validateUser]', `User with email ${email} not found`);

			return null;
		}

		const newUser = new User(existingUser.email, existingUser.name, existingUser.password);

		const isPasswordValid = await newUser.comparePassword(password);

		if (!isPasswordValid) {
			this.loggerService.error('[AccountService: validateUser]', 'Password is not valid');

			return null;
		}

		return existingUser;
	}
}
