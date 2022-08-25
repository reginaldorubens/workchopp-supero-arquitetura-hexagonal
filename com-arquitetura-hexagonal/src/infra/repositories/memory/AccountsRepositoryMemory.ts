import Account from '../../../application/entities/Account';
import AccountsRepository from '../../../application/ports/AccountsRepository';

export default class AccountsRepositoryMemory implements AccountsRepository {
  accounstList: Account[];

  constructor() {
    this.accounstList = [];
  }

  async get(id: string): Promise<Account | null> {
    return this.accounstList.find((a) => { return a.getId() === id}) || null;
  }

  async save(account: Account): Promise<void> {
    this.accounstList.push(account);
  }

  async update(account: Account): Promise<void> {
    for (let idx = 0; idx < this.accounstList.length; idx++) {
      if (this.accounstList[idx].getId() == account.getId()) {
        this.accounstList[idx] = account;
        break;
      }
    }
  }
}
