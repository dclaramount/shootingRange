import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function BookingName(){

  const {name, setName} = React.useContext(BookingContext);

  const handleNameChange = (e:any) => {
    setName(e.target.value);
  }
  return(
    <div className="reservation-order-row">
        <label htmlFor="frm-reservationCalendar-orderForm-name">
          Jméno a příjmení
        </label>
        <input onChange={(e)=> handleNameChange(e)} value={name} type="text" name="name" maxLength={255} size={50} id="frm-reservationCalendar-orderForm-name" required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Vyplňte prosím name')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
    </div>
  )
}