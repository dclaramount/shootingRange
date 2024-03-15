DROP VIEW IF EXISTS Summary_Booking_Segments;
CREATE VIEW `Summary_Booking_Segments` AS
SELECT
    iBookingSegment.location_id				as 'Location_Id',
    location.name							as 'Location_Name',
    SUM(iBookingSegment.number_of_people) 	as 'OccupancyBooked',
    location.capacity						as 'Max_Occupancy',
    iBookingSegment.start_time        		as 'SegmentStarts',
    iBookingSegment.end_time  				as 'SegmentEnds',
    SUM(iBookingSegment.with_instructor)	as 'InstructorsBooked'
FROM  `invoice_item` as iBookingSegment
          INNER JOIN `location`
                     ON iBookingSegment.location_id = location.id
WHERE iBookingSegment.isDeleted = 0
GROUP BY iBookingSegment.start_time, iBookingSegment.location_id
ORDER BY iBookingSegment.start_time ASC;