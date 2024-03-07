import { BookingDateTime } from './Form/BookingDateTime';
import { BookingEmail } from './Form/BookingEmail';
import { BookingName } from './Form/BookingName';
import { BookingPhoneNumber } from './Form/BookingPhoneNumber';
import { DurationOfBooking } from './Form/DurationOfBooking';
import { Instructor } from './Form/Instructor';
import { NumberOfPeople } from './Form/NumberOfPeople';
import { SelectedShootingRange } from './Form/SelectedShootingRange';
import { ShootingPermit } from './Form/ShootingPermit';

export function BookingFormWrapper() {

  const submitHandler = (e:any) => {
    console.log(`Submit`);
    console.log(e);
  }

  return(
    <div className="reservation-order">
      <form onSubmit={(e)=>submitHandler(e)}>
        <h3>Rezervace</h3>
          <SelectedShootingRange/>
          <BookingDateTime/>
          <DurationOfBooking/>
          <NumberOfPeople/>        
          <ShootingPermit/>
          <Instructor/>
          <h3>Osobní údaje</h3>
          <BookingName/>
          <BookingEmail/>
          <BookingPhoneNumber/>
          <div className="reservation-order-row">
            <input type="submit" name="_submit" className="btn btn-primary" value="Odeslat rezervaci"/>
          </div>
      </form>
    </div>
)}