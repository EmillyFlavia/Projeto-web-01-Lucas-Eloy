import { randomUUID } from "node:crypto";


type TransactionType = 'income' | 'expense';

export class Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  constructor(id?: string, createdAt?: Date, updatedAt?: Date | null) {
    this.id = id || randomUUID();
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || null;
  }
}

export class Bank extends Entity {
  ispb: string;
  name: string;
  code: string;
  fullName: string;

  constructor(ispb: string, name: string, code: string, fullName: string, id?: string, createdAt?: Date, updatedAt?: Date | null) {
    super(id, createdAt, updatedAt);
    this.ispb = ispb;
    this.name = name;
    this.code = code;
    this.fullName = fullName;
  }
}