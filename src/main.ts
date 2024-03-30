// Packages
import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import dotenv from 'dotenv';
dotenv.config();
// Application
import { App } from './app';
// Controllers
import { HomeController } from './controllers/home.controller';
import { PostController } from './controllers/post.controller';
import { UserController } from './controllers/user.controller';
import { AccountController } from './controllers/account.controller';
// Services
import { JwtService } from './services/jwt.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';
import { LoggerService } from './services/logger.service';
import { ConfigService } from './services/config.service';
import { CommentService } from './services/comment.service';
// Repositories
import { PostRepository } from './repositories/post.repository';
import { UserRepository } from './repositories/user.repository';
import { AccountRepository } from './repositories/account.repository';
import { CommentRepository } from './repositories/comment.repository';
// Persistence
import { PrismaService } from './persistence/prisma.service';
// Exceptions
import { ExceptionFilter } from './exceptions/exception.filter';
// Constants
import { TYPES } from './constants/types';
// Types
import { IBootstrapReturn } from './types/app.interface';
import { IConfigService } from './services/abstractions/config.service.interface';
import { ILoggerService } from './services/abstractions/logger.service.interface';
import { IExceptionFilter } from './exceptions/abstractions/exception.filter.interface';
import { IPostService } from './services/abstractions/post.service.interface';
import { IPostRepository } from './repositories/abstractions/post.repository.interface';
import { IPostController } from './controllers/abstractions/post.controller.interface';
import { IUserService } from './services/abstractions/user.service.interface';
import { IUserRepository } from './repositories/abstractions/user.repository.interface';
import { IUserController } from './controllers/abstractions/user.controller.interface';
import { IAccountService } from './services/abstractions/account.service.interface';
import { IAccountRepository } from './repositories/abstractions/account.repository.interface';
import { IAccountController } from './controllers/abstractions/account.controller.interface';
import { IJwtService } from './services/abstractions/jwt.service.interface';
import { IHomeController } from './controllers/abstractions/home.controller.interface';
import { ICommentRepository } from './repositories/abstractions/comment.repository.interface';
import { ICommentService } from './services/abstractions/comment.service.interface';

// Bind all the dependencies for the DI container
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	// Application
	bind<App>(TYPES.Application).to(App).inSingletonScope();
	// Persistence
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	// Common
	bind<IJwtService>(TYPES.IJwtService).to(JwtService).inSingletonScope();
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<IHomeController>(TYPES.IHomeController).to(HomeController);
	// Posts
	bind<IPostService>(TYPES.IPostService).to(PostService);
	bind<IPostRepository>(TYPES.IPostRepository).to(PostRepository);
	bind<IPostController>(TYPES.IPostController).to(PostController);
	// Users
	bind<IUserService>(TYPES.IUserService).to(UserService);
	bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
	bind<IUserController>(TYPES.IUserController).to(UserController);
	// Comments
	bind<ICommentService>(TYPES.ICommentService).to(CommentService);
	bind<ICommentRepository>(TYPES.ICommentRepository).to(CommentRepository);
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
