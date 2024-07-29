import React from 'react';
import { BookingContext } from '../Context/BookingContext';


export function CommentsField(){

  const {isNormalComputer, comment, setComment} = React.useContext(BookingContext);

  const handleCommentFieldChange = (e:any) => {
    setComment(e.target.value);
  }
  return(
    <div className="reservation-order-row" style={{width:'100%'}}>
        <label style={stylesLabelField.container(isNormalComputer)} htmlFor="frm-reservationCalendar-orderForm-phone" >
        Poznámky
        </label>
        <textarea style={stylesInputField.container(isNormalComputer)} onChange={handleCommentFieldChange} value={comment} maxLength={150} rows={4} cols={isNormalComputer ? 25 : 37}/>
    </div>
  )
  }
  const styles = {
    container: (isNormalComputer: boolean)  => ({
     textAlign:isNormalComputer ? 'unset' : 'right' as React.CSSProperties["textAlign"],
    })
  };
  const stylesLabelField = {
    container: (isNormalComputer: boolean)  => ({
      position:       'absolute' as React.CSSProperties["position"],
      top:            '4px',
      left:           '10px',
      fontSize:       '12px',
      width:          '100%',
      color:          '#888',
      fontWeight:     '400',
      fontFamily:     "'Open Sans', Arial, sans-serif",
      zIndex:         '1'
    })
  }
  const stylesInputField = {
    container: (isNormalComputer: boolean)  => ({
      width:          '100%',
      border:         '1px solid #aaa',
      fontSize:       '14px',
      paddingTop:     '24px',
      height:         '100px',
      borderRadius:   '5px',
      paddingLeft:    '10px',
      paddingBottom:  '5px',
      fontWeight:     'bolder',
    })
  }