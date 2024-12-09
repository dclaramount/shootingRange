import { DBBlockTimeSegment, DayPilotEvent } from "../types/blocking-segment.types";
/* Function in charge of arranging the segments coming from the DB in order */
/*    match the require structure that the daypilot calendar requires       */
export function generateDayPilotCalendarEvents(lOfSegments: DBBlockTimeSegment []):DayPilotEvent[]{
  let returnArray : DayPilotEvent[] = [];
  lOfSegments.forEach((segment: DBBlockTimeSegment, idx: number) => {
    if(!returnArray.some((event:DayPilotEvent) => event.uuid === segment.uuid)){
      const lengthOfSegment = lOfSegments.filter((seg:DBBlockTimeSegment) => seg.uuid===segment.uuid).length;
      // const test = lOfSegments.filter((lo:any) => lo.uuid === 'df54c229-3501-82bd-0278-a146ba6b69fe');
      // console.log({start : new Date(test[0].startTime).toISOString(), end : new Date(test[0].endTime).toISOString()});
      //console.log(`The actual time is ${new Date(segment.startTime).toISOString()} and the Offset is: ${new Date(segment.startTime).getTimezoneOffset()} raw Value ${segment.startTime}` );
      //const startTime = new Date(segment.startTime).setMinutes(new Date(segment.startTime).getMinutes() -  new Date(segment.startTime).getTimezoneOffset());
      const startTime = new Date(segment.startTime).setMinutes(new Date(segment.startTime).getMinutes() - new Date(segment.startTime).getTimezoneOffset()); //Fixed the Time Zone accordingly.
      const newEvent: DayPilotEvent = {
        id:             idx+1,
        start:          new Date(startTime).toISOString(),
        end:            new Date(startTime + lengthOfSegment * 60 * 60 * 1000).toISOString(),
        backColor:      segment.color ?? 'red',
        text:           `${segment.name}`,
        uuid:           segment.uuid,
        locationId:     segment.locationId,
        instructorId:   segment.instructorId
      }
      returnArray.push(newEvent);
    }
  })
  return returnArray;
}