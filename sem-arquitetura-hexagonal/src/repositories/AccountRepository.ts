import Account from '../entities/Account';
import BaseRepository from './BaseRepository';

export default class AccountRepository extends BaseRepository {
  public async get(id: string): Promise<Account | null> {
    const queryResult = await this.database.query('select * from account where id = $1', [id]);

    if (queryResult.length > 0) {
      return new Account(queryResult[0].id, parseFloat(queryResult[0].balance));
    }

    return null;
  }

  public async save(account: Account): Promise<void> {
    await this.database.query('insert into account (id, balance) values ($1, $2)', [account.getId(), account.getBalance()]);
  }

  public async update(account: Account): Promise<void> {
    await this.database.query('update account set balance = $1 where id = $2', [account.getBalance(), account.getId()]);
  }
}
