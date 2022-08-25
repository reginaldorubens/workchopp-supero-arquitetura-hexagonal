import Account from '../../../application/entities/Account';
import TransferBetweenAccountsRepository from '../../../application/ports/TransferBetweenAccountsRepository';
import AccountsRepositoryMemory from './AccountsRepositoryMemory';

export default class TransferBetweenAccountsRepositoryMemory implements TransferBetweenAccountsRepository {
  accountsRepositoryMemory: AccountsRepositoryMemory;

  constructor() {
    this.accountsRepositoryMemory = new AccountsRepositoryMemory();
  }
  async persistTransfer(accountFrom: Account, accountTo: Account): Promise<void> {
    this.accountsRepositoryMemory.update(accountFrom);
    this.accountsRepositoryMemory.update(accountTo);
  }
}
