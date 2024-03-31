// Packages
import { IsEmail, IsString } from 'class-validator';

/**
 * A login DTO is used to validate the data obtained from the request body
 */
export class LoginDto {
	@IsEmail({}, { message: 'Email or password is not correct' })
	email: string;

	@IsString({ message: 'Email or password is not correct' })
	password: string;
}
