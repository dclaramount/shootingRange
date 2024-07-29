import React from 'react';
import { BookingContext } from './Context/BookingContext';

export function TimeColumn(){

  const {timesToShow, setTimesToShow, isNormalComputer} = React.useContext(BookingContext);
  
  return(
    <div className="reservation-cal-table-times" style={styles_times_cell.container(isNormalComputer)}>
      <div className="reservation-cal-table-times-time" style={styles_time_cell.container(isNormalComputer)}>
      </div>
      {timesToShow.map((timeToShow : string, idx: number) => {
        if(idx+1<timesToShow.length){
        return(
        <div className="reservation-cal-table-times-time" id={timeToShow} style={styles_time_cell.container(isNormalComputer)}>
            {timeToShow}:00
        </div>)}
        else{
          return(
            <div style={styles_time_cell.container(isNormalComputer)}>
              <div className="reservation-cal-table-times-time"  id={timeToShow} style={styles_time_cell.container(isNormalComputer)}>
                {timeToShow}:00
              </div>
              <div className="reservation-cal-table-times-time" id={timeToShow} style={styles_time_cell.container(isNormalComputer)}>
                {parseInt(timeToShow)+1}:00
              </div>
            </div>)
        }
      })}
    </div>)
}
const styles_times_cell = {
  container: (isNormalComputer: boolean)  => ({
    width: isNormalComputer ? 'auto' : 'auto'
  })
};
const styles_time_cell = {
  container: (isNormalComputer: boolean)  => ({
    display: isNormalComputer ? '' : 'block',
    fontSize: isNormalComputer ? '13px' : 'x-small'
  })
};