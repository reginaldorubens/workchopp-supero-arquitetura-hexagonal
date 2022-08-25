import Account from '../../../application/entities/Account';
import TransferBetweenAccountsRepository from '../../../application/ports/TransferBetweenAccountsRepository';
import DBConnection from '../../database/DBConnection';

export default class TransferBetweenAccountsRepositoryPostgresSQL implements TransferBetweenAccountsRepository {
  constructor (readonly connection: DBConnection) {}
  
  async persistTransfer(accountFrom: Account, accountTo: Account): Promise<void> {
    await this.connection.executeQueriesIntoTransacation([
      ['update account set balance = $1 where id = $2', [accountFrom.getBalance(), accountFrom.getId()]],
      ['update account set balance = $1 where id = $2', [accountTo.getBalance(), accountTo.getId()]],
    ]);
  }
}
