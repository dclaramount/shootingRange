import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function BookingEmail(){

  const {email, setEmail} = React.useContext(BookingContext);

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  }
  return(
    <div className="reservation-order-row">
        <label htmlFor="frm-reservationCalendar-orderForm-email">
          E-mail
        </label>
        <input onChange={(e)=> handleEmailChange(e)} value={email} type="text" name="email" maxLength={100} size={50} id="frm-reservationCalendar-orderForm-email" onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Vyplňte prosím email')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
    </div>
  )
}