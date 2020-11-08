import { Client } from 'pg';

/**
 * Database layer.
 */
const clientOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const getProductById = async (id) => {
  const client = new Client(clientOptions);
  await client.connect();
  let result;

  try {
    result = await client.query(
        'SELECT products.*, stocks.count FROM products INNER JOIN stocks ON stocks.product_id = products.id WHERE id = $1',
        [id]);
  } catch {
    return undefined;
  }

  await client.end();

  return result.rows && result.rows[0] || undefined;
};

export const getProductsList = async () => {
  const client = new Client(clientOptions);
  await client.connect();

  const result = await client.query(
      'SELECT products.*, stocks.count FROM products INNER JOIN stocks ON stocks.product_id = products.id');

  await client.end();

  return result.rows;
};
