// DaysColumn.tsx (REFactored for performance)
import React from 'react';
import { format } from 'date-fns';
import { BookingContext } from './Context/BookingContext';
import { Translations } from '../types/translations';

const BLOCKED_CELL = 'occupied';
const EMPTY_OCCUPANCY = '';

type CellModel = {
  id: string; // `${isoDay} ${time}:00`
  dayIdx: number;
  time: string; // "HH:mm"
  statusClass: string; // '', 'partlyOccupied', 'occupied'
  blockedLabel?: string; // e.g. segment name prefix
  occupancyTopLabel?: string; // Free / Partially / Fully
  occupancyBottomLabel?: string; // "x/y" or "0/y"
  clickable: boolean;
};

type DayCellProps = {
  id: string;
  statusClass: string;
  selectedClass: string;
  blockedLabel?: string;
  occupancyTopLabel?: string;
  occupancyBottomLabel?: string;
  onClick: (id: string) => void;
  clickable: boolean;
};
const normalizeSegmentKey = (s: string) => {
  const str = String(s).trim();

  // If you ever have "YYYY-MM-DD HH:mm", make it "YYYY-MM-DD HH:mm:00"
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(str)) return `${str}:00`;

  // If already "YYYY-MM-DD HH:mm:ss", keep it
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(str)) return str;

  // If ISO like "YYYY-MM-DDTHH:mm:ss.sssZ", convert to "YYYY-MM-DD HH:mm:ss" (local)
  const d = new Date(str);
  if (!Number.isNaN(d.getTime())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
  }

  // Fallback: return as-is
  return str;
};
// ✅ Memoized cell: only re-renders when its own props change
const DayCell = React.memo(function DayCell({
  id,
  statusClass,
  selectedClass,
  blockedLabel,
  occupancyTopLabel,
  occupancyBottomLabel,
  onClick,
  clickable,
}: DayCellProps) {
  const handleClick = React.useCallback(() => {
    if (clickable) onClick(id);
  }, [clickable, id, onClick]);

  return (
    <div
      className={`reservation-cal-table-day-block ${statusClass} ${selectedClass}`}
      id={id}
      style={{ margin: '0px', padding: '0px' }}
      onClick={handleClick}
    >
      {/* Blocked reason has priority */}
      {blockedLabel ? (
        <div style={{ margin: 'auto', pointerEvents: 'none' }}>{blockedLabel}</div>
      ) : occupancyTopLabel ? (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
          <div style={{ fontSize: 'xx-small', marginLeft: 'auto', marginRight: 'auto', pointerEvents: 'none' }}>
            {occupancyTopLabel}
          </div>
          <div style={{ fontSize: 'xx-small', fontWeight: 'lighter', paddingRight: '5px', pointerEvents: 'none' }}>
            {occupancyBottomLabel ?? ''}
          </div>
        </div>
      ) : (
        EMPTY_OCCUPANCY
      )}
    </div>
  );
});

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function makeSegmentKey(isoDay: string, timeHHmm: string) {
  return `${isoDay} ${timeHHmm}:00`;
}

function toYmdHmsFromIsoAndTime(isoDay: string, timeHHmm: string) {
  // Your original code used `new Date(`${isoDay} ${time}`)` then format -> same behavior.
  const d = new Date(`${isoDay} ${timeHHmm}:00`);
  return format(d, 'yyyy-MM-dd HH:mm:ss');
}

function buildTodayUtcComparable() {
  const now = new Date();
  return new Date(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() + now.getTimezoneOffset() / 60,
      0,
      0,
      0
    )
  ).getTime();
}

export function DaysColumn() {
  const {
    locationList,
    timesToShow,
    daysOfWeek,
    selectedSegment,
    setSelectedSegment,
    isoDaysOfWeek,
    selectedOccupancy,
    setAvailableSegments,
    setSelectedBookingDuration,
    setNotAvailableSegments,
    defaultDuration,
    summaryBookingSegments,
    selectedLocation,
    sumInstBookingSegments,
    shootingInstructor,
    refreshEntirePlugin,
    selectedWeek,
    blockingSegments,
    isNormalComputer,
  } = React.useContext(BookingContext);

  const daysOftheWeek = React.useMemo(
    () => ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'],
    []
  );

  // ✅ O(1) selection lookup
  const selectedSet = React.useMemo(() => new Set(selectedSegment), [selectedSegment]);

  // ✅ Selected class computation (cheap & independent)
  const selectedClassById = React.useMemo(() => {
    const map = new Map<string, string>();
    if (!selectedSegment || selectedSegment.length === 0) return map;
    console.log("Executed SelectedByCalssId");
    const len = selectedSegment.length;
    for (let i = 0; i < len; i++) {
      const id = selectedSegment[i];
      if (len === 1) {
        map.set(id, 'active first active last');
      } else if (i === 0) {
        map.set(id, 'active first');
      } else if (i === len - 1) {
        map.set(id, 'active last');
      } else {
        map.set(id, 'active');
      }
    }
    return map;
  }, [selectedSegment]);
  console.log(selectedSegment)
  // ✅ Stable click handler
  const onCellClick = React.useCallback(
    (id: string) => {
      // This replicates your old behavior: select exactly one segment, reset duration
      // Also blocks clicking occupied cells by checking cell model's clickable prop in DayCell.
      setSelectedSegment([id]);
      setSelectedBookingDuration(defaultDuration);
    },
    [defaultDuration, setSelectedBookingDuration, setSelectedSegment]
  );

  // Resolve selected service location once
  const selectedServiceLocationId = React.useMemo(() => {
    const svc = locationList?.find((ll: any) => parseInt(ll.id) === parseInt(selectedLocation));
    return svc ? parseInt(svc.locationId) : null;
  }, [locationList, selectedLocation]);

  // ✅ Precompute maps for fast lookup
  // This is the list of segments booked for the given service for the given week.
  const summaryBySegmentForService = React.useMemo(() => {
    const map = new Map<string, any>();
    if (!summaryBookingSegments) return map;
  
    const serviceId = parseInt(selectedLocation);
  
    // Guard: if selectedWeek isn’t ready yet, return empty map
    if (!selectedWeek?.firstDay || !selectedWeek?.lastDay) return map;
  
    // Build week bounds (inclusive)
    const weekStart = new Date(selectedWeek.firstDay);
    weekStart.setHours(0, 0, 0, 0);
  
    const weekEnd = new Date(selectedWeek.lastDay);
    weekEnd.setHours(23, 59, 59, 999);
  
    const startMs = weekStart.getTime();
    const endMs = weekEnd.getTime();
  
    for (const row of summaryBookingSegments) {
      if (parseInt(row.serviceId) !== serviceId) continue;
  
      // Parse row date once and filter to this week
      const rowDate = new Date(row.segmentStarts);
      const rowMs = rowDate.getTime();
      if (Number.isNaN(rowMs)) continue;
      if (rowMs < startMs || rowMs > endMs) continue;
  
      map.set(normalizeSegmentKey(row.segmentStarts), row);
    }
    console.log('summaryBySegmentForService (segments booked for service)', map);
    return map;
  }, [summaryBookingSegments, selectedLocation, selectedWeek]);
  const summaryBySegmentForInstructors = React.useMemo(() => {
    const map = new Map<string, any>();
    if (!sumInstBookingSegments) return map;
  
    if (!selectedWeek?.firstDay || !selectedWeek?.lastDay) return map;
  
    // Week bounds
    const weekStart = new Date(selectedWeek.firstDay);
    weekStart.setHours(0, 0, 0, 0);
  
    const weekEnd = new Date(selectedWeek.lastDay);
    weekEnd.setHours(23, 59, 59, 999);
  
    const startMs = weekStart.getTime();
    const endMs = weekEnd.getTime();
  
    for (const row of sumInstBookingSegments) {
      const rowDate = new Date(row.segmentStarts);
      const rowMs = rowDate.getTime();
      if (Number.isNaN(rowMs)) continue;
      if (rowMs < startMs || rowMs > endMs) continue;
  
      map.set(normalizeSegmentKey(row.segmentStarts), row);
    }
    console.log('summaryBySegmentForInstructors (segments booked for instructors)', map);
    return map;
  }, [sumInstBookingSegments, selectedWeek]);

  const summaryRowsSameSegment = React.useMemo(() => {
    // key: segmentStarts -> array of all rows for that segment (across services)
    const map = new Map<string, any[]>();
    if (!summaryBookingSegments) return map;
    for (const row of summaryBookingSegments) {
      const k = row.segmentStarts;
      const arr = map.get(k);
      if (arr) arr.push(row);
      else map.set(k, [row]);
    }
    return map;
  }, [summaryBookingSegments]);

  const blockedByIsoAndHour = React.useMemo(() => {
    // key: `${isoDay}|${hour}` -> blocked segment object for selected service's location (or locationId==3)
    const map = new Map<string, any>();

    if (!blockingSegments || !isoDaysOfWeek || selectedServiceLocationId == null) return map;

    // We match your original logic:
    // - convert isoDaysOfWeek[idx] to a Date
    // - build Date.UTC(Y,M,D,hour,0,0,0)
    // - then add timezone offset hours
    // - compare to seg.startTime ISO equality
    //
    // We'll precompute per day+hour by scanning blockingSegments ONCE and mapping those that apply.
    // To avoid N*M work, build a map of startTimeISOString -> segment(s) first.
    const byStartIso = new Map<string, any[]>();
    for (const seg of blockingSegments) {
      const k = new Date(seg.startTime).toISOString();
      const arr = byStartIso.get(k);
      if (arr) arr.push(seg);
      else byStartIso.set(k, [seg]);
    }

    for (let dayIdx = 0; dayIdx < isoDaysOfWeek.length; dayIdx++) {
      const dateObject = new Date(isoDaysOfWeek[dayIdx]);
      const factorHours = dateObject.getTimezoneOffset() / 60;

      for (const time of timesToShow) {
        const hour = parseInt(time, 10);
        const currentDayToAnalyze = new Date(
          Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), hour, 0, 0, 0)
        );
        currentDayToAnalyze.setHours(currentDayToAnalyze.getHours() + factorHours);
        const startIso = currentDayToAnalyze.toISOString();

        const candidates = byStartIso.get(startIso);
        if (!candidates) continue;

        const match = candidates.find(
          (seg: any) => seg.locationId === selectedServiceLocationId || seg.locationId === 3
        );
        if (match) {
          map.set(`${isoDaysOfWeek[dayIdx]}|${time}`, match);
        }
      }
    }

    return map;
    // timesToShow matters here (we iterate it)
  }, [blockingSegments, isoDaysOfWeek, selectedServiceLocationId, timesToShow]);

  // ✅ Precompute "is in past" per dayIdx+time once
  const isPastByIsoAndTime = React.useMemo(() => {
    const map = new Map<string, boolean>();
    if (!isoDaysOfWeek) return map;

    const todayUtc = buildTodayUtcComparable();
    for (let dayIdx = 0; dayIdx < isoDaysOfWeek.length; dayIdx++) {
      const dateObject = new Date(isoDaysOfWeek[dayIdx]);
      for (const time of timesToShow) {
        const hour = parseInt(time, 10);
        const currentDayToAnalyze = new Date(
          Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), hour - 2, 0, 0, 0)
        ).getTime();
        map.set(`${isoDaysOfWeek[dayIdx]}|${time}`, todayUtc > currentDayToAnalyze);
      }
    }
    return map;
  }, [isoDaysOfWeek, timesToShow]);

  // ✅ Compute availability arrays ONCE (and fast) using precomputed maps
  React.useEffect(() => {
    const available: string[] = [];
    const notAvailable: string[] = [];
    const isBlocked = (isoDay: string, time: string) => {
      // if you already store keys as `${isoDay}|${time}`
      return blockedByIsoAndHour.has(`${isoDay}|${time}`);
    };
    
    const isPast = (isoDay: string, time: string) => {
      return isPastByIsoAndTime.get(`${isoDay}|${time}`) === true;
    };

    for (let dayIdx = 0; dayIdx < daysOfWeek.length; dayIdx++) {
      const isoDay = isoDaysOfWeek[dayIdx];
    
      for (const time of timesToShow) {
        const id = makeSegmentKey(isoDay, time); // `${isoDay} ${time}:00`
        const timeSegmentYmdHms = toYmdHmsFromIsoAndTime(isoDay, time);
    
        // ✅ 0) blocked segments win immediately
        if (isBlocked(isoDay, time)) {
          notAvailable.push(id);
          continue;
        }
    
        // ✅ 1) past segments not selectable
        if (isPast(isoDay, time)) {
          notAvailable.push(id);
          continue;
        }
    
        // ✅ 2) if location is booked by another service => not available
        if (isBookedDifferentService(timeSegmentYmdHms)) {
          notAvailable.push(id);
          continue;
        }
    
        // ✅ 3) only now check booking occupancy/instructor rules
        const segmentLocationStatus = summaryBySegmentForService.get(normalizeSegmentKey(timeSegmentYmdHms));
        const filteredValue = shootingInstructor
          ? summaryBySegmentForInstructors.get(normalizeSegmentKey(timeSegmentYmdHms))
          : segmentLocationStatus;
    
        let isAvailable = true;
    
        if (filteredValue) {
          if (!shootingInstructor) {
            isAvailable = parseInt(filteredValue.occupancyBooked) < parseInt(filteredValue.maxOccupancy);
          } else {
            if (segmentLocationStatus) {
              const shouldBeBlocked =
                parseInt(segmentLocationStatus.occupancyBooked) >= parseInt(segmentLocationStatus.maxOccupancy) &&
                parseInt(filteredValue.occupancyBooked) >= parseInt(filteredValue.maxOccupancy);
    
              isAvailable = !shouldBeBlocked;
            } else {
              isAvailable = true;
            }
          }
        } else {
          // same behavior as your original function
          isAvailable = shootingInstructor ? false : true;
        }
    
        if (isAvailable) available.push(id);
        else notAvailable.push(id);
      }
    }
    console.log('available sample', available.slice(0, 5));
    setAvailableSegments(available);
    console.log('notAvailable sample', notAvailable.slice(0, 5));
    setNotAvailableSegments(notAvailable);
  }, [
    daysOfWeek.length,
    isoDaysOfWeek,
    timesToShow,
    shootingInstructor,
    selectedLocation,
    selectedWeek, // keep as you had
    refreshEntirePlugin,
    setAvailableSegments,
    setNotAvailableSegments,
    summaryBySegmentForService,
    summaryBySegmentForInstructors,
  ]);
  const isBookedDifferentService = (
    timeSegmentYmdHms: string
  ): boolean => {
    const location = locationList.find(
      (ll: any) => parseInt(ll.id) === parseInt(selectedLocation)
    );
    if (!location) return false;
  
    const key = `${normalizeSegmentKey(timeSegmentYmdHms)}|${location.locationId}`;
    const bookings = bookingsBySegmentAndLocation.get(key);
    if (!bookings || bookings.length === 0) return false;
  
    const instructorRequired = shootingInstructor ? 1 : 0;
  
    return bookings.some((b: any) =>
      parseInt(b.serviceId) !== parseInt(selectedLocation) &&
      parseInt(b.instructoresBooked) >= instructorRequired
    );
  };
  const bookingsBySegmentAndLocation = React.useMemo(() => {
    const map = new Map<string, any[]>();
    if (!summaryBookingSegments) return map;
  
    for (const row of summaryBookingSegments) {
      const key = `${normalizeSegmentKey(row.segmentStarts)}|${row.locationId}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(row);
    }
    return map;
  }, [summaryBookingSegments]);
  // ✅ Compute all cell models ONCE per dependency set (NOT per click)
  // IMPORTANT: selection is intentionally NOT a dependency
  const cellModelsByDayIdx = React.useMemo(() => {
    const models: CellModel[][] = [];

    // helper to compute "location booked in different service" fast
    const isBookedDifferentService = (timeSegmentYmdHms: string) => {
      if (selectedServiceLocationId == null) return false;
      const instructorMin = shootingInstructor ? 1 : 0;
      const rows = summaryRowsSameSegment.get(timeSegmentYmdHms);
      if (!rows || rows.length === 0) return false;

      const bookingsForSameLocation = rows.filter(
        (r) => parseInt(r.locationId) === selectedServiceLocationId && parseInt(r.instructoresBooked) >= instructorMin
      );
      if (bookingsForSameLocation.length === 0) return false;

      return bookingsForSameLocation.some((r) => parseInt(r.serviceId) !== parseInt(selectedLocation));
    };

    const capacityForSelected = (() => {
      const svc = locationList?.find((ll: any) => parseInt(ll.id) === parseInt(selectedLocation));
      return svc ? parseInt(svc.capacity) : 0;
    })();

    for (let dayIdx = 0; dayIdx < daysOfWeek.length; dayIdx++) {
      const day = daysOfWeek[dayIdx];
      const isoDay = isoDaysOfWeek[dayIdx];
      const dayCells: CellModel[] = [];

      for (const time of timesToShow) {
        const id = makeSegmentKey(isoDay, time);
        const timeKey = `${isoDay}|${time}`;
        const timeSegmentYmdHms = toYmdHmsFromIsoAndTime(isoDay, time);

        // 0) blocked segment?
        const blockedSeg = blockedByIsoAndHour.get(`${isoDay}|${time}`);
        if (blockedSeg) {
          dayCells.push({
            id,
            dayIdx,
            time,
            statusClass: BLOCKED_CELL,
            blockedLabel: String(blockedSeg.name ?? '').substring(0, 6),
            clickable: false,
          });
          continue;
        }

        // 1) in past?
        if (isPastByIsoAndTime.get(timeKey)) {
          dayCells.push({
            id,
            dayIdx,
            time,
            statusClass: BLOCKED_CELL,
            clickable: false,
          });
          continue;
        }

        // 2) location booked in different service?
        if (isBookedDifferentService(timeSegmentYmdHms)) {
          dayCells.push({
            id,
            dayIdx,
            time,
            statusClass: BLOCKED_CELL,
            clickable: false,
          });
          continue;
        }

        // 3) occupancy + status
        const segmentLocationStatus = summaryBySegmentForService.get(timeSegmentYmdHms);
        const filteredValue = shootingInstructor
          ? summaryBySegmentForInstructors.get(timeSegmentYmdHms)
          : summaryBySegmentForService.get(timeSegmentYmdHms);

        // Base case: no data
        if (!filteredValue) {
          if (shootingInstructor) {
            // keep your behavior: instructor calendar with no row => occupied
            dayCells.push({
              id,
              dayIdx,
              time,
              statusClass: 'occupied',
              clickable: false,
            });
          } else {
            dayCells.push({
              id,
              dayIdx,
              time,
              statusClass: '',
              occupancyTopLabel: Translations.BookingDashboard.Free_Segment,
              occupancyBottomLabel: `0/${capacityForSelected}`,
              clickable: true,
            });
          }
          continue;
        }

        // If location fully booked -> occupied & show full
        if (segmentLocationStatus && segmentLocationStatus.segmentLocationFullyBooked) {
          dayCells.push({
            id,
            dayIdx,
            time,
            statusClass: 'occupied',
            occupancyTopLabel: Translations.BookingDashboard.FullyOccupied,
            occupancyBottomLabel: `${filteredValue.maxOccupancy}/${filteredValue.maxOccupancy}`,
            clickable: false,
          });
          continue;
        }

        // Instructor path
        if (segmentLocationStatus && shootingInstructor) {
          const normalOccupancyBookedLocation =
            parseInt(segmentLocationStatus.occupancyBooked) - parseInt(segmentLocationStatus.instructoresBooked);
          const occupancyLeftForInstructors = parseInt(segmentLocationStatus.maxOccupancy) - normalOccupancyBookedLocation;
          const maxOccInstr =
            occupancyLeftForInstructors >= parseInt(filteredValue.maxOccupancy)
              ? parseInt(filteredValue.maxOccupancy)
              : occupancyLeftForInstructors;

          const occBooked = parseInt(filteredValue.occupancyBooked);

          if (occBooked >= maxOccInstr) {
            dayCells.push({
              id,
              dayIdx,
              time,
              statusClass: 'occupied',
              occupancyTopLabel: Translations.BookingDashboard.FullyOccupied,
              occupancyBottomLabel: `${occBooked}/${maxOccInstr}`,
              clickable: false,
            });
          } else if (occBooked > 0) {
            dayCells.push({
              id,
              dayIdx,
              time,
              statusClass: 'partlyOccupied',
              occupancyTopLabel: Translations.BookingDashboard.Partially_Occupied,
              occupancyBottomLabel: `${occBooked}/${maxOccInstr}`,
              clickable: true,
            });
          } else {
            dayCells.push({
              id,
              dayIdx,
              time,
              statusClass: '',
              occupancyTopLabel: Translations.BookingDashboard.Free_Segment,
              occupancyBottomLabel: `${occBooked}/${maxOccInstr}`,
              clickable: true,
            });
          }
          continue;
        }

        // Instructor selected but no segmentLocationStatus => free
        if (!segmentLocationStatus && shootingInstructor) {
          dayCells.push({
            id,
            dayIdx,
            time,
            statusClass: '',
            occupancyTopLabel: Translations.BookingDashboard.Free_Segment,
            occupancyBottomLabel: `${filteredValue.occupancyBooked}/${filteredValue.maxOccupancy}`,
            clickable: true,
          });
          continue;
        }

        // Normal bookings (not instructor)
        const left = parseInt(filteredValue.maxOccupancy) - parseInt(filteredValue.occupancyBooked);
        const statusClass =
          left >= parseInt(selectedOccupancy) ? 'partlyOccupied' : 'occupied';

        // Your getOccupancyStatus special case for instructor with 0 occupancy -> '' was handled above

        dayCells.push({
          id,
          dayIdx,
          time,
          statusClass,
          occupancyTopLabel: Translations.BookingDashboard.Partially_Occupied,
          occupancyBottomLabel: `${filteredValue.occupancyBooked}/${filteredValue.maxOccupancy}`,
          clickable: statusClass !== 'occupied',
        });
      }

      models.push(dayCells);
    }

    return models;
  }, [
    daysOfWeek,
    isoDaysOfWeek,
    timesToShow,
    selectedLocation,
    selectedOccupancy,
    shootingInstructor,
    locationList,
    selectedServiceLocationId,
    blockedByIsoAndHour,
    isPastByIsoAndTime,
    summaryBySegmentForService,
    summaryBySegmentForInstructors,
    summaryRowsSameSegment,
  ]);

  return (
    <>
      {daysOfWeek.map((day: string, dayIdx: number) => {
        return (
          <div className="reservation-cal-table-day" key={`day-${dayIdx}`}>
            <div className="reservation-cal-table-day-head" style={styles_header_cell.container(isNormalComputer)}>
              <span>{daysOftheWeek[dayIdx]}</span>
              <br />
              <strong>{day}</strong>
            </div>

            {cellModelsByDayIdx[dayIdx]?.map((cell) => {
              const selectedClass = selectedClassById.get(cell.id) ?? '';
              return (
                <DayCell
                  key={cell.id}
                  id={cell.id}
                  statusClass={cell.statusClass}
                  selectedClass={selectedClass}
                  blockedLabel={cell.blockedLabel}
                  occupancyTopLabel={cell.occupancyTopLabel}
                  occupancyBottomLabel={cell.occupancyBottomLabel}
                  onClick={onCellClick}
                  clickable={cell.clickable}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

const styles_header_cell = {
  container: (isNormalComputer: boolean) => ({
    display: isNormalComputer ? '' : 'block',
  }),
};