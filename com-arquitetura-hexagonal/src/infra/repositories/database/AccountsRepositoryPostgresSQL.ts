import Account from '../../../application/entities/Account';
import AccountsRepository from '../../../application/ports/AccountsRepository';
import DBConnection from '../../database/DBConnection';

export default class AccountsRepositoryPostgresSQL implements AccountsRepository{
  constructor (readonly connection: DBConnection) {}

  async get(id: string): Promise<Account | null> {
    const queryResult = await this.connection.query('select * from account where id = $1', [id]);

    if (queryResult.length > 0) {
      return new Account(queryResult[0].id, parseFloat(queryResult[0].balance));
    }

    return null;  
  }
  async save(account: Account): Promise<void> {
    await this.connection.query('insert into account (id, balance) values ($1, $2)', [account.getId(), account.getBalance()]);
  }
  async update(account: Account): Promise<void> {
    await this.connection.query('update account set balance = $1 where id = $2', [account.getBalance(), account.getId()]);
  }
}
