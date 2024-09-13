DROP VIEW IF EXISTS Summary_View_Bookings_Test_View;
CREATE VIEW `Summary_View_Bookings` AS
SELECT
    iItem.id                as 'id',
    iItem.invoice_id        as 'invoiceId',
    invType.type            as  'invoiceType',
    serv.location_id        as 'locationId',
    loc.name                as 'locationName',
    serv.id                 as  'serviceId',
    serv.name               as  'serviceName',
    iItem.number_of_people  as 'occupancy',
    serv.max_capacity       as 'locationMaxOccupancy',
    iItem.number_of_hours   as 'length',
    iItem.with_instructor  as 'instructor',
    iItem.start_time        as 'startTime',
    iItem.end_time          as  'endTime',
    iItem.isDeleted         as  'invoiceItemDeleted',
    uInfo.name              as  'customerName',
    uInfo.email             as  'customerEmail',
    uInfo.phoneNumber       as  'customerPhoneNumber',
    inv.uuidInvoice         as  'uuidInvoice',
    inv.comment             as  'comment',
    uInfo.shootingPermit    as  'shootingPermit'
FROM invoice_item as iItem
    INNER JOIN `services` serv
                    ON iItem.location_id = serv.id
    INNER JOIN `location` loc
               ON serv.location_id = loc.id
    INNER JOIN `invoice` inv
               ON iItem.invoice_id = inv.id
    INNER JOIN `invoice_type` invType
               ON inv.invoice_type_id = invType.id
    INNER JOIN `user_list` uInfo
               ON uInfo.id  = inv.user_id
ORDER BY iItem.invoice_id ASC, iItem.created ASC;