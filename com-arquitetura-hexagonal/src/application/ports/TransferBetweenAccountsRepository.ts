import Account from "../entities/Account";

export default interface TransferBetweenAccountsRepository {
  persistTransfer(accountFrom: Account, accountTo: Account): Promise<void>;
}

