import React from "react";
import { format } from "date-fns";
import { Translations } from "../types/translations";
import { AdminBookingsContext } from "../Context/AdminBookingsContext";

const BLOCKED_CELL = "occupied";
const EMPTY_OCCUPANCY = "";

type CellModel = {
  id: string; // `${isoDay} ${time}:00`
  dayIdx: number;
  time: string; // "HH:mm"
  statusClass: string; // '', 'partlyOccupied', 'occupied'
  blockedLabel?: string; // segment name prefix
  occupancyTopLabel?: string; // Free / Partially / Fully
  occupancyBottomLabel?: string; // "x/y"
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

  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(str)) return `${str}:00`;
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(str)) return str;

  const d = new Date(str);
  if (!Number.isNaN(d.getTime())) return format(d, "yyyy-MM-dd HH:mm:ss");

  return str;
};

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
      style={{ margin: "0px", padding: "0px" }}
      onClick={handleClick}
    >
      {blockedLabel ? (
        <div style={{ margin: "auto", pointerEvents: "none" }}>{blockedLabel}</div>
      ) : occupancyTopLabel ? (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", pointerEvents: "none" }}>
          <div style={{ fontSize: "xx-small", marginLeft: "auto", marginRight: "auto", pointerEvents: "none" }}>
            {occupancyTopLabel}
          </div>
          <div style={{ fontSize: "xx-small", fontWeight: "lighter", paddingRight: "5px", pointerEvents: "none" }}>
            {occupancyBottomLabel ?? ""}
          </div>
        </div>
      ) : (
        EMPTY_OCCUPANCY
      )}
    </div>
  );
});

function makeId(isoDay: string, timeHHmm: string) {
  return `${isoDay} ${timeHHmm}:00`;
}

function toYmdHmsFromIsoAndTime(isoDay: string, timeHHmm: string) {
  const d = new Date(`${isoDay} ${timeHHmm}:00`);
  return format(d, "yyyy-MM-dd HH:mm:ss");
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
    refreshManagementDashboard: refreshEntirePlugin,
    selectedWeek,
    allBlockingSegments: blockingSegments,
    isNormalComputer,
  } = React.useContext(AdminBookingsContext) as any;

  const daysOftheWeek = React.useMemo(
    () => ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"],
    []
  );

  // --- selection classes (supports range selection if you re-add it later)
  const selectedClassById = React.useMemo(() => {
    const map = new Map<string, string>();
    if (!selectedSegment || selectedSegment.length === 0) return map;
    console.log(selectedSegment);
    const len = selectedSegment.length;
    for (let i = 0; i < len; i++) {
      const id = selectedSegment[i];
      if (len === 1) map.set(id, "active first active last");
      else if (i === 0) map.set(id, "active first");
      else if (i === len - 1) map.set(id, "active last");
      else map.set(id, "active");
    }
    return map;
  }, [selectedSegment]);

  const onCellClick = React.useCallback(
    (id: string) => {
      setSelectedSegment([id]);
      setSelectedBookingDuration(defaultDuration);
    },
    [defaultDuration, setSelectedBookingDuration, setSelectedSegment]
  );

  // --- selected service locationId
  const selectedServiceLocationId = React.useMemo(() => {
    const svc = locationList?.find((ll: any) => parseInt(ll.id) === parseInt(selectedLocation));
    return svc ? parseInt(svc.locationId) : null;
  }, [locationList, selectedLocation]);

  // --- bookings lookup for selected service
  const summaryBySegmentForService = React.useMemo(() => {
    const map = new Map<string, any>();
    if (!summaryBookingSegments) return map;

    const serviceId = parseInt(selectedLocation);

    for (const row of summaryBookingSegments) {
      if (parseInt(row.serviceId) !== serviceId) continue;
      map.set(normalizeSegmentKey(row.segmentStarts), row);
    }
    return map;
  }, [summaryBookingSegments, selectedLocation]);

  // --- instructors lookup
  const summaryBySegmentForInstructors = React.useMemo(() => {
    const map = new Map<string, any>();
    if (!sumInstBookingSegments) return map;

    for (const row of sumInstBookingSegments) {
      map.set(normalizeSegmentKey(row.segmentStarts), row);
    }
    return map;
  }, [sumInstBookingSegments]);

  // --- key: `${segmentStarts}|${locationId}` => rows (across services)
  const bookingsBySegmentAndLocation = React.useMemo(() => {
    const map = new Map<string, any[]>();
    if (!summaryBookingSegments) return map;

    for (const row of summaryBookingSegments) {
      const key = `${normalizeSegmentKey(row.segmentStarts)}|${row.locationId}`;
      const arr = map.get(key);
      if (arr) arr.push(row);
      else map.set(key, [row]);
    }
    return map;
  }, [summaryBookingSegments]);

  // --- blocked lookup: `${isoDay}|${time}` => seg
  const blockedByIsoAndTime = React.useMemo(() => {
    const map = new Map<string, any>();
    if (!blockingSegments || !isoDaysOfWeek || selectedServiceLocationId == null) return map;

    // index segments by start ISO
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
        if (match) map.set(`${isoDaysOfWeek[dayIdx]}|${time}`, match);
      }
    }

    return map;
  }, [blockingSegments, isoDaysOfWeek, selectedServiceLocationId, timesToShow]);

  // --- past lookup: `${isoDay}|${time}` => boolean
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

  // --- helper: “is booked by other service” (O(1))
  const isBookedDifferentService = React.useCallback(
    (segmentStartsYmdHms: string) => {
      if (selectedServiceLocationId == null) return false;

      const key = `${normalizeSegmentKey(segmentStartsYmdHms)}|${selectedServiceLocationId}`;
      const rows = bookingsBySegmentAndLocation.get(key);
      if (!rows || rows.length === 0) return false;

      const instructorRequired = shootingInstructor ? 1 : 0;
      return rows.some(
        (r: any) =>
          parseInt(r.serviceId) !== parseInt(selectedLocation) &&
          parseInt(r.instructoresBooked) >= instructorRequired
      );
    },
    [bookingsBySegmentAndLocation, selectedLocation, selectedServiceLocationId, shootingInstructor]
  );

  // --- capacity fallback (for "0/capacity")
  const capacityForSelected = React.useMemo(() => {
    const svc = locationList?.find((ll: any) => parseInt(ll.id) === parseInt(selectedLocation));
    return svc ? parseInt(svc.capacity) : 0;
  }, [locationList, selectedLocation]);

  // --- build all cell models once
  const cellModelsByDayIdx = React.useMemo(() => {
    const models: CellModel[][] = [];

    for (let dayIdx = 0; dayIdx < daysOfWeek.length; dayIdx++) {
      const isoDay = isoDaysOfWeek[dayIdx];
      const dayCells: CellModel[] = [];

      for (const time of timesToShow) {
        const id = makeId(isoDay, time);
        const timeKey = `${isoDay}|${time}`;
        const segStarts = toYmdHmsFromIsoAndTime(isoDay, time);

        // 0) blocked
        const blockedSeg = blockedByIsoAndTime.get(timeKey);
        if (blockedSeg) {
          dayCells.push({
            id,
            dayIdx,
            time,
            statusClass: BLOCKED_CELL,
            blockedLabel: String(blockedSeg?.name ?? "").substring(0, 7),
            clickable: false,
          });
          continue;
        }

        // 1) past
        if (isPastByIsoAndTime.get(timeKey)) {
          dayCells.push({ id, dayIdx, time, statusClass: BLOCKED_CELL, clickable: false });
          continue;
        }

        // 2) other service uses same location
        if (isBookedDifferentService(segStarts)) {
          dayCells.push({ id, dayIdx, time, statusClass: BLOCKED_CELL, clickable: false });
          continue;
        }

        // 3) occupancy (pick row for view + row for location status)
        const segmentLocationStatus = summaryBySegmentForService.get(normalizeSegmentKey(segStarts));
        const filtered = shootingInstructor
          ? summaryBySegmentForInstructors.get(normalizeSegmentKey(segStarts))
          : segmentLocationStatus;

        // No row case
        if (!filtered) {
          if (shootingInstructor) {
            // match your old behavior: instructor calendar w/out row => occupied
            dayCells.push({ id, dayIdx, time, statusClass: "occupied", clickable: false });
          } else {
            dayCells.push({
              id,
              dayIdx,
              time,
              statusClass: "",
              occupancyTopLabel: Translations.BookingDashboard.Free_Segment,
              occupancyBottomLabel: `0/${capacityForSelected}`,
              clickable: true,
            });
          }
          continue;
        }

        // Fully booked location wins
        if (segmentLocationStatus?.segmentLocationFullyBooked) {
          dayCells.push({
            id,
            dayIdx,
            time,
            statusClass: "occupied",
            occupancyTopLabel: Translations.BookingDashboard.FullyOccupied,
            occupancyBottomLabel: `${filtered.maxOccupancy}/${filtered.maxOccupancy}`,
            clickable: false,
          });
          continue;
        }

        // Instructor path where we must adjust capacity
        if (segmentLocationStatus && shootingInstructor) {
          const normalBooked =
            parseInt(segmentLocationStatus.occupancyBooked) - parseInt(segmentLocationStatus.instructoresBooked);
          const leftForInstructors = parseInt(segmentLocationStatus.maxOccupancy) - normalBooked;

          const maxInstr =
            leftForInstructors >= parseInt(filtered.maxOccupancy) ? parseInt(filtered.maxOccupancy) : leftForInstructors;

          const booked = parseInt(filtered.occupancyBooked);

          if (booked >= maxInstr) {
            dayCells.push({
              id,
              dayIdx,
              time,
              statusClass: "occupied",
              occupancyTopLabel: Translations.BookingDashboard.FullyOccupied,
              occupancyBottomLabel: `${booked}/${maxInstr}`,
              clickable: false,
            });
          } else if (booked > 0) {
            dayCells.push({
              id,
              dayIdx,
              time,
              statusClass: "partlyOccupied",
              occupancyTopLabel: Translations.BookingDashboard.Partially_Occupied,
              occupancyBottomLabel: `${booked}/${maxInstr}`,
              clickable: true,
            });
          } else {
            // NOTE: your old getOccupancyStatus returned '' when instructor booked==0
            // We keep statusClass '' here (clickable).
            dayCells.push({
              id,
              dayIdx,
              time,
              statusClass: "",
              occupancyTopLabel: Translations.BookingDashboard.Free_Segment,
              occupancyBottomLabel: `${booked}/${maxInstr}`,
              clickable: true,
            });
          }
          continue;
        }

        // Instructor selected but no segmentLocationStatus => show instructor row as free/partial
        if (!segmentLocationStatus && shootingInstructor) {
          const booked = parseInt(filtered.occupancyBooked);
          dayCells.push({
            id,
            dayIdx,
            time,
            statusClass: booked === 0 ? "" : "partlyOccupied",
            occupancyTopLabel:
              booked === 0 ? Translations.BookingDashboard.Free_Segment : Translations.BookingDashboard.Partially_Occupied,
            occupancyBottomLabel: `${filtered.occupancyBooked}/${filtered.maxOccupancy}`,
            clickable: true,
          });
          continue;
        }

        // Normal bookings view
        const left = parseInt(filtered.maxOccupancy) - parseInt(filtered.occupancyBooked);
        const statusClass = left >= parseInt(selectedOccupancy) ? "partlyOccupied" : "occupied";

        dayCells.push({
          id,
          dayIdx,
          time,
          statusClass,
          occupancyTopLabel:
            parseInt(filtered.occupancyBooked) === 0
              ? Translations.BookingDashboard.Free_Segment
              : Translations.BookingDashboard.Partially_Occupied,
          occupancyBottomLabel: `${filtered.occupancyBooked}/${filtered.maxOccupancy}`,
          clickable: statusClass !== "occupied",
        });
      }

      models.push(dayCells);
    }

    return models;
  }, [
    daysOfWeek.length,
    isoDaysOfWeek,
    timesToShow,
    blockedByIsoAndTime,
    isPastByIsoAndTime,
    isBookedDifferentService,
    summaryBySegmentForService,
    summaryBySegmentForInstructors,
    selectedOccupancy,
    shootingInstructor,
    capacityForSelected,
  ]);

  // --- set available / notAvailable from cell models (consistent + cheap)
  React.useEffect(() => {
    const available: string[] = [];
    const notAvailable: string[] = [];

    for (const dayCells of cellModelsByDayIdx) {
      for (const c of dayCells) {
        if (c.clickable) available.push(c.id);
        else notAvailable.push(c.id);
      }
    }

    setAvailableSegments(available);
    setNotAvailableSegments(notAvailable);
  }, [
    cellModelsByDayIdx,
    setAvailableSegments,
    setNotAvailableSegments,
    selectedLocation,
    selectedWeek,
    shootingInstructor,
    refreshEntirePlugin,
  ]);

  return (
    <>
      {daysOfWeek.map((day: string, dayIdx: number) => (
        <div key={`day-${dayIdx}`} className="reservation-cal-table-day">
          <div className="reservation-cal-table-day-head" style={styles_header_cell.container(isNormalComputer)}>
            <span>{daysOftheWeek[dayIdx]}</span>
            <br />
            <strong>{day}</strong>
          </div>

          {cellModelsByDayIdx[dayIdx]?.map((cell) => (
            <DayCell
              key={cell.id}
              id={cell.id}
              statusClass={cell.statusClass}
              selectedClass={selectedClassById.get(cell.id) ?? ""}
              blockedLabel={cell.blockedLabel}
              occupancyTopLabel={cell.occupancyTopLabel}
              occupancyBottomLabel={cell.occupancyBottomLabel}
              onClick={onCellClick}
              clickable={cell.clickable}
            />
          ))}
        </div>
      ))}
    </>
  );
}

const styles_header_cell = {
  container: (isNormalComputer: boolean) => ({
    display: isNormalComputer ? "" : "block",
    fontSize: isNormalComputer ? "small" : "x-small",
  }),
};