// These types of the app classes are used to bind dependencies to the DI container
export const TYPES = {
	// App
	Application: Symbol.for('Application'),
	// Database
	PrismaService: Symbol.for('PrismaService'),
	// Common usage
	ILoggerService: Symbol.for('LoggerService'),
	IConfigService: Symbol.for('ConfigService'),
	IExceptionFilter: Symbol.for('ExceptionFilter'),
	// Account domain
	IAccountService: Symbol.for('AccountService'),
	IAccountController: Symbol.for('AccountController'),
	IAccountRepository: Symbol.for('AccountRepository'),
	// User domain
	IUserService: Symbol.for('UserService'),
	IUserController: Symbol.for('UserController'),
	IUserRepository: Symbol.for('UserRepository'),
	// Post domain
	IPostService: Symbol.for('PostService'),
	IPostController: Symbol.for('PostController'),
	IPostRepository: Symbol.for('PostRepository'),
	// Comment domain
	ICommentService: Symbol.for('CommentService'),
	ICommentController: Symbol.for('CommentController'),
	ICommentRepository: Symbol.for('CommentRepository'),
};
