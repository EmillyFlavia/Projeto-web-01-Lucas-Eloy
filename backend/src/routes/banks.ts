import { FastifyInstance } from 'fastify';

interface Bank {
  id: number;
  name: string;
}

const banks: Bank[] = [];

export default async function banksRoutes(server: FastifyInstance) {
  server.get('/', async () => {
    return banks;
  });

  server.post('/', async (request, reply) => {
    const bank = request.body as Bank;
    banks.push(bank);
    reply.send(bank);
  });

  server.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = banks.findIndex(b => b.id === Number(id));
    if (index === -1) {
      return reply.code(404).send({ error: 'Not found' });
    }
    banks[index] = { ...banks[index], ...(request.body as Partial<Bank>) };
    reply.send(banks[index]);
  });

  server.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = banks.findIndex(b => b.id === Number(id));
    if (index === -1) {
      return reply.code(404).send({ error: 'Not found' });
    }
    banks.splice(index, 1);
    reply.send({ message: 'Deleted' });
  });
}
