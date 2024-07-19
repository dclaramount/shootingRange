import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function BookingEmail(){

  const {email, setEmail} = React.useContext(BookingContext);
  const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";
  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  }
  return(
    <div className="reservation-order-row">
        <label htmlFor="frm-reservationCalendar-orderForm-email">
          E-mail
        </label>
        <input style={{}} onChange={(e)=> handleEmailChange(e)} value={email} type="email" name="email" maxLength={100} size={50} id="frm-reservationCalendar-orderForm-email"  pattern={emailPattern} required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Vyplňte prosím email jako format jiri.prochazka@seznam.cz')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
        {/*<input onChange={(e)=> handleEmailChange(e)} value={email} type="text" name="email" maxLength={100} size={50} id="frm-reservationCalendar-orderForm-email"  pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([a-zA-Z][a-zA-Z]))(:[0-9]{2,})?" required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Vyplňte prosím email jako format jiri.prochazka@seznam.cz')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>*/}
    </div>
  )
}