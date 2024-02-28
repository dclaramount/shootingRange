USE newShootingRangeV2;
INSERT INTO user_type(type, isDeleted, userId, created, updated)
VALUES  ('admin',       false,  1,      NOW(),      NOW()),
        ('customer',    false,  1,      NOW(),      NOW());