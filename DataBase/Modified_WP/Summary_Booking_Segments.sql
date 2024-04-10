DROP VIEW IF EXISTS Summary_Booking_Segments;
CREATE VIEW `Summary_Booking_Segments` AS
SELECT
    location.id                             as 'location_id',
    location.name                           as 'location_name',
    iBookingSegment.location_id				as 'Service_Id',
    services.name							as 'Service_Name',
    SUM(iBookingSegment.number_of_people) 	as 'OccupancyBooked',
    services.max_capacity				    as 'Max_Occupancy',
    iBookingSegment.start_time        		as 'SegmentStarts',
    iBookingSegment.end_time  				as 'SegmentEnds',
    SUM(iBookingSegment.with_instructor)	as 'InstructorsBooked'
FROM  `invoice_item` as iBookingSegment
          INNER JOIN `services`
                     ON iBookingSegment.location_id = services.id
            INNER JOIN `location`
                    ON location.id = services.location_id
WHERE iBookingSegment.isDeleted = 0
GROUP BY iBookingSegment.start_time, iBookingSegment.location_id
ORDER BY iBookingSegment.start_time ASC;