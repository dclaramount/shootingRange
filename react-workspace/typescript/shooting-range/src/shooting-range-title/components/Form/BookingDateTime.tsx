import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function BookingDateTime(){

  const {selectedSegment} = React.useContext(BookingContext);

  const constructValueDateAndTime = () => {
    if(selectedSegment.length===0){
      return'';
    }else{
      return selectedSegment.length>1? `${selectedSegment[0]}-${selectedSegment[selectedSegment.length-1].split(' ')[1]}` : selectedSegment[0];
    }
  }
  return(
    <div className="reservation-order-row" data-tooltip data-original-title="V kalendáři vyberte kliknutím den a čas rezervace.">
    <label htmlFor="reservation-datetime">Datum a čas</label>
      <input style={{pointerEvents:'none'}} value={constructValueDateAndTime()} type='text' name='datetime' size={50} maxLength={50} id='reservation-datetime' required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Select a segment from the calendar')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
  </div>
  )
}