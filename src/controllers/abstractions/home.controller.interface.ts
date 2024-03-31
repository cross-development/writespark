// Types
import { TRequest, TResponse } from './route.interface';

export interface IHomeController {
	renderFeed(req: TRequest, res: TResponse): Promise<void>;
	renderNotFound(req: TRequest, res: TResponse): Promise<void>;
	renderBadRequest(req: TRequest, res: TResponse): Promise<void>;
}
