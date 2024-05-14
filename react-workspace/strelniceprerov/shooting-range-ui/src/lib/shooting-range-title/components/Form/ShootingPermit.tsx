import React from 'react';
import { BookingContext } from '../Context/BookingContext';
import Tooltip from '@mui/material/Tooltip';


export function ShootingPermit(){

  const {shootingPermit, setShootingPermit, shootingPermitNumber, setShootingPermitNumber, setShootingInstructor} = React.useContext(BookingContext);

  const handleChangePermit = (e:any) => {
    setShootingPermitNumber(e.target.value);
  }
  return(
    <>
    <div className="reservation-order-row">
      <label htmlFor="select-box-location">Zbrojní průkaz</label>
      <div className="reservation-order-row-radios">
        <input checked={shootingPermit} onClick={(e) => {setShootingPermit(true)}} type="radio" name="licence" id="frm-reservationCalendar-orderForm-licence-1" required={true} data-nette-rules="[{&quot;op&quot;:&quot;:filled&quot;,&quot;msg&quot;:&quot;Prosím vyberte, jestli vlastníte zbrojní průkaz. Střelci bez zbrojního průkazu k sobě musí mít instruktora.&quot;}]" value="1"/>
        <label htmlFor="frm-reservationCalendar-orderForm-licence-1">
          Ano
        </label>
        <input checked={!shootingPermit} onClick={(e) => {setShootingPermit(false);setShootingInstructor(true);}} type="radio" name="licence" id="frm-reservationCalendar-orderForm-licence-0" required={true} data-nette-rules="[{&quot;op&quot;:&quot;:filled&quot;,&quot;msg&quot;:&quot;Prosím vyberte, jestli vlastníte zbrojní průkaz. Střelci bez zbrojního průkazu k sobě musí mít instruktora.&quot;}]" value="0"/>
        <label htmlFor="frm-reservationCalendar-orderForm-licence-0">
          Ne
        </label>
      </div>
    </div>
    {shootingPermit && 
    <Tooltip title="Pokud nemáte, napište nemám">
      <div style={{marginTop:'10px'}} className="reservation-order-row" data-tooltip data-original-title="V kalendáři vyberte kliknutím den a čas rezervace.">
        <label htmlFor="reservation-shooting-permit">Čislo Zbrojní průkaz</label>
          <input onChange={(e)=> handleChangePermit(e)} value={shootingPermitNumber} type='text' name='datetime' size={50} maxLength={50} id='reservation-shooting-permit' pattern='^[A-Z]{2}[0-9]{5}$' required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('You need format XY12345.')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
      </div> 
    </Tooltip>
    }
    </>
  )
}