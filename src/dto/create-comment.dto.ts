// Packages
import { IsString } from 'class-validator';

/**
 * A create comment DTO is used to validate the data obtained from the request body
 */
export class CreateCommentDto {
	@IsString({ message: 'Body has not been provided' })
	body: string;
}
