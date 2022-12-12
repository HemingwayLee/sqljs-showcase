DROP TABLE IF EXISTS pitchers;
CREATE TABLE pitchers
(
    -- id INT PRIMARY KEY,
    name VARCHAR(64),
    type VARCHAR(16),
    num INT,
    date DATETIME
);

INSERT INTO pitchers VALUES('Chen', 'slider', 20, '2016-04-07 00:00:00.000');
INSERT INTO pitchers VALUES('Wang', 'sinker', 30, '2016-04-07 00:00:00.000');
INSERT INTO pitchers VALUES('Tanaka', 'slider', 10, '2016-04-07 00:00:00.000');
INSERT INTO pitchers VALUES('Chen', 'slider', 50, '2016-04-02 00:00:00.000');
INSERT INTO pitchers VALUES('Tanaka', 'cutter', 10, '2016-04-01 00:00:00.000');
INSERT INTO pitchers VALUES('Chen', 'slider', 30, '2016-03-17 00:00:00.000');
INSERT INTO pitchers VALUES('Chen', 'fork', 20, '2016-03-12 00:00:00.000');

SELECT rowid, * FROM pitchers;
