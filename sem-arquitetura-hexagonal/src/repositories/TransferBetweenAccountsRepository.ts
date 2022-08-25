import Account from '../entities/Account';
import BaseRepository from './BaseRepository';

export default class TransferBetweenAccountsRepository extends BaseRepository {
  public async persistTransfer(accountFrom: Account, accountTo: Account): Promise<void> {
    await this.database.executeQueriesIntoTransacation([
      ['update account set balance = $1 where id = $2', [accountFrom.getBalance(), accountFrom.getId()]],
      ['update account set balance = $1 where id = $2', [accountTo.getBalance(), accountTo.getId()]],
    ]);
  }
}
