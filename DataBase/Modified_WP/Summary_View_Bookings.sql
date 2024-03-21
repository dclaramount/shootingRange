DROP VIEW IF EXISTS Summary_View_Bookings;
CREATE VIEW `Summary_View_Bookings` AS
SELECT
    iItem.id                as 'id',
    iItem.invoice_id        as 'invoiceId',
    invType.type            as  'invoiceType',
    loc.name                as 'locationName',
    iItem.number_of_people  as 'occupancy',
    loc.capacity            as 'locationMaxOccupancy',
    iItem.number_of_hours   as 'length',
    iItem.with_instructor  as 'instructor',
    iItem.start_time        as 'startTime',
    iItem.end_time          as  'endTime',
    inv.is_deleted          as 'isDeleted',
    uInfo.name              as  'customerName',
    uInfo.email             as  'customerEmail',
    uInfo.phoneNumber       as  'customerPhoneNumber',
    inv.created             as  'createdOn',
    inv.updated             as  'lastModified',
    inv.parent_invoice      as  'parentInvoice'
FROM invoice_item as iItem
         INNER JOIN `location` loc
                    ON iItem.location_id = loc.id
         INNER JOIN `invoice` inv
                    ON iItem.invoice_id = inv.id
         INNER JOIN `invoice_type` invType
                    ON inv.invoice_type_id = invType.id
         INNER JOIN `user_list` uInfo
                    ON uInfo.id = inv.user_id
ORDER BY iItem.invoice_id ASC, iItem.created ASC;