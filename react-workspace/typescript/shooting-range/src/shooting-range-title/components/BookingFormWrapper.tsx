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
import {Translations} from "../types/translations";

export function BookingFormWrapper() {
    const shootingPermitRef =   React.useRef<HTMLInputElement>(null);
    const nameRef           =   React.useRef<HTMLInputElement>(null);
    const emailRef          =   React.useRef<HTMLInputElement>(null);
    const phoneRef          =   React.useRef<HTMLInputElement>(null);
    const commentsRef       =   React.useRef<HTMLTextAreaElement>(null);
    const {
        setShowPopUpBookingProcess,
        setShootingPermitNumber,
        setName,
        setEmail,
        setPhone,
        setComment,
        isNormalComputer
    } = React.useContext(BookingContext);

  const submitHandler = (e:any) => {
    e.preventDefault();
    setShootingPermitNumber(shootingPermitRef?.current?.value);
    setName(nameRef?.current?.value);
    setEmail(emailRef?.current?.value);
    setPhone(phoneRef?.current?.value);
    setComment(commentsRef?.current?.value);
    setShowPopUpBookingProcess(true);
  }
  return(
      <div className="reservation-order" style={styles.container(isNormalComputer)}>
          <form onSubmit={(e)=>submitHandler(e)}>
              <h3>Rezervace</h3>
              <SelectedShootingRange/>
              <BookingDateTime/>
              <DurationOfBooking/>
              {/*<NumberOfPeople/>*/}
              <ShootingPermit ref={shootingPermitRef} isComputerLayout={isNormalComputer} size={50} maxLength={50} required={true} type={'text'} name={'shootingPermit'} label={Translations.BookingForm.ShootingPermit.Label} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(Translations.BookingForm.ShootingPermit.onError)}  onInput={e => (e.target as HTMLInputElement).setCustomValidity('')} pattern={Translations.BookingForm.ShootingPermit.RegExValidation}/>
              <Instructor />
              <h3>{Translations.BookingForm.Personal_Information}</h3>
              <BookingName ref={nameRef} isComputerLayout={isNormalComputer} required={true} type={'text'} name={'name'} maxLength={255} size={50} label={Translations.BookingForm.Name.Label} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(Translations.BookingForm.Name.onError)} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')} />
              <BookingEmail ref={emailRef} isComputerLayout={isNormalComputer} required={true} type={'email'} name={'email'} maxLength={100} size={50} label={Translations.BookingForm.Email.Label} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(Translations.BookingForm.Email.onError)} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')} pattern={Translations.BookingForm.Email.RegExValidation}/>
              <BookingPhoneNumber ref={phoneRef} isComputerLayout={isNormalComputer} required={true} type={'text'} name={'phone'} maxLength={50} size={50} label={Translations.BookingForm.PhoneNumber.Label} onInvalid={e => (e.target as HTMLInputElement).setCustomValidity(Translations.BookingForm.PhoneNumber.onError)} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')} pattern={Translations.BookingForm.PhoneNumber.RegExValidation}/>
              <CommentsField ref={commentsRef} maxLength={150} rows={4} cols={isNormalComputer ? 29 : 41} label={Translations.BookingForm.Comments.Label} />
              <div className="reservation-order-row" style={stylesButton.container(isNormalComputer)}>
                  <input type="submit" name="_submit" className="btn btn-primary" value="Odeslat rezervaci"/>
              </div>
          </form>
      </div>
  )}

const styles = {
  container: (isNormalComputer: boolean)  => ({
   marginRight:'100px',
   width: isNormalComputer ? '310px' : '100%'
  })
};
const stylesButton = {
  container: (isNormalComputer: boolean)  => ({
   width: isNormalComputer ? '' : '100%'
  })
};