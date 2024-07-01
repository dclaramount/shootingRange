import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function Instructor(){

  const {shootingPermit, shootingInstructor, setShootingInstructor, setSelectedSegment} = React.useContext(BookingContext);


  return(
    <div className="reservation-order-row">
      <label htmlFor="select-box-location">Instruktor</label>
        <div className="reservation-order-row-radios" data-tooltip data-original-title="Instruktor je povinný pro střelce bez ZP.">
          <input checked={shootingInstructor} onClick={(e) => {setShootingInstructor(true); setSelectedSegment([])}} type="radio" name="instructor" id="frm-reservationCalendar-orderForm-instructor-1" value="1" />
            <label htmlFor="frm-reservationCalendar-orderForm-instructor-1">
              Ano
            </label>
            <input checked={!shootingInstructor} onClick={(e) => {if(shootingPermit){setShootingInstructor(false); setSelectedSegment([])}}} type="radio" name="instructor" id="frm-reservationCalendar-orderForm-instructor-0" value="0" />
            <label htmlFor="frm-reservationCalendar-orderForm-instructor-0">
              Ne
            </label>
        </div>
    </div>
  )
}