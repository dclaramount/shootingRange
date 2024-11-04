import React from 'react';
import { AdminBookingsContext } from '../Context/AdminBookingsContext';


export function Instructor(){

  const {isNormalComputer, shootingPermit, shootingInstructor, setShootingInstructor, setSelectedSegment} = React.useContext(AdminBookingsContext);


  return(
    <div className="reservation-order-row" style={stylesCheckBox.container(isNormalComputer)}>
      <label htmlFor="select-box-location">Instruktor</label>
        <div style={stylesCheckBox2.container(isNormalComputer)} className="reservation-order-row-radios" data-tooltip data-original-title="Instruktor je povinný pro střelce bez ZP.">
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
const stylesCheckBox = {
  container: (isNormalComputer: boolean)  => ({
  width: isNormalComputer ? 'unset' : '100%',
   margin: isNormalComputer ? 'unset' : '0 auto 0 auto'
  })
};
const stylesCheckBox2 = {
  container: (isNormalComputer: boolean)  => ({
   justifyContent: isNormalComputer ? 'unset' : 'center'
  })
};