import { FastifyReply, FastifyRequest } from "fastify";
import { BankRepositoryPrisma } from "../repositories/bank-repository-prisma.js";
import { CreateBankService } from "../services/banks/create-bank-service.js";

export async function createBankController(request: FastifyRequest, reply: FastifyReply) {
  const { name } = request.body as { name: string };

  const bankRepository = new BankRepositoryPrisma();
  const createBankService = new CreateBankService(bankRepository);
  const bank = await createBankService.execute(name);

  return reply.status(201).send(bank);
}
