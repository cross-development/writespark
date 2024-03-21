// Packages
import { IsString } from 'class-validator';

export class CreatePostDto {
	@IsString({ message: 'Title has not been provided' })
	title: string;

	@IsString({ message: 'Content has not been provided' })
	content: string;
}
