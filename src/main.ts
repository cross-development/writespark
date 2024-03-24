// Packages
import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import dotenv from 'dotenv';
dotenv.config();
// Application
import { App } from './app';
// Services
import { JwtService } from './services/jwt.service';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';
import { AccountService } from './services/account.service';
import { LoggerService } from './services/logger.service';
import { ConfigService } from './services/config.service';
// Persistence
import { PrismaService } from './persistence/prisma.service';
// Controllers
import { HomeController } from './controllers/home.controller';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';
import { AccountController } from './controllers/account.controller';
// Repositories
import { PostRepository } from './repositories/post.repository';
import { CommentRepository } from './repositories/comment.repository';
import { AccountRepository } from './repositories/account.repository';
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
import { ICommentService } from './services/abstractions/comment.service.interface';
import { ICommentRepository } from './repositories/abstractions/comment.repository.interface';
import { ICommentController } from './controllers/abstractions/comment.controller.interface';
import { IAccountService } from './services/abstractions/account.service.interface';
import { IAccountRepository } from './repositories/abstractions/account.repository.interface';
import { IAccountController } from './controllers/abstractions/account.controller.interface';
import { IJwtService } from './services/abstractions/jwt.service.interface';
import { IHomeController } from './controllers/abstractions/home.controller.interface';

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
