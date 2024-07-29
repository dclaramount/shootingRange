import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function BookingEmail(){

  const {isNormalComputer, email, setEmail} = React.useContext(BookingContext);
  const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";
  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  }
  return(
    <div className="reservation-order-row" style={styles.container(isNormalComputer)}>
        <label style={stylesLabelField.container(isNormalComputer)} htmlFor="frm-reservationCalendar-orderForm-email">
          E-mail
        </label>
        <input style={stylesInputField.container(isNormalComputer)} onChange={(e)=> handleEmailChange(e)} value={email} type="email" name="email" maxLength={100} size={50} id="frm-reservationCalendar-orderForm-email"  pattern={emailPattern} required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Vyplňte prosím email jako format jiri.prochazka@seznam.cz')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
        {/*<input onChange={(e)=> handleEmailChange(e)} value={email} type="text" name="email" maxLength={100} size={50} id="frm-reservationCalendar-orderForm-email"  pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([a-zA-Z][a-zA-Z]))(:[0-9]{2,})?" required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Vyplňte prosím email jako format jiri.prochazka@seznam.cz')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>*/}
    </div>
  )
}
const styles = {
  container: (isNormalComputer: boolean)  => ({
   marginRight:'100px',
   width: isNormalComputer ? '100%' : '100%'
  })
};
const stylesLabelField = {
  container: (isNormalComputer: boolean)  => ({
    position:       'absolute' as React.CSSProperties["position"],
    top:            '4px',
    left:           '10px',
    fontSize:       '12px',
    width:          '100%',
    color:          '#888',
    fontWeight:     '400',
    fontFamily:     "'Open Sans', Arial, sans-serif",
    zIndex:         '1'
  })
}
const stylesInputField = {
  container: (isNormalComputer: boolean)  => ({
    width:          '100%',
    border:         '1px solid #aaa',
    fontSize:       '14px',
    paddingTop:     '24px',
    height:         '50px',
    borderRadius:   '5px',
    paddingLeft:    '10px',
    paddingBottom:  '5px',
    fontWeight:     'bolder',
  })
}