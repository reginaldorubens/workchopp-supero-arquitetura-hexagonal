import Account from '../entities/Account';
import AccountRepository from '../repositories/AccountRepository';

export default class AccountService {
  repository: AccountRepository;

  constructor() {
    this.repository = new AccountRepository();
  }

  public async createAccount(id: string, initialBalance: number): Promise<Account> {
    if (!id) {
      throw new Error('One ID must be provided to create a new account.');
    }

    const existingAccount = await this.repository.get(id);

    if (existingAccount) {
      throw new Error('One account already exists with this ID.');
    }

    const newAccount = new Account(id, initialBalance);

    await this.repository.save(newAccount);

    return newAccount;
  }

  public async depositIntoAccount(accountId: string, amount: number): Promise<void> {
    if (amount <= 0) {
      throw new Error('Invalid value for deposit.');
    }

    const account = await this.repository.get(accountId);

    if (!account) {
      throw new Error('Account not found.');
    }

    account.setBalance(account.getBalance() + amount);

    await this.repository.update(account);
  }

  public async withdrawAccount(accountId: string, amount: number): Promise<void> {
    if (amount <= 0) {
      throw new Error('Invalid value for withdrawal.');
    }

    const account = await this.repository.get(accountId);

    if (!account) {
      throw new Error('Account not found.');
    }

    const currentAccountBalance = account.getBalance();
    
    if (amount > currentAccountBalance) {
      throw new Error('Insufficient balance for withdrawal');
    }

    account.setBalance(currentAccountBalance - amount);

    await this.repository.update(account);
  }

  public async getCurrentBalance(accountId: string): Promise<number> {
    const account = await this.repository.get(accountId);

    if (!account) {
      throw new Error('Account not found.');
    }

    return account.getBalance();
  }
}
