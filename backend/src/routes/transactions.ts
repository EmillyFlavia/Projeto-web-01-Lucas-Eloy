import { FastifyInstance } from 'fastify';

interface Transaction {
  id: number;
  description: string;
  amount: number;
}

const transactions: Transaction[] = [];

export default async function transactionsRoutes(server: FastifyInstance) {
  server.get('/', async () => {
    return transactions;
  });

  server.post('/', async (request, reply) => {
    const transaction = request.body as Transaction;
    transactions.push(transaction);
    reply.send(transaction);
  });

  server.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = transactions.findIndex(t => t.id === Number(id));
    if (index === -1) {
      return reply.code(404).send({ error: 'Not found' });
    }
    transactions[index] = { ...transactions[index], ...(request.body as Partial<Transaction>) };
    reply.send(transactions[index]);
  });

  server.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = transactions.findIndex(t => t.id === Number(id));
    if (index === -1) {
      return reply.code(404).send({ error: 'Not found' });
    }
    transactions.splice(index, 1);
    reply.send({ message: 'Deleted' });
  });
}
