import { BookingContext } from "./Context/BookingContext";
import { LegendText } from "./LegentText";
import { HonestWeekPicker } from "./WeekPicker";
import React from 'react';
import axios from 'axios';
export function RenderHeader(){
  const {daysOfWeek, setDaysOfWeek, selectedWeek, setSelectedWeek, selectedLocation, setSelectedLocation, bookings, setBookings, setISODaysOfWeek} = React.useContext(BookingContext);

  const onChange = (week : any) => {
    setSelectedWeek(week);
    const arrayDaysOfWeek = []
    const isoDaysOfWeek = []
    for (let i=0; i<=6; i++){
      const dt = new Date(week.firstDay);
      dt.setDate(dt.getDate() + i);
      isoDaysOfWeek.push(dt.toISOString().split('T')[0]);
      arrayDaysOfWeek.push(`${dt.getDate()}.${dt.getMonth() + 1}`)
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
    <LegendText/>
    </>
  )
}