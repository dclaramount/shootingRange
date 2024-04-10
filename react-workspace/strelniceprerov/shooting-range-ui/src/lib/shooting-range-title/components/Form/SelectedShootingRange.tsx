import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function SelectedShootingRange(){

  const {locationList,setSelectedLocation} = React.useContext(BookingContext);

  return(
    <div className="reservation-order-row">
      <div className="select-box">
        <label htmlFor="select-location-dropdown-menu">Střelnice</label>
        <select onChange={(e) => setSelectedLocation(e.target.value)} name="service" id="select-location-dropdown-menu" defaultValue={1}>
          {locationList.map((location : any) => {
            return(
              <option value={location.id}>{location.serviceName}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}