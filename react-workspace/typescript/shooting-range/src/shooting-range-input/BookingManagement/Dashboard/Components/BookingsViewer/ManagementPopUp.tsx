import React from 'react';
import { ManagementDashboardContext } from '../../../../Context/ManagementDashboardContext';
import {format } from 'date-fns';
import { EditRowTable } from './EditRowTable';
import Popup from "reactjs-popup";
import axios from 'axios';

const tableStyle : React.CSSProperties = { border: "1px solid black", borderCollapse: "collapse", borderRadius:'10px', marginTop:'15px', marginBottom:'15px'};
const headerCellStyle: React.CSSProperties  = { 
  border: "1px solid black", 
  borderCollapse: "collapse", 
  fontFamily:'sans-serif', 
  fontWeight:'bolder', 
  fontSize:'13px', 
  fontStyle:'italic', 
  padding:'5px',
  textAlign:'center' ,
}
//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function ManagementPopUp({closeModalFunction} : any) {

  const {selectedSegment, selectedLocation, allInvoices, showUpPopUpCancelation, setShowUpPopUpCancelation, selectedBooking, setSelectedBooking, globalVariabes, setRefreshManagementBoard} = React.useContext(ManagementDashboardContext);
  const filtered = allInvoices.filter((sb : any) => (format(new Date(sb.startTime * 1000), 'yyyy-MM-d HH:mm')===selectedSegment[0]) && (parseInt(sb.serviceId)===parseInt(selectedLocation)));
  const [deleteBooking, setDeleteBooking] = React.useState(0);
  const closeModal = (e : any) => {
    setShowUpPopUpCancelation(false);
  }
  React.useEffect(() =>{    
    axios({
      url: `${globalVariabes.apiRootURL}postDeleteBooking.php?uuidInvoice=${selectedBooking.uuid}`,
      method: "GET",
  }).then((res) => {
    setSelectedBooking([]);
    setRefreshManagementBoard(Math.random());
    setShowUpPopUpCancelation(false);
  })
    .catch((err) => { console.log(err) });
  },[deleteBooking])
  return(
    <div>
      <div style={{backgroundColor:'white', width:'1250px', padding:'5px', border:'1px solid #e7e7e9', borderRadius:'15px', outline:'20px solid #fafafa', display:'flex', flexDirection:'column'}}>
        <div className="close" style={{marginLeft:'98%', marginRight:'auto', width:'24px', height:'24px', cursor:'pointer'}} onClick={closeModalFunction}>
          <i className="fa fa-times"></i>
        </div>
        <table id="outputTable" style={tableStyle}> 
        <caption style={{captionSide:'top', marginBottom:'15px', marginLeft:'50%', fontSize:'20px', fontWeight:'bolder'}}>Summary</caption>
        <tr> 
            {/*<th style={headerCellStyle} >Invoice Id</th> */}
            {/*<th style={headerCellStyle}>Invoice Type</th> */}
            <th style={headerCellStyle}>Střelnice</th> 
            <th style={headerCellStyle}>Datum a čas</th> 
            <th style={headerCellStyle}>(h)</th>
            <th style={headerCellStyle}>Zbrojní průkaz</th>
            <th style={headerCellStyle}>Instruktor</th>
            <th style={headerCellStyle}>Jméno a příjmení</th> 
            <th style={headerCellStyle}>E-mail</th> 
            <th style={headerCellStyle}>Telefon</th>
            <th style={headerCellStyle}>Comment</th>
            <th></th> 
        </tr>
        {filtered.map((invoiceInfo : any)=>{
          return (<EditRowTable inv={invoiceInfo}/>)
        })}
    </table> 
      </div>
      <Popup open={showUpPopUpCancelation} onClose={closeModal} closeOnDocumentClick={false} >
              <div style={{backgroundColor:'white', padding:'25px', border:'2px solid black', borderRadius:'10px'}}>
              <h6>Do you really want to cancel invoice: <div style={{fontWeight:'bolder'}}>{selectedBooking.uuid}</div></h6>
              <div style={{display:'flex', marginRight:'50%', marginLeft:'35px', marginTop:'40px'}}>
                <button style={{marginRight:'10px'}} className="btn btn-danger" onClick={() => setDeleteBooking(deleteBooking+1)}>Delete</button>
                <button className="btn" onClick={()=>setShowUpPopUpCancelation(false)}>Cancel</button> 
              </div>
              </div>    
      </Popup>
    </div>
)}