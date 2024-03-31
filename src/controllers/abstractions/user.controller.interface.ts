// Packages
// Dto
import { RequestParamsDto } from '../../dto/request-params.dto';
// Types
import { TRequestWithParams, TRequest, TResponse } from './route.interface';

export interface IUserController {
	renderAllUsers(req: TRequest, res: TResponse): Promise<void>;
	renderUserProfile(req: TRequestWithParams<RequestParamsDto>, res: TResponse): Promise<void>;
}
