import database from '../database/database';

export default class BaseRepository {
  database: any;

  constructor () {
    this.database = database;
  }
}
