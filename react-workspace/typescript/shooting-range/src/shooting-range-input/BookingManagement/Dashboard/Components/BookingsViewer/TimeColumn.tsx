import { TimeColumnProps } from "../../../../../Shared/types"

export function TimeColumn ( props: TimeColumnProps ) {

  return (
    <div className="reservation-cal-table-times">
      <div className="reservation-cal-table-times-time">
      </div>
      {props.timeToShow.map( ( timeToShow: string, idx: number ) => {
        if ( idx + 1 < props.timeToShow.length ) {
          return (
            <div className="reservation-cal-table-times-time" id={timeToShow}>
              {timeToShow}:00
            </div> )
        }
        else {
          return (
            <div>
              <div className="reservation-cal-table-times-time" id={timeToShow}>
                {timeToShow}:00
              </div>
              <div className="reservation-cal-table-times-time" id={timeToShow}>
                {parseInt( timeToShow ) + 1}:00
              </div>
            </div> )
        }
      } )}
    </div> )
}