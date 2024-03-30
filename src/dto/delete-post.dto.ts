// Packages
import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * A delete post DTO which is used to delete a post
 */
export class DeletePostDto {
	@Transform(({ value }) => parseInt(value))
	@IsInt({ message: 'Id must be an integer' })
	@Min(1, { message: 'Id must be a non-negative integer' })
	id: number;
}
