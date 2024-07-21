import React from 'react';
import axios from 'axios';
import { ManagementDashboardContext } from "../../../Context/ManagementDashboardContext";
import { LegendText } from "./WeekSelector/LegendText";
import { HonestWeekPicker } from './WeekSelector/WeekPicker';
export function WeekSelector(){
  const {setDaysOfWeek, selectedWeek, setSelectedWeek, selectedLocation, setBookings, setISODaysOfWeek} = React.useContext(ManagementDashboardContext);

  const onChange = (week : any) => {
    setSelectedWeek(week);
    const arrayDaysOfWeek = []
    const isoDaysOfWeek = []
    for (let i=0; i<=7; i++){
      const dt = new Date(week.firstDay);
      dt.setDate(dt.getDate() + i);
      isoDaysOfWeek.push(dt.toISOString().split('T')[0]);
      if(i<7){
        arrayDaysOfWeek.push(`${dt.getDate()}.${dt.getMonth() + 1}`);
      }
    }
    setISODaysOfWeek(isoDaysOfWeek);
    setDaysOfWeek(arrayDaysOfWeek);
  };
  
  //API Call to Fetch the relevant bookigns for the week.
  React.useEffect(()=> {
    if(Object.keys(selectedWeek).length>0){
      const firstDay= (new Date(selectedWeek.firstDay)).toISOString();
      const lastDay=  (new Date(selectedWeek.lastDay)).toISOString();
      axios({
        url: `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getBookingsFiltered.php?firstDayOfWeek=${firstDay}&lastDayOfWeek=${lastDay}&location=${selectedLocation}`,
        method: "GET",
    }).then((res) => {setBookings(res.data)})
      .catch((err) => { console.log(err) });
    }
  },[selectedWeek , selectedLocation])
  
  return(
    <>
    <div className="reservation-date">
      <label>Datum</label>
      <HonestWeekPicker onChange={onChange}/>
    </div>
    {/*<LegendText/>*/}
    </>
  )
}