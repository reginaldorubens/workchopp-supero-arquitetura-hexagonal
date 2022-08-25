import Account from "../entities/Account";

export default interface AccountsRepository {
  get(id: string): Promise<Account | null>;
  save(account: Account): Promise<void>;
  update(account: Account): Promise<void>;
}
