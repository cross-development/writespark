// Core
import path from 'path';
// Packages
import express, { Express } from 'express';
import { injectable, inject } from 'inversify';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as hbs from 'express-handlebars';
// Controllers
import { HomeController } from './controllers/home.controller';
import { PostController } from './controllers/post.controller';
import { UserController } from './controllers/user.controller';
import { AccountController } from './controllers/account.controller';
// Middleware
import { AuthMiddleware } from './middleware/auth.middleware';
import { VarsMiddleware } from './middleware/vars.middleware';
// Persistence
import { PrismaService } from './persistence/prisma.service';
// Constants
import { TYPES } from './constants/types';
// Utils
import { hbsHelpers } from './utils/hbs.helpers';
// Types
import { TServerConfig } from './types/app.config.types';
import { ILoggerService } from './services/abstractions/logger.service.interface';
import { IConfigService } from './services/abstractions/config.service.interface';
import { IExceptionFilter } from './exceptions/abstractions/exception.filter.interface';

/**
 * Application class, the main class for the server
 */
@injectable()
export class App {
	private readonly app: Express;
	private readonly serverConfig: TServerConfig;

	constructor(
		@inject(TYPES.ILoggerService) private readonly loggerService: ILoggerService,
		@inject(TYPES.IConfigService) private readonly configService: IConfigService,
		@inject(TYPES.IExceptionFilter) private readonly exceptionFilter: IExceptionFilter,
		@inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
		@inject(TYPES.IAccountController) private readonly accountController: AccountController,
		@inject(TYPES.IHomeController) private readonly homeController: HomeController,
		@inject(TYPES.IPostController) private readonly postController: PostController,
		@inject(TYPES.IUserController) private readonly userController: UserController,
	) {
		this.app = express();
		this.serverConfig = this.configService.get<TServerConfig>('server');
	}

	/**
	 * Method is used to initialize the server
	 */
	public async init(): Promise<void> {
		this.useViews();
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.useDatabase();

		this.listen();
	}

	/**
	 * Method is used to register view engine
	 */
	private useViews(): void {
		this.app.use('/public', express.static(path.join(__dirname, 'public')));
		this.app.engine(
			'hbs',
			hbs.engine({
				extname: '.hbs',
				defaultLayout: 'main',
				layoutsDir: path.join(__dirname, 'views', 'layouts'),
				helpers: hbsHelpers,
			}),
		);
		this.app.set('view engine', 'hbs');
		this.app.set('views', path.join(__dirname, 'views'));
	}

	/**
	 * Method is used to register middleware
	 */
	private useMiddleware(): void {
		this.app.use(helmet());
		this.app.use(cors({ origin: this.serverConfig.allowedOrigin }));

		this.app.use(cookieParser());

		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());

		this.app.use(morgan('dev'));

		const authMiddleware = new AuthMiddleware(this.serverConfig.jwtSecret);
		this.app.use(authMiddleware.execute.bind(authMiddleware));

		const varsMiddleware = new VarsMiddleware();
		this.app.use(varsMiddleware.execute.bind(varsMiddleware));
	}

	/**
	 * Method is used to register server routes
	 */
	private useRoutes(): void {
		this.app.use('/auth', this.accountController.router);
		this.app.use('/posts', this.postController.router);
		this.app.use('/users', this.userController.router);
		this.app.use('/', this.homeController.router);
	}

	/**
	 * Method is used to register exception filters
	 */
	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	/**
	 * Method is used to register the database
	 */
	private async useDatabase(): Promise<void> {
		await this.prismaService.connect();

		// https://nodejs.org/api/process.html
		process.on('SIGINT', async () => {
			await this.prismaService.disconnect();

			process.exit(0);
		});
	}

	/**
	 * Method is used to listen to the server connection
	 */
	private listen(): void {
		this.app.listen(this.serverConfig.port, () => {
			this.loggerService.info('app', `Server started listening on port ${this.serverConfig.port}`);
		});
	}
}
