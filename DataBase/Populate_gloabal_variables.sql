USE newShootingRangeV2;
DELETE FROM global_variables;
INSERT INTO global_variables(name, value, comment, userId)
VALUES  ('Start_Business_Hours',                '9',                                                                                                                                    'The start of the bussines hours of the Shooting Range', 1),
        ('End_Business_Hours',                  '21',                                                                                                                                   'The end of the bussines hours of the Shooting Range', 1),
        ('Start_Day_Hours',                     '8',                                                                                                                                    'The start of the day calendar for bookings and other functions.', 1),
        ('End_Day_Hours',                       '22',                                                                                                                                   'The end of the day calendar for bookings and other functions.', 1),
        ('API_URL',                             'https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/',                                                               'The Root Folder where the API endpoints are.', 1),
        ('Default_Location',                    '1',                                                                                                                                    'The Default Location for the DropwDown of Services', 1),
        ('Max_Occupancy',                       '3',                                                                                                                                    'The Max Occupancy for booking flow.', 1),
        ('Max_Length_Booking',                  '3',                                                                                                                                    'The max length of a booking.', 1),
        ('Default_Booking_Length',              '1',                                                                                                                                    'The max booking length in hours.', 1),
        ('Default_Booking_Occupancy',           '1',                                                                                                                                    'The max booking occupancy in number of people (e.g. 3.', 1),
        ('Alert_Message_Slot_Full',             'Vybral/a jste čas, který přesahuje do rezervace, která je plná. Prosíme o vybránní nového času nebo zkrácení doby rezervace.',         'The max length of a booking.', 1),
        ('Alert_Message_Occupancy',             'Vybral/a jste čas, na který už je nahlášen maximální počet návštěvníků. Prosíme o vybrání nového času.',                               'The max length of a booking.', 1);
