import React from 'react';
import { ManagementDashboardContext } from '../../../../Context/ManagementDashboardContext';
import {format } from 'date-fns';

const tableCell: React.CSSProperties  = { 
  border: "1px solid black", 
  borderCollapse: "collapse", 
  fontFamily:'sans-serif', 
  fontSize:'10px',
  padding:'5px', 
  textAlign:'center'
}
const iconsCell: React.CSSProperties = {
  display: "flex",
  borderTop: "1px solid black", 
  borderCollapse: "collapse",
  padding:'7.5px', 
}
const iconStyle: React.CSSProperties = {
  display: "flex",
  margin:'5px', 
}
//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function EditRowTable({inv} : any) {
  const [edit, setEdit] = React.useState(false);
  const comment = inv.comment === null ? [] : inv.comment.split(';');
  const {showUpPopUpCancelation, setShowUpPopUpCancelation,showUpPopUpModification, setShowUpPopUpModification,selectedBooking, setSelectedBooking} = React.useContext(ManagementDashboardContext);
  return(
          <tr id={inv.invoiceId}>
            <td style={tableCell}>{inv.invoiceId}</td>
            <td style={tableCell}>{inv.invoiceType}</td>
            <td style={tableCell}>{inv.serviceName}</td>
            <td style={tableCell}>{format(new Date(inv.startTime * 1000), 'd.MM.yyyy HH:mm:ss')}</td>
            <td style={tableCell}>{inv.lenght}</td>
            <td style={tableCell}>PlaceHolder</td>
            <td style={tableCell}><input type="checkbox" id="scales" name="scales" checked={inv.instructor}/></td>
            <td style={tableCell}>{inv.customerName}</td>
            <td style={tableCell}>{inv.customerEmail}</td>
            <td style={tableCell}>+{inv.phoneNumber}</td>
            <td style={tableCell}>{comment.map((c : any) => {if(c!==''){return (<>-{c}<br/></>)}})}</td>
            <td style={iconsCell}>
              {!edit && <i style={iconStyle} className="fas fa-edit" onClick={() => setEdit(true)}></i>}
              {!edit && <i style={iconStyle} className="fa fa-trash" aria-hidden="true" onClick={()=>{setSelectedBooking(inv);setShowUpPopUpCancelation(true)}}></i>}
              {edit && <i  style={iconStyle} className="fas fa-save"></i>}
              {edit && <i  style={iconStyle} className="fa fa-times" onClick={() => setEdit(false)} aria-hidden="true"></i>}
            </td>
          </tr>
        )
 }