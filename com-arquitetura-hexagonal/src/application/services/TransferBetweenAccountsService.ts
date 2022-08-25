import AccountsRepository from "../ports/AccountsRepository";
import TransferBetweenAccountsRepository from "../ports/TransferBetweenAccountsRepository";

export default class TransferBetweenAccountsService {
  constructor(private transferRepository: TransferBetweenAccountsRepository, private accountRepository: AccountsRepository) {}

  async executeTransfer(accountFromId: string, accountToId: string, amount: number): Promise<void> {
    const accountFrom = await this.accountRepository.get(accountFromId);

    if (!accountFrom) {
      throw new Error('Source account not found.');
    }

    const accountTo = await this.accountRepository.get(accountToId);

    if (!accountTo) {
      throw new Error('Destination account not found.');
    }

    accountFrom.withdrawal(amount);

    accountTo.deposit(amount);

    await this.transferRepository.persistTransfer(accountFrom, accountTo);
  }
}
