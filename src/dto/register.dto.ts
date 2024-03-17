// Packages
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
	@IsString({ message: 'Name has not been provided' })
	name: string;

	@IsEmail({}, { message: 'Email or password is not correct' })
	email: string;

	@IsString({ message: 'Email or password is not correct' })
	password: string;
}
