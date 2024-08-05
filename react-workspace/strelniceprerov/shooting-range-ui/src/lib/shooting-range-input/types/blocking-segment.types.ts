export type DBBlockTimeSegment = {
  id:           number;
  name:         string;
  uuid:         string;
  color?:       string;
  startTime:    Date;
  endTime:      Date;
  instructorId?: number;
  locationId?:number;
}
export type BlockSegmentToCreate = {
  start:        string, 
  end:          string, 
  uuid:         string, 
  name:         string, 
  locationId:   number, 
  url:          string
}
export type DayPilotEvent = {
  id:           number;
  text:         string;
  start:        string;
  end:          string;
  backColor?:   string;
  uuid:         string;
  locationId?:   number;
} | {
  id:           number;
  text:         string;
  start:        string;
  end:          string;
  backColor:    string;
  uuid:         string;
  locationId?:   number;
}