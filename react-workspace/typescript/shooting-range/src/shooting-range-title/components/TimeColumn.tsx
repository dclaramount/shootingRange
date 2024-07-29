import React from 'react';
import { BookingContext } from './Context/BookingContext';

export function TimeColumn(){

  const {timesToShow, setTimesToShow, isNormalComputer} = React.useContext(BookingContext);
  
  return(
    <div className="reservation-cal-table-times">
      <div className="reservation-cal-table-times-time" style={styles_time_cell.container(isNormalComputer)}>
      </div>
      {timesToShow.map((timeToShow : string, idx: number) => {
        if(idx+1<timesToShow.length){
        return(
        <div className="reservation-cal-table-times-time" id={timeToShow}>
            {timeToShow}:00
        </div>)}
        else{
          return(
            <div>
              <div className="reservation-cal-table-times-time" id={timeToShow}>
                {timeToShow}:00
              </div>
              <div className="reservation-cal-table-times-time" id={timeToShow}>
                {parseInt(timeToShow)+1}:00
              </div>
            </div>)
        }
      })}
    </div>)
}
const styles_time_cell = {
  container: (isNormalComputer: boolean)  => ({
    display: isNormalComputer ? '' : 'block'
  })
};