// Packages
import { inject, injectable } from 'inversify';
import colors from 'colors/safe';
// Constants
import { TYPES } from '../constants/types';
// Types
import { TLoggerConfig } from '../types/app.config.interface';
import { ILoggerService } from './abstractions/logger.service.interface';
import { IConfigService } from './abstractions/config.service.interface';

/**
 * Simple logger is used to log info, warnings and errors.
 */
@injectable()
export class LoggerService implements ILoggerService {
	private loggerConfig: TLoggerConfig;
	private logLevel: number;
	private levels: TLoggerConfig['levels'];

	constructor(@inject(TYPES.IConfigService) private readonly configService: IConfigService) {
		this.initializeLoggerConfig();
		this.initializeLogLevel();
		this.initializeColors();
	}

	/**
	 * Method is used to initialize the logger config
	 */
	private initializeLoggerConfig(): void {
		this.loggerConfig = this.configService.get<TLoggerConfig>('logger');
	}

	/**
	 * Method is used to initialize the logger level
	 */
	private initializeLogLevel(): void {
		this.levels = this.loggerConfig.levels;
		this.logLevel = this.levels[this.loggerConfig.logLevel] ?? this.levels.warn;
	}

	/**
	 * Method is used to initialize the logger colors
	 */
	private initializeColors(): void {
		this.loggerConfig.colorsEnabled === 1 ? colors.enable() : colors.disable();
	}

	/**
	 * Method is used to log information
	 * @param context - A context in which the logger is used
	 * @param args - Any arguments for logging
	 */
	public info(context: string, ...args: unknown[]): void {
		if (this.levels.info >= this.logLevel) {
			console.log(colors.bgBlue(`${context}:`), ...args);
		}
	}

	/**
	 * Method is used to log warnings
	 * @param context - A context in which the logger is used
	 * @param args - Any arguments for logging
	 */
	public warn(context: string, ...args: unknown[]): void {
		if (this.levels.warn >= this.logLevel) {
			console.warn(colors.bgYellow(`${context}:`), ...args);
		}
	}

	/**
	 * Method is used to log errors
	 * @param context - A context in which the logger is used
	 * @param args - Any arguments for logging
	 */
	public error(context: string, ...args: unknown[]): void {
		if (this.levels.error >= this.logLevel) {
			console.error(colors.bgRed(`${context}:`), ...args);
		}
	}
}
