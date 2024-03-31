// Packages
import { IsEmail, IsString } from 'class-validator';

/**
 * A register DTO is used to validate the data obtained from the request body
 */
export class RegisterDto {
	@IsString({ message: 'Name has not been provided' })
	name: string;

	@IsEmail({}, { message: 'Email or password is not correct' })
	email: string;

	@IsString({ message: 'Email or password is not correct' })
	password: string;
}
