DROP VIEW IF EXISTS Summary_Instructor_Booking_Segments;
CREATE VIEW `Summary_Instructor_Booking_Segments` AS
SELECT
    sISegments.SegmentStarts					as 'SegmentStarts',
    sISegments.SegmentEnds						as 'SegmentEnds',
    IFNULL(sBSegments.InstructorsBooked,0)		as 'OccupancyBooked',
    sISegments.AvailableInstructors				as 'MaxOccupancy'
FROM  `Summary_Instructor_Segments` as sISegments
          LEFT JOIN `Summary_Booking_Segments` sBSegments
                    ON sISegments.SegmentStarts = sBSegments.SegmentStarts AND sBSegments.InstructorsBooked >= 1
ORDER BY sISegments.SegmentStarts ASC;