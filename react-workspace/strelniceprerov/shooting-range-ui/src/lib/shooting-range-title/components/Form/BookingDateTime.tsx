import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function BookingDateTime(){

  const {selectedSegment, isNormalComputer} = React.useContext(BookingContext);

  const constructValueDateAndTime = () => {
    if(selectedSegment.length===0){
      return'';
    }else{
      const finishTimeStamp = selectedSegment[selectedSegment.length-1].split(' ')[1];
      const finishTime= parseInt(finishTimeStamp.split(':')[0]) + 1;
      return `${selectedSegment[0]}->${finishTime.toString()}:00`;
      //return selectedSegment.length>1? `${selectedSegment[0]}-${selectedSegment[selectedSegment.length-1].split(' ')[1]}` : selectedSegment[0];    
    }
  }
  return(
    <div className="reservation-order-row" data-tooltip data-original-title="V kalendáři vyberte kliknutím den a čas rezervace." style={styles.container(isNormalComputer)}>
    <label htmlFor="reservation-datetime">Datum a čas</label>
      <input style={{pointerEvents:'none'}} value={constructValueDateAndTime()} type='text' name='datetime' size={50} maxLength={50} id='reservation-datetime'  onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Select a segment from the calendar')} onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}/>
  </div>
  )
}
const styles = {
  container: (isNormalComputer: boolean)  => ({
   width: isNormalComputer ? 'unset' : '100%'
  })
};