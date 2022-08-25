export default class Account {
  constructor(private readonly id: string, private balance: number) {

  }

  getId(): string {
    return this.id;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Invalid value for deposit.');
    }

    this.balance += amount;
  }

  withdrawal(amount: number): void {
    if (amount <= 0) {
      throw new Error('Invalid value for withdrawal.');
    }

    if (amount > this.balance) {
      throw new Error('Insufficient balance for withdrawal');
    }

    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}
