// Packages
import { injectable } from 'inversify';
// Types
import { IAccountRepository } from './abstractions/account.repository.interface';

@injectable()
export class AccountRepository implements IAccountRepository {}
