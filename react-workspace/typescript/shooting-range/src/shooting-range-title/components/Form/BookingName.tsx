import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function BookingName(){

  const {isNormalComputer, name, setName} = React.useContext(BookingContext);

  const handleNameChange = (e:any) => {
    setName(e.target.value);
  }
  return(
    <div className="reservation-order-row" style={styles.container(isNormalComputer)}>
        <label htmlFor="frm-reservationCalendar-orderForm-name">
          Jméno a příjmení
        </label>
        <input onChange={(e)=> handleNameChange(e)} value={name} type="text" name="name" maxLength={255} size={50} id="frm-reservationCalendar-orderForm-name" required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Vyplňte prosím name')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
    </div>
  )
}
const styles = {
  container: (isNormalComputer: boolean)  => ({
   marginRight:'100px',
   width: isNormalComputer ? '100%' : '100%'
  })
};