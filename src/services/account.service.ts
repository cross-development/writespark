// Packages
import { injectable } from 'inversify';
// Types
import { IAccountService } from './abstractions/account.service.interface';

@injectable()
export class AccountService implements IAccountService {}
