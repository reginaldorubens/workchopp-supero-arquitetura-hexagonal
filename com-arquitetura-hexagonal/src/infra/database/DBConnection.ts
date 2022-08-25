export default interface DBConnection {
  query(statement: string, params: any): Promise<any>;
  executeQueriesIntoTransacation(queries: any): Promise<any>;
  close(): Promise<any>;
}
