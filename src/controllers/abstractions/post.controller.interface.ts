// Dto
import { CreatePostDto } from '../../dto/create-post.dto';
import { RequestParamsDto } from '../../dto/request-params.dto';
import { CreateCommentDto } from '../../dto/create-comment.dto';
// Types
import { TRequestWithBody, TRequestWithParams, TRequest, TResponse, TRequestWithParamsAndBody } from './route.interface';

export interface IPostController {
	renderAllPosts(req: TRequest, res: TResponse): Promise<void>;
	renderCreatePost(req: TRequest, res: TResponse): Promise<void>;
	renderOnePost(req: TRequestWithParams<RequestParamsDto>, res: TResponse): Promise<void>;
	renderDeletePost(req: TRequestWithParams<RequestParamsDto>, res: TResponse): Promise<void>;
	createPost(req: TRequestWithBody<CreatePostDto>, res: TResponse): Promise<void>;
	createComment(req: TRequestWithParamsAndBody<RequestParamsDto, CreateCommentDto>, res: TResponse): Promise<void>;
	deletePost(req: TRequestWithParams<RequestParamsDto>, res: TResponse): Promise<void>;
}
