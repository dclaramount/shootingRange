USE newShootingRangeV2;
DELETE FROM instructors;
INSERT INTO instructors(name, color, isDeleted, userId)
VALUES  ('Dummmy Instructor 1',  '#9999ff', false,  1),
        ('Dummmy Instructor 2',  '#b30000', false,  1),
        ('Dummmy Instructor 3',  '#b3b300', false,  1);
