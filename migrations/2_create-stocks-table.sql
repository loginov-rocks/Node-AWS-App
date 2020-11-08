CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE stocks
(
    product_id UUID PRIMARY KEY NOT NULL,
    count      INT              NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id)
);
