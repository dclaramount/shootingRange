export type DBBlockTimeSegment = {
  id:           number;
  name:         string;
  uuid:         string;
  startTime:    Date;
  endTime:      Date;
}
export type DayPilotEvent = {
  id:           number;
  text:         string;
  start:        string;
  end:          string;
  backColor?:   string;
  uuid:         string;
} | {
  id:           number;
  text:         string;
  start:        string;
  end:          string;
  backColor:    string;
  uuid:         string;
}