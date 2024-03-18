// These types of the app classes are used to bind dependencies to the DI container
export const TYPES = {
	// App
	Application: Symbol.for('Application'),
	// Persistence
	PrismaService: Symbol.for('PrismaService'),
	// Common usage
	IJwtService: Symbol.for('JwtService'),
	ILoggerService: Symbol.for('LoggerService'),
	IConfigService: Symbol.for('ConfigService'),
	IExceptionFilter: Symbol.for('ExceptionFilter'),
	// Account domain
	IAccountService: Symbol.for('AccountService'),
	IAccountController: Symbol.for('AccountController'),
	IAccountRepository: Symbol.for('AccountRepository'),
	// Post domain
	IPostService: Symbol.for('PostService'),
	IPostController: Symbol.for('PostController'),
	IPostRepository: Symbol.for('PostRepository'),
	// Comment domain
	ICommentService: Symbol.for('CommentService'),
	ICommentController: Symbol.for('CommentController'),
	ICommentRepository: Symbol.for('CommentRepository'),
};
