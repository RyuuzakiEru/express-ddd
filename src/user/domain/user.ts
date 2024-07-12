import { ObjectId } from 'typeorm';

export class User {
  id: ObjectId;
  username: string;
  email: string;
  walletBalance: number;

  constructor(id: ObjectId, username: string, email: string, walletBalance: number) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.walletBalance = walletBalance;
  }

  static create(username: string, email: string, walletBalance: number): User {
    return new User(ObjectId.createFromTime(Date.now()), username, email, walletBalance);
  }

  deductFromWallet(amount: number): void {
    if (this.walletBalance >= amount) {
      this.walletBalance -= amount;
    } else {
      throw new Error('Insufficient funds in the wallet.');
    }
  }

  addToWallet(amount: number): void {
    this.walletBalance += amount;
  }

  hasSufficientBalance(amount: number): boolean {
    return this.walletBalance >= amount;
  }
}
