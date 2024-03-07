import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function BookingDateTime(){

  const {selectedSegment, setSelectedSegment} = React.useContext(BookingContext);

  return(
    <div className="reservation-order-row" data-tooltip data-original-title="V kalendáři vyberte kliknutím den a čas rezervace.">
    <label htmlFor="reservation-datetime">Datum a čas</label>
      <input value={selectedSegment} type='text' name='datetime' size={50} maxLength={50} id='reservation-datetime' readOnly={true} required={true} data-nette-rules="[{&quot;op&quot;:&quot;:filled&quot;,&quot;msg&quot;:&quot;Vyplňte prosím datetime&quot;}]"/>
  </div>
  )
}