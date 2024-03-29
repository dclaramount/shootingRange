import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function BookingPhoneNumber(){

  const {phone, setPhone} = React.useContext(BookingContext);

  const handlePhoneNumberChange = (e:any) => {
    setPhone(e.target.value);
  }
  return(
    <div className="reservation-order-row">
        <label htmlFor="frm-reservationCalendar-orderForm-phone">
          Telefon
        </label>
        <input onChange={(e)=> handlePhoneNumberChange(e)} value={phone} type="text" name="phone" maxLength={50} size={50} id="frm-reservationCalendar-orderForm-phone" required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Vyplňte prosím telefon')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
    </div>
  )
}