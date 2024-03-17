// Packages
import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * A request params DTO is used to validate the data obtained from the request
 */
export class RequestParamsDto {
	@Transform(({ value }) => Number(value))
	@IsInt({ message: 'Id must be an integer' })
	@Min(0, { message: 'Id must be a non-negative integer' })
	id: number;
}
