// Packages
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

/**
 * A get post params DTO which is used to validate the data obtained from the request
 */
export class GetPostsDto {
	@Transform(({ value }) => parseInt(value))
	@IsInt({ message: 'Author id must be an integer' })
	@Min(1, { message: 'Author id must be greater then 0' })
	@IsOptional()
	authorId?: number;

	@Transform(({ value }) => parseInt(value))
	@IsInt({ message: 'Page must be an integer' })
	@Min(1, { message: 'Page must be greater then 0' })
	page: number;

	@Transform(({ value }) => parseInt(value))
	@IsInt({ message: 'Per page must be an integer' })
	@Min(10, { message: 'Per page must be greater then or equal 10' })
	perPage: number;
}
