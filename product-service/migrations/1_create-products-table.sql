CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products
(
    id          UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    title       TEXT             NOT NULL,
    description TEXT             NOT NULL,
    price       INT              NOT NULL
);
