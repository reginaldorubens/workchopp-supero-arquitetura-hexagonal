import database from '../src/database/database';
import TransferBetweenAccountsService from '../src/services/TransferBetweenAccountsService';

async function initializeDatabase() {
  await database.query('delete from account', []);
  await database.query('insert into account (id, balance) values ($1, $2)', ['1234', 1000]);
  await database.query('insert into account (id, balance) values ($1, $2)', ['5678', 200]);
}

beforeAll(async() => {
  await initializeDatabase();
});

const transferService = new TransferBetweenAccountsService();

test('Should transfer amount between accounts', async function() {
  await transferService.executeTransfer('1234', '5678', 200);
  const accountFrom = await database.query('select * from account where id = $1', ['1234']);
  const accountTo = await database.query('select * from account where id = $1', ['5678']);
  expect(parseFloat(accountFrom[0].balance)).toBe(800);
  expect(parseFloat(accountTo[0].balance)).toBe(400);
});
