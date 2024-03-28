// Packages
import { IsString } from 'class-validator';

export class CreateCommentDto {
	@IsString({ message: 'Body has not been provided' })
	body: string;
}
