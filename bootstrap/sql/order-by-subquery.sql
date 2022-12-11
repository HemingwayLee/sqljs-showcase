CREATE TABLE students
(
    [first_name] NVARCHAR(32),
    [last_name] NVARCHAR(32),
    [age] INT
);

INSERT INTO students VALUES('Kenny', 'Lee', 25);
INSERT INTO students VALUES('Hemingway', 'Li', 30);
INSERT INTO students VALUES('Rose', 'Chao', 29);
INSERT INTO students VALUES('Mark', 'Chen', 22);
INSERT INTO students VALUES('Anna', 'Lin', 35);
SELECT rowid, * FROM students;

