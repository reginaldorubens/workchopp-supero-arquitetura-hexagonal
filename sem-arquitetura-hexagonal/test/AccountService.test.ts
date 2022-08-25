import AccountService from '../src/services/AccountService';
import database from '../src/database/database';

async function clearDatabase(): Promise<void> {
  await database.query('delete from account', []);
}

const accountService = new AccountService();

beforeAll(async() => {
  await clearDatabase();
});

test('Should create an account', async function() {
  const account = await accountService.createAccount('1234', 100);
  expect(account.getId()).toBe('1234');
  expect(account.getBalance()).toBe(100);
});

test('Should execute a deposit', async function() {
  await accountService.depositIntoAccount('1234', 50);
  const newBalance = await accountService.getCurrentBalance('1234');
  expect(newBalance).toBe(150);
});

test('Should execute a withdrawal', async function() {
  await accountService.withdrawAccount('1234', 70);
  const newBalance = await accountService.getCurrentBalance('1234');
  expect(newBalance).toBe(80);
});

test('Should throw an error if deposit amount is invalid', async function() {
  try {
    await accountService.depositIntoAccount('1234', -1000);
  }
  catch(e: any) {
    expect(e.message).toBe('Invalid value for deposit.');
  }  
});

test('Should throw an error if deposit amount is invalid', async function() {
  try {
    await accountService.withdrawAccount('1234', -1000);
  }
  catch(e: any) {
    expect(e.message).toBe('Invalid value for withdrawal.');
  }  
});

test('Should throw an error if withdrawal amount is greater than current account balance', async function() {
  try {
    await accountService.withdrawAccount('1234', 100);
  }
  catch(e: any) {
    expect(e.message).toBe('Insufficient balance for withdrawal');
  } 
});

test('Should throw an error if account not found', async function() {
  try {
    const account = await accountService.getCurrentBalance('999999999');
    console.log(account);
  }
  catch(e: any) {
    expect(e.message).toBe('Account not found.');
  }
});
