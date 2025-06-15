import { FastifyInstance } from 'fastify';

interface Category {
  id: number;
  name: string;
}

const categories: Category[] = [];

export default async function categoriesRoutes(server: FastifyInstance) {
  server.get('/', async () => {
    return categories;
  });

  server.post('/', async (request, reply) => {
    const category = request.body as Category;
    categories.push(category);
    reply.send(category);
  });

  server.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = categories.findIndex(c => c.id === Number(id));
    if (index === -1) {
      return reply.code(404).send({ error: 'Not found' });
    }
    categories[index] = { ...categories[index], ...(request.body as Partial<Category>) };
    reply.send(categories[index]);
  });

  server.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const index = categories.findIndex(c => c.id === Number(id));
    if (index === -1) {
      return reply.code(404).send({ error: 'Not found' });
    }
    categories.splice(index, 1);
    reply.send({ message: 'Deleted' });
  });
}
