DROP VIEW IF EXISTS Summary_Instructor_Segments;
CREATE VIEW `Summary_Instructor_Segments` AS
SELECT
    iSegments.start_time        as 'SegmentStarts',
    iSegments.end_time  		as 'SegmentEnds',
    COUNT(iSegments.start_time)	as 'AvailableInstructors'
FROM  `instructor_segments` as iSegments
WHERE iSegments.isDeleted = 0
GROUP BY iSegments.start_time
ORDER BY iSegments.start_time ASC;