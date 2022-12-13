--Setup--
CREATE TABLE students
(
  [name] NVARCHAR(32),
  [age] INT
);

INSERT INTO students VALUES('Chris', 17);
INSERT INTO students VALUES('Chris', 13);
INSERT INTO students VALUES('Chris', 18);
INSERT INTO students VALUES('James', 21);
INSERT INTO students VALUES('James', 27);
INSERT INTO students VALUES('Hemingway', 28);
SELECT rowid, * FROM students;
