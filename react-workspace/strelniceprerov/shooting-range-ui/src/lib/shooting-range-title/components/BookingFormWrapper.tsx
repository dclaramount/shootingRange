import { BookingContext } from './Context/BookingContext';
import { BookingDateTime } from './Form/BookingDateTime';
import { BookingEmail } from './Form/BookingEmail';
import { BookingName } from './Form/BookingName';
import { BookingPhoneNumber } from './Form/BookingPhoneNumber';
import { CommentsField } from './Form/CommentsField';
import { DurationOfBooking } from './Form/DurationOfBooking';
import { Instructor } from './Form/Instructor';
import { SelectedShootingRange } from './Form/SelectedShootingRange';
import { ShootingPermit } from './Form/ShootingPermit';
import React from 'react';

export function BookingFormWrapper() {

  const {
    setShowPopUpBookingProcess,isNormalComputer
} = React.useContext(BookingContext);
  let factor = 1;
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    factor = 0;
  }else{
    factor = 1;
  }

  const submitHandler = (e:any) => {
    e.preventDefault();
    setShowPopUpBookingProcess(true);
    //setShowingPage('CONFIRMATION_PAGE')
  }

  return(
    <div className="reservation-order" style={styles.container(isNormalComputer, factor)}>
      <form onSubmit={(e)=>submitHandler(e)}>
        <h3>Rezervace</h3>
          <SelectedShootingRange/>
          <BookingDateTime/>
          <DurationOfBooking/>
          {/*<NumberOfPeople/>*/}        
          <ShootingPermit/>
          <Instructor/>
          <h3>Osobní údaje</h3>
          <BookingName/>
          <BookingEmail/>
          <BookingPhoneNumber/>
          <CommentsField />
          <div className="reservation-order-row" style={stylesButton.container(isNormalComputer)}>
            <input type="submit" name="_submit" className="btn btn-primary" value="Odeslat rezervaci" onSubmit={() => {return false}} />
          </div>
      </form>
    </div>
)}
const styles = {
  container: (isNormalComputer: boolean, factor:number)  => ({
    marginRight: (isNormalComputer && factor===1) ? '100px' : '0',
   //marginRight: `calc(100vw * ${0.05 * factor})`,
   width: isNormalComputer ? '310px' : '100%',
   marginLeft: isNormalComputer ? 'unsent' : '0px',
   maxWidth: isNormalComputer ? '100%' : '430px'
  })
};
const stylesButton = {
  container: (isNormalComputer: boolean)  => ({
   width: isNormalComputer ? '' : '100%'
  })
};