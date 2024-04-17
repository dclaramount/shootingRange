import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function CommentsField(){

  const {comment, setComment} = React.useContext(BookingContext);

  const handleCommentFieldChange = (e:any) => {
    setComment(e.target.value);
  }
  return(
    <div className="reservation-order-row">
        <label htmlFor="frm-reservationCalendar-orderForm-phone">
          Poznámky
        </label>
        <textarea style={{paddingTop:'25px', paddingLeft:'10px', paddingRight:'10px', paddingBottom:'10px'}} onChange={handleCommentFieldChange} value={comment} maxLength={150} rows={4} cols={29}/>
    </div>
  )
  }