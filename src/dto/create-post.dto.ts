// Packages
import { IsString } from 'class-validator';

/**
 * A create post DTO is used to validate the data obtained from the request body
 */
export class CreatePostDto {
	@IsString({ message: 'Title has not been provided' })
	title: string;

	@IsString({ message: 'Content has not been provided' })
	content: string;
}
