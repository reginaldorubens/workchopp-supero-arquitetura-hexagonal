export default class Account {
  constructor(private readonly id: string, private balance: number) {

  }

  getId(): string {
    return this.id;
  }

  getBalance(): number {
    return this.balance;
  }

  setBalance(value: number): void {
    this.balance = value;
  }
}
