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
          setShowPopUpBookingProcess,
  } = React.useContext(BookingContext);

  const submitHandler = (e:any) => {
    e.preventDefault();
    setShowPopUpBookingProcess(true);
  }
  return(
    <div className="reservation-order">
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
          <CommentsField/>
          <div className="reservation-order-row">
            <input type="submit" name="_submit" className="btn btn-primary" value="Odeslat rezervaci"/>
          </div>
      </form>
    </div>
)}