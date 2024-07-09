import { DBBlockTimeSegment, DayPilotEvent } from "../types/blocking-segment.types";
/* Function in charge of arranging the segments coming from the DB in order */
/*    match the require structure that the daypilot calendar requires       */
export function generateDayPilotCalendarEvents(lOfSegments: DBBlockTimeSegment []):DayPilotEvent[]{
  let returnArray : DayPilotEvent[] = [];
  lOfSegments.forEach((segment: DBBlockTimeSegment, idx: number) => {
    if(!returnArray.some((event:DayPilotEvent) => event.uuid === segment.uuid)){
      const lengthOfSegment = lOfSegments.filter((seg:DBBlockTimeSegment) => seg.uuid===segment.uuid).length;
      //const startTime = new Date(segment.startTime).setMinutes(new Date(segment.startTime).getMinutes() -  new Date(segment.startTime).getTimezoneOffset());
      const startTime = new Date(segment.startTime).setMinutes(new Date(segment.startTime).getMinutes() + 120); //We fixed the time to Prague Time which is -120 offset timezone
      const newEvent: DayPilotEvent = {
        id:             idx+1,
        start:          new Date(startTime).toISOString(),
        end:            new Date(startTime + lengthOfSegment * 60 * 60 * 1000).toISOString(),
        backColor:      segment.color ?? 'red',
        text:           `${segment.name}`,
        uuid:           segment.uuid
      }
      returnArray.push(newEvent);
    }
  })
  return returnArray;
}