import AccountRepository from '../repositories/AccountRepository';
import TransferBetwennAccountsRepository from '../repositories/TransferBetweenAccountsRepository';

export default class TransferBetweenAccountsService {
  transferRepository: TransferBetwennAccountsRepository;
  accountRepository: AccountRepository;

  constructor() {
    this.transferRepository = new TransferBetwennAccountsRepository();
    this.accountRepository = new AccountRepository();
  }

  async executeTransfer(accountFromId: string, accountToId: string, amount: number): Promise<void> {
    const accountFrom = await this.accountRepository.get(accountFromId);

    if (!accountFrom) {
      throw new Error('Source account not found.');
    }

    const accountTo = await this.accountRepository.get(accountToId);

    if (!accountTo) {
      throw new Error('Destination account not found.');
    }

    const accountFromCurrentBalance = accountFrom.getBalance();

    if (amount > accountFromCurrentBalance) {
      throw new Error('Inssuficient balance in source account.');
    }

    accountFrom.setBalance(accountFromCurrentBalance - amount);

    const accountToCurrentBalance = accountTo.getBalance();

    accountTo.setBalance(accountToCurrentBalance + amount);

    await this.transferRepository.persistTransfer(accountFrom, accountTo);
  }
}
