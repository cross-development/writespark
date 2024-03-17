// Packages
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
	@IsEmail({}, { message: 'Email or password is not correct' })
	email: string;

	@IsString({ message: 'Email or password is not correct' })
	password: string;
}
