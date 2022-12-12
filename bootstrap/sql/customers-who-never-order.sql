DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS orders;
CREATE TABLE customers( 
    [id] INT,
    [name] VARCHAR(32)
);

INSERT INTO customers VALUES (1, 'Tom');
INSERT INTO customers VALUES (2, 'John');
INSERT INTO customers VALUES (3, 'Chris');
INSERT INTO customers VALUES (4, 'Emma');
INSERT INTO customers VALUES (5, 'Sophia');
INSERT INTO customers VALUES (6, 'Lucy');

CREATE TABLE orders( 
    [id] INT,
    [name] VARCHAR(32),
    [customers_id] INT,
    FOREIGN KEY(customers_id) REFERENCES customers(id) ON DELETE CASCADE
);

INSERT INTO orders VALUES (1, 'Toy', 3);
INSERT INTO orders VALUES (2, 'Dog', 4);
INSERT INTO orders VALUES (3, 'Flower', 4);
INSERT INTO orders VALUES (4, 'Food', 5);

SELECT * FROM customers;
SELECT * FROM orders;
