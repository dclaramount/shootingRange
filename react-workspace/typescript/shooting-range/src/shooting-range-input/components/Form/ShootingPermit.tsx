import React from 'react';
import {TextFormProps} from "../../types/Types";
import {Translations} from "../../types/translations";
import { AdminBookingsContext } from '../../Context/AdminBookingsContext';
import { styles } from '../styling/GlobalStyles';

export const ShootingPermit = React.forwardRef<HTMLInputElement, TextFormProps>(({label, isComputerLayout, ...rest}, ref) => {

  const {
    isNormalComputer,
    shootingPermit,
    setShootingPermit,
    setShootingInstructor,
    setSelectedSegment
  } = React.useContext(AdminBookingsContext);

  return (
      <>
        <div className="reservation-order-row" style={styles.checkBoxWrapper(isNormalComputer)}>
          <label htmlFor="select-box-location">{Translations.BookingForm.ShootingPermit.Subtitle}</label>
          <div className="reservation-order-row-radios" style={styles.checkBox(isNormalComputer)}>
            <input checked={shootingPermit} onClick={(e) => {
              setShootingPermit(true);
              setShootingInstructor(false);
              setSelectedSegment([])
            }} type="radio" name="licence" id="frm-reservationCalendar-orderForm-licence-1" required={true}
                   data-nette-rules="[{&quot;op&quot;:&quot;:filled&quot;,&quot;msg&quot;:&quot;Prosím vyberte, jestli vlastníte zbrojní průkaz. Střelci bez zbrojního průkazu k sobě musí mít instruktora.&quot;}]"
                   value="1"/>
            <label htmlFor="frm-reservationCalendar-orderForm-licence-1">
              Ano
            </label>
            <input checked={!shootingPermit} onClick={(e) => {
              setShootingPermit(false);
              setShootingInstructor(true);
              setSelectedSegment([])
            }} type="radio" name="licence" id="frm-reservationCalendar-orderForm-licence-0" required={true}
                   data-nette-rules="[{&quot;op&quot;:&quot;:filled&quot;,&quot;msg&quot;:&quot;Prosím vyberte, jestli vlastníte zbrojní průkaz. Střelci bez zbrojního průkazu k sobě musí mít instruktora.&quot;}]"
                   value="0"/>
            <label htmlFor="frm-reservationCalendar-orderForm-licence-0">
              Ne
            </label>
          </div>
        </div>
        {shootingPermit &&
            <div  className="reservation-order-row" style={styles.shootingInput(isComputerLayout)}>
              <label htmlFor={'input_field_shooting_permit'}>{label}</label>
              <input ref={ref} {...rest} id='input_field_shooting_permit' />
            </div>
        }
      </>
  )
});
