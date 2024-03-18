const config = {
	logger: {
		levels: { info: 0, warn: 1, error: 2 },
		logLevel: process.env.LOG_LEVEL || 'warn',
		colorsEnabled: Number(process.env.COLORS_ENABLED) || 0,
	},
	server: {
		port: Number(process.env.PORT) || 8000,
		allowedOrigin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
		saltLength: Number(process.env.SALT_LENGTH) || 10,
		jwtSecret: process.env.JWT_SECRET || 'secret_key',
	},
};

export default config;
