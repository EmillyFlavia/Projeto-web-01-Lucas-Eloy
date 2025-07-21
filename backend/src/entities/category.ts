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

export class Category extends Entity {
  icon?: string | null;
  name: string;
  constructor(name: string, icon?: string | null, id?: string, createdAt?: Date, updatedAt?: Date | null) {
    super(id, createdAt, updatedAt);
    this.icon = icon;
    this.name = name;
  }
}