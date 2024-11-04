import React from 'react';
import { Translations } from '../types/translations';
import {dropdownShootingRangeCtx, dropdownShootingRangeCtxType } from '../../Common/Types/types';

export function DropDownShootingRange( ctx : dropdownShootingRangeCtx){
  const {serviceList,setSelectedLocation} = React.useContext<dropdownShootingRangeCtxType>(ctx );
  return(
  <div className="reservation-order-row" style={{marginTop:'20px'}}>
    <div className="select-box">
      <label htmlFor="select-location-dropdown-menu">Střelnice</label>
      <select onChange={(e) => setSelectedLocation(parseInt(e.target.value))} name="service" id="select-location-dropdown-menu" defaultValue={""}>
        <option value="" selected disabled hidden>{Translations.ManagementDashboard.Default_Select_Service}</option>
        {serviceList.map((location : any) => {
          return(
          <option value={location.id}>{location.serviceName}</option>
        )
        })}
      </select>
    </div>
  </div>
  )
}