import pgp from 'pg-promise';
import DBConnection from './DBConnection';

export default class PostgresqlConnection implements DBConnection {
  connection: any;

  constructor() {
    const databaseName = process.env.NODE_ENV == 'test' ? 'workchopp_test' : 'workchopp';
    this.connection = pgp()(`postgres://postgres:123456@localhost:5432/${databaseName}`);
  }

  public async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  public async executeQueriesIntoTransacation(queries: any): Promise<any> {
    return this.connection.tx(async (t: { none: (arg0: any, arg1: any) => any; }) => {
      for (const [satatement, params] of queries) {
        await t.none(satatement, params);
      }
    });
  }

  public async close(): Promise<any> {
    return this.connection.$pool.end();
  }
}
