export type DBBlockTimeSegment = {
  id:           number;
  name:         string;
  uuid:         string;
  color?:       string;
  startTime:    Date;
  endTime:      Date;
  instructorId?: number;
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