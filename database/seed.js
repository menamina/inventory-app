require("dotenv").config();

const { Client } = require("pg");
const SQL = `
CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10,2),
  brand_id INTEGER NOT NULL,
  categories_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL
);

INSERT INTO brands (brand)
VALUES ('Loreal'), ('Black Radiance'), ('Haus Labs')
ON CONFLICT (brand) DO NOTHING;

INSERT INTO categories (category)
VALUES ('Blush'), ('Bronzer'), ('Base'), ('Palette')
ON CONFLICT (category) DO NOTHING;

INSERT INTO products (name, price, brand_id, categories_id, quantity)
VALUES
  ('Infallible concealer', 15.99, 1, 3, 200),
  ('Contour palette', 6.99, 2, 4, 300),
  ('Power Sculpt Velvet Powder Bronzer', 25.00, 3, 2, 240)
  `;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("done");
  } catch (err) {
    console.log(`seeding error: ${err}`);
  } finally {
    await client.end();
  }
}

main();
