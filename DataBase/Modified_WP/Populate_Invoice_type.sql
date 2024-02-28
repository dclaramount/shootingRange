INSERT INTO invoice_type(type, description, isDeleted, userId, created, updated)
VALUES  ('New_Booking',         'Registers New Booking',        false, 1,      NOW(),      NOW()),
        ('Cancelation',         'Cancels Existing Booking',     false, 1,      NOW(),      NOW());