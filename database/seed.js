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
  category_id INTEGER NOT NULL
);

INSERT INTO brands (brand)
VALUES ('L'oreal'), ('Black Radiance'), ('Haus Labs');

INSERT INTO categories (category)
VALUES ('Blush'), ('Bronzer'), ('Base'), ('Palette');

INSERT INTO products (name, price, brand_id, category_id)
VALUES
  ('Infallible concealer', 15.99, 1, 3),
  ('Contour palette', 6.99, 2, 4),
  ('Power Sculpt Velvet Powder Bronzer', 25.00, 3, 2)
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
