import React from 'react';
import { ManagementDashboardContext } from '../../../../Context/ManagementDashboardContext';
import {format } from 'date-fns';
import { EditRowTable } from './EditRowTable';

const tableStyle : React.CSSProperties = { border: "1px solid black", borderCollapse: "collapse", borderRadius:'10px', marginTop:'15px', marginBottom:'15px'};
const headerCellStyle: React.CSSProperties  = { 
  border: "1px solid black", 
  borderCollapse: "collapse", 
  fontFamily:'sans-serif', 
  fontWeight:'bolder', 
  fontSize:'13px', 
  fontStyle:'italic', 
  padding:'5px',
  textAlign:'center' 
}
const tableCell: React.CSSProperties  = { 
  border: "1px solid black", 
  borderCollapse: "collapse", 
  fontFamily:'sans-serif', 
  fontSize:'12px',
  padding:'5px', 
  textAlign:'center'
}
//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function ManagementPopUp({closeModalFunction} : any) {

  const {selectedSegment, selectedLocation, allInvoices} = React.useContext(ManagementDashboardContext);
  const filtered = allInvoices.filter((sb : any) => (format(new Date(sb.startTime * 1000), 'yyyy-MM-d HH:mm')===selectedSegment[0]) && (parseInt(sb.serviceId)===parseInt(selectedLocation)));
  return(
    <div>
      <div style={{backgroundColor:'white', width:'1250px', padding:'5px', border:'1px solid #e7e7e9', borderRadius:'15px', outline:'20px solid #fafafa', display:'flex', flexDirection:'column'}}>
        <div className="close" style={{marginLeft:'98%', marginRight:'auto', width:'24px', height:'24px', cursor:'pointer'}} onClick={closeModalFunction}>
          <i className="fa fa-times"></i>
        </div>
        <table id="outputTable" style={tableStyle}> 
        <caption style={{captionSide:'top', marginBottom:'15px', marginLeft:'50%', fontSize:'20px', fontWeight:'bolder'}}>Summary</caption>
        <tr> 
            <th style={headerCellStyle} >Invoice Id</th> 
            <th style={headerCellStyle}>Invoice Type</th> 
            <th style={headerCellStyle}>Střelnice</th> 
            <th style={headerCellStyle}>Datum a čas</th> 
            <th style={headerCellStyle}>Délka rezervace(h)</th>
            <th style={headerCellStyle}>Zbrojní průkaz</th>
            <th style={headerCellStyle}>Instruktor</th>
            <th style={headerCellStyle}>Jméno a příjmení</th> 
            <th style={headerCellStyle}>E-mail</th> 
            <th style={headerCellStyle}>Telefon</th>
            <th></th> 
        </tr>
        {filtered.map((invoiceInfo : any)=>{
          return (<EditRowTable inv={invoiceInfo}/>)
        })}
    </table> 
      </div>
    </div>
)}