import React from 'react';
import { BookingContext } from './Context/BookingContext';

export function BookingFormWrapper() {
  const {locationList, setLocationList} = React.useContext(BookingContext);


  return(
    <div className="reservation-order">
      <form>
        <h3>Rezervace</h3>
        <div className="reservation-order-row">
          <div className="select-box">
            <label htmlFor="select-location-dropdown-menu">Střelnice</label>
            <select name="service" id="select-location-dropdown-menu" defaultValue={1}>
              {locationList.map((location : any) => {
                return(
                  <option value={location.id}>{location.name}</option>
                )
              })}
              </select>
              <div className="reservation-order-row" data-tooltip data-original-title="V kalendáři vyberte kliknutím den a čas rezervace.">
                <label htmlFor="reservation-datetime">Datum a čas</label>
                <input type='text' name='datetime' size={50} maxLength={50} id='reservation-datetime' readOnly={true} required={true} data-nette-rules="[{&quot;op&quot;:&quot;:filled&quot;,&quot;msg&quot;:&quot;Vyplňte prosím datetime&quot;}]"/>
              </div>
          </div>
        </div>
      </form>
    </div>
)}