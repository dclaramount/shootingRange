import { TimeColumnProps } from "../../../../../Shared/types";
import { TimeColumn } from "./TimeColumn";

export const BookCalendarTable = ( props: TimeColumnProps ) => (
  <div className="reservation-cal" style={{ width: '0%', height: '100%' }}>
    <TimeColumn timeToShow={props.timeToShow} />
  </div>
);