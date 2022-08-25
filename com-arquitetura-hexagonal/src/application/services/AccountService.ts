import Account from '../entities/Account';
import AccountsRepository from '../ports/AccountsRepository';

export default class AccountService {
  constructor(private repository: AccountsRepository) {}

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
    const account = await this.repository.get(accountId);

    if (!account) {
      throw new Error('Account not found.');
    }

    account.deposit(amount);

    await this.repository.update(account);
  }

  public async withdrawAccount(accountId: string, amount: number): Promise<void> {
    const account = await this.repository.get(accountId);

    if (!account) {
      throw new Error('Account not found.');
    }

    account.withdrawal(amount);

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
