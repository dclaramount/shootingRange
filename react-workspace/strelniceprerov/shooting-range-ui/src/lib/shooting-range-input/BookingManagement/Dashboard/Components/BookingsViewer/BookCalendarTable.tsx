import { TimeColumnProps } from "shooting-range-ui/src/lib/shared/types";
import { TimeColumn } from "./TimeColumn";

export const BookCalendarTable = ( props: TimeColumnProps ) => (
  <div className="reservation-cal" style={{ width: '0%', height: '100%' }}>
    <TimeColumn timeToShow={props.timeToShow} />
  </div>
);