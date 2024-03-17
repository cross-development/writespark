// Packages
import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import dotenv from 'dotenv';
dotenv.config();
// Application
import { App } from './app';
// Services
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';
import { AccountService } from './services/account.service';
import { LoggerService } from './services/logger.service';
import { ConfigService } from './services/config.service';
// Database
import { PrismaService } from './database/prisma.service';
// Controllers
import { UserController } from './controllers/user.controller';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';
import { AccountController } from './controllers/account.controller';
// Repositories
import { UserRepository } from './repositories/user.repository';
import { PostRepository } from './repositories/post.repository';
import { CommentRepository } from './repositories/comment.repository';
import { AccountRepository } from './repositories/account.repository';
// Exceptions
import { ExceptionFilter } from './exceptions/exception.filter';
// Constants
import { TYPES } from './constants/types';
// Types
import { IBootstrapReturn } from './types/app.interface';
import { IUserService } from './services/abstractions/user.service.interface';
import { IConfigService } from './services/abstractions/config.service.interface';
import { ILoggerService } from './services/abstractions/logger.service.interface';
import { IExceptionFilter } from './exceptions/abstractions/exception.filter.interface';
import { IUserController } from './controllers/abstractions/user.controller.interface';
import { IUserRepository } from './repositories/abstractions/user.repository.interface';
import { IPostService } from './services/abstractions/post.service.interface';
import { IPostRepository } from './repositories/abstractions/post.repository.interface';
import { IPostController } from './controllers/abstractions/post.controller.interface';
import { ICommentService } from './services/abstractions/comment.service.interface';
import { ICommentRepository } from './repositories/abstractions/comment.repository.interface';
import { ICommentController } from './controllers/abstractions/comment.controller.interface';
import { IAccountService } from './services/abstractions/account.service.interface';
import { IAccountRepository } from './repositories/abstractions/account.repository.interface';
import { IAccountController } from './controllers/abstractions/account.controller.interface';

// Bind all the dependencies for the DI container
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	// Application
	bind<App>(TYPES.Application).to(App).inSingletonScope();
	// Database
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	// Common
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
	// Users
	bind<IUserService>(TYPES.IUserService).to(UserService);
	bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
	bind<IUserController>(TYPES.IUserController).to(UserController);
	// Posts
	bind<IPostService>(TYPES.IPostService).to(PostService);
	bind<IPostRepository>(TYPES.IPostRepository).to(PostRepository);
	bind<IPostController>(TYPES.IPostController).to(PostController);
	// Comments
	bind<ICommentService>(TYPES.ICommentService).to(CommentService);
	bind<ICommentRepository>(TYPES.ICommentRepository).to(CommentRepository);
	bind<ICommentController>(TYPES.ICommentController).to(CommentController);
	// Account
	bind<IAccountService>(TYPES.IAccountService).to(AccountService);
	bind<IAccountRepository>(TYPES.IAccountRepository).to(AccountRepository);
	bind<IAccountController>(TYPES.IAccountController).to(AccountController);
});

// The bootstrap function to start the server
const bootstrap = (): IBootstrapReturn => {
	const appContainer = new Container({ defaultScope: 'Request' });
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
};

bootstrap();
