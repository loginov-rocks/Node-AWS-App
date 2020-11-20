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

export const createProduct = async ({ count, description, price, title }) => {
  const client = new Client(clientOptions);
  await client.connect();
  let id;

  try {
    await client.query('BEGIN');

    const result = await client.query(
        'INSERT INTO products (description, price, title) VALUES ($1, $2, $3) RETURNING id',
        [description, price, title],
    );

    id = result.rows[0].id;

    await client.query('INSERT INTO stocks (product_id, count) VALUES ($1, $2)', [id, count]);

    await client.query('COMMIT');
  } catch {
    await client.query('ROLLBACK');
  }

  await client.end();

  if (!id) {
    return undefined;
  }

  return getProductById(id);
};

export const getProductById = async (id) => {
  const client = new Client(clientOptions);
  await client.connect();
  let product;

  try {
    const result = await client.query(
        'SELECT products.*, stocks.count FROM products INNER JOIN stocks ON stocks.product_id = products.id WHERE id = $1',
        [id],
    );

    product = result.rows[0];
  } catch {
    // Do nothing.
  }

  await client.end();

  if (!product) {
    return undefined;
  }

  return product;
};

export const getProductsList = async () => {
  const client = new Client(clientOptions);
  await client.connect();

  const result = await client.query(
      'SELECT products.*, stocks.count FROM products INNER JOIN stocks ON stocks.product_id = products.id',
  );

  await client.end();

  return result.rows;
};
