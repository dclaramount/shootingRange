import {BookCalendarTable} from './BookCalendarTable';
import React from 'react';
import { DaysColumn } from './DaysColumn';
import * as Components from "./EditBookingSpace"
import { Translations } from '../types/translations';
import { EditBookingsContextType } from '../../Common/Types/interfaces';
import { EditBookingsContext as ctx} from '../../Common/Contexts/EditBookingsContext.';

export function BookingsCalendarWrapper(){

const Legend = ({props} : any) => {
  return(
        <div style={{display:'flex', flexDirection:'row', width:'auto',justifyContent:'space-around'}}>
          {props.map((prop : any) => {
            const color = prop.color;
            const name = prop.name;
            return(
              <div style={{display:'flex', flexDirection:'row', margin:'10px'}}>
                  <em style={{display: 'inline-block', width:'20px', height:'20px', border:`1px solid ${color}`, background:`${color}`, color:`${color}`, borderRadius:'50%', margin:'0 5px 0 0'}}>.</em>
                    <div>{name}</div>
              </div>)
          })}
        </div>);
}

  const [lastRefreshTime, setLastRefreshTime] = React.useState(new Date().toLocaleString());
const   _ctx : EditBookingsContextType      =       React.useContext(ctx);
  console.log(_ctx);
  React.useEffect(() =>{    
    setLastRefreshTime(new Date().toLocaleString())
  },[_ctx.selectedLocation])
  
 return (
  <div className="reservation-cal" style={{width:'100%'}}>
    <div style={{width:'100%', marginLeft:'auto', marginRight:'auto'}}>
      <Components.EditBookingsFormWrapper {...ctx}/>
      <div style={{color:'gray', fontWeight:'lighter', fontSize:'12px', textAlign:'center'}}>
      {`Table last updated on: ${lastRefreshTime}`}
      </div>
      <Legend props={[{color:'black', name:`${Translations.BookingManagmentTab.BlockWoutInstructor}`},{color:'#f2b51b' , name:`${Translations.BookingManagmentTab.BlockWInstructor}`}]} />
    </div>
    <div className="reservation-cal-table" >
      <BookCalendarTable />
      <DaysColumn/>
    </div>

  </div>
)}