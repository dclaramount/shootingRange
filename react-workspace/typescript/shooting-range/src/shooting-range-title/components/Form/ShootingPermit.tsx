import React from 'react';
import { BookingContext } from '../Context/BookingContext';
import Tooltip from '@mui/material/Tooltip';


export function ShootingPermit(){

  const {isNormalComputer, shootingPermit, setShootingPermit, shootingPermitNumber, setShootingPermitNumber, setShootingInstructor, setSelectedSegment} = React.useContext(BookingContext);

  const handleChangePermit = (e:any) => {
    setShootingPermitNumber(e.target.value);
  }
  return(
    <>
    <div className="reservation-order-row" style={stylesCheckBox.container(isNormalComputer)}>
      <label htmlFor="select-box-location">Zbrojní průkaz</label>
      <div className="reservation-order-row-radios" style={stylesCheckBox2.container(isNormalComputer)}>
        <input checked={shootingPermit} onClick={(e) => {setShootingPermit(true);setShootingInstructor(false); setSelectedSegment([])}} type="radio" name="licence" id="frm-reservationCalendar-orderForm-licence-1" required={true} data-nette-rules="[{&quot;op&quot;:&quot;:filled&quot;,&quot;msg&quot;:&quot;Prosím vyberte, jestli vlastníte zbrojní průkaz. Střelci bez zbrojního průkazu k sobě musí mít instruktora.&quot;}]" value="1"/>
        <label htmlFor="frm-reservationCalendar-orderForm-licence-1">
          Ano
        </label>
        <input checked={!shootingPermit} onClick={(e) => {setShootingPermit(false);setShootingInstructor(true); setSelectedSegment([])}} type="radio" name="licence" id="frm-reservationCalendar-orderForm-licence-0" required={true} data-nette-rules="[{&quot;op&quot;:&quot;:filled&quot;,&quot;msg&quot;:&quot;Prosím vyberte, jestli vlastníte zbrojní průkaz. Střelci bez zbrojního průkazu k sobě musí mít instruktora.&quot;}]" value="0"/>
        <label htmlFor="frm-reservationCalendar-orderForm-licence-0">
          Ne
        </label>
      </div>
    </div>
    {shootingPermit && 
    <Tooltip title="You need format ZP-12345">
      <div style={styles.container(isNormalComputer)} className="reservation-order-row" data-tooltip data-original-title="V kalendáři vyberte kliknutím den a čas rezervace.">
        <label htmlFor="reservation-shooting-permit">Čislo Zbrojní průkaz</label>
          <input onChange={(e)=> handleChangePermit(e)} value={shootingPermitNumber} type='text' name='datetime' size={50} maxLength={50} id='reservation-shooting-permit' pattern='^[A-Z]{2}[0-9]{6}$' required={true} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('You need format ZP123456.')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
      </div> 
    </Tooltip>
    }
    </>
  )
}
const styles = {
  container: (isNormalComputer: boolean)  => ({
    marginTop: '10px',
   width: isNormalComputer ? 'unset' : '100%'
  })
};
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