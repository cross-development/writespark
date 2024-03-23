// Packages
import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * A request params DTO which is used to validate the data obtained from the request
 */
export class RequestParamsDto {
	@Transform(({ value }) => parseInt(value))
	@IsInt({ message: 'Id must be an integer' })
	@Min(1, { message: 'Id must be a non-negative integer' })
	id: number;
}
