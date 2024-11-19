import {BookCalendarTable} from './BookCalendarTable';
import React from 'react';
import { DaysColumn } from './DaysColumn';
import { FormWrapper } from './FormWrapper';
import { ManagementDashboardContext } from '../../../../Context/ManagementDashboardContext';
import { Translations } from '../../../../types/translations';

export function BookingsViewerWrapper(){

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
  const {selectedLocation} = React.useContext(ManagementDashboardContext);

  React.useEffect(() =>{    
    setLastRefreshTime(new Date().toLocaleString())
  },[selectedLocation])
  
 return (
  <div className="reservation-cal" style={{width:'100%'}}>
    <div style={{width:'100%', marginLeft:'auto', marginRight:'auto'}}>
      <FormWrapper />
      <div style={{color:'gray', fontWeight:'lighter', fontSize:'12px', textAlign:'center'}}>
      {`Table last updated on: ${lastRefreshTime}`}
      </div>
      <div style={{color:'gray', fontWeight:'lighter', fontSize:'12px', textAlign:'center', marginTop:'5px'}}>
      {`* ${Translations.BookingManagmentTab.LegendWithComments}`}
      </div>
      <Legend props={[{color:'black', name:`${Translations.BookingManagmentTab.BlockWoutInstructor}`},{color:'#f2b51b' , name:`${Translations.BookingManagmentTab.BlockWInstructor}`}]} />
    </div>
    <div className="reservation-cal-table" >
      <BookCalendarTable />
      <DaysColumn />
    </div>

  </div>
)}