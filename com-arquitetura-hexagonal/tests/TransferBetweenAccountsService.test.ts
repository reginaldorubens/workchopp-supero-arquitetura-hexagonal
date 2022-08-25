import Account from '../src/application/entities/Account';
import TransferBetweenAccountsService from '../src/application/services/TransferBetweenAccountsService';
import AccountsRepositoryMemory from '../src/infra/repositories/memory/AccountsRepositoryMemory';
import TransferBetweenAccountsRepositoryMemory from '../src/infra/repositories/memory/TransferBetweenAccountsRepositoryMemory';

const accountsRepository = new AccountsRepositoryMemory();
const transferRepository = new TransferBetweenAccountsRepositoryMemory();
const transferService = new TransferBetweenAccountsService(transferRepository, accountsRepository);

test('Should transfer amount between accounts', async function() {
  const accountFrom = new Account('1234', 1000);
  accountsRepository.save(accountFrom);
  const accountTo = new Account('5678', 200);
  accountsRepository.save(accountTo);

  await transferService.executeTransfer('1234', '5678', 200);
  
  const accountFromUpdated = await accountsRepository.get('1234');
  expect(accountFromUpdated?.getBalance()).toBe(800);
  const accountToUpdated = await accountsRepository.get('5678');
  expect(accountToUpdated?.getBalance()).toBe(400);
});
