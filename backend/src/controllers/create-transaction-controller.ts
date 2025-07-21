import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionRepositoryPrisma } from "../repositories/transaction-repository-prisma.js";
import { CreateTransactionService } from "../services/transactions/create-transaction-service.js";

export async function createTransactionController(request: FastifyRequest, reply: FastifyReply) {
  const {
    title,
    value,
    type,
    categoryId,
    bankId,
  } = request.body as {
    title: string;
    value: number;
    type: "income" | "expense";
    categoryId: string;
    bankId: string;
  };

  const transactionRepository = new TransactionRepositoryPrisma();
  const createTransactionService = new CreateTransactionService(transactionRepository);
  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    categoryId,
    bankId,
  });

  return reply.status(201).send(transaction);
}
