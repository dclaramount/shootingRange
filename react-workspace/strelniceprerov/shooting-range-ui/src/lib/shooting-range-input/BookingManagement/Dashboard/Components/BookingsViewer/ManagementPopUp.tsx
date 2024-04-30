import React from 'react';
import { ManagementDashboardContext } from '../../../../components/Context/ManagementDashboardContext';
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
const tableCellSummary: React.CSSProperties  = { 
  border: "1px solid black", 
  borderCollapse: "collapse", 
  fontFamily:'sans-serif', 
  fontSize:'10px',
  padding:'5px', 
  textAlign:'center'
}
//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function ManagementPopUp({closeModalFunction} : any) {
  interface UserEntry {
    ID: number;
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    shootingPermit?: string;
    updatedOn: Date;
    userId: string;
  }

  const {locationList, selectedSegment, selectedLocation, allInvoices, showUpPopUpCancelation, setShowUpPopUpCancelation, showUpPopUpModification, setShowUpPopUpModification, selectedBooking, setSelectedBooking, globalVariabes, setRefreshManagementBoard, modificationInfo, sendGridKeyAPI, sendGridFromEmail} = React.useContext(ManagementDashboardContext);
  const filtered = allInvoices.filter((sb : any) => ((new Date(sb.startTime * 1000)).toLocaleString('sv-SE', { timeZone: 'CET'}).includes(selectedSegment[0]) && (parseInt(sb.serviceId)===parseInt(selectedLocation))));
  const [deleteBooking, setDeleteBooking] = React.useState(0);
  const [newComment, setNewComment] = React.useState("");
  const [section, setSection]  =   React.useState("LOADING"); 
  const [userAccount, setUserAccount] = React.useState<UserEntry>({ID:0, id: "", name:"", email:"", phoneNumber:"", shootingPermit:"", updatedOn:new Date(), userId:""});
  const [response, setResponse]  =   React.useState([]); 

  function hasUserDataChanged(entryUser: UserEntry){
    if(userAccount.ID===0 ){
      return false;
    }
    else if(entryUser.name === modificationInfo.newInfo.name && entryUser.email === modificationInfo.newInfo.email && entryUser.phoneNumber === modificationInfo.newInfo.phone ){
      return false;
    }
    else{
      return true;
    }
  }

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*                                                                      Editable Text Field                                                                          */
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const ModifyReservation = (information : any, newComment : any) => {
    setSection("DELETE_OLD_RESERVATION");
  }
  /*----------------------------------------------------------------------*/
  /*          USE EFFECT FOR THE PROCESS OF MODIFY A BOOKING            */
  /*----------------------------------------------------------------------*/
  React.useEffect(() =>{
    //1 Step delete the previous reservation
    if(section==="DELETE_OLD_RESERVATION"){
      axios({
        url: `${globalVariabes.apiRootURL}postDeleteBooking.php?uuidInvoice=${modificationInfo.newInfo.uuid}`,
        method: "GET",
    }).then((res) => {
      console.log("DELETED");
      console.log(res);
      setSelectedBooking([]);
      setRefreshManagementBoard(Math.random());
      setSection("GETTING_USER_BY_EMAIL")

    })
      .catch((err) => { console.log(err); setSection("GETTING_USER_BY_EMAIL") });
    }
    //2nd Step get the User Account by Email  
    if(section==="GETTING_USER_BY_EMAIL"){
      console.log("Starting");
      axios({
        url: `${globalVariabes.apiRootURL}getUserRecordByEmail.php?userEmail=${modificationInfo.newInfo.email}`,
        method: "GET",
      }).then((res) => {
        if(res.status===200){
          const userData : UserEntry[] = res.data;
          if(userData.length>0){
            setUserAccount(userData[0]);
            setSection("VERIFY_DATA_USER")
          }
          else{
            setSection("GETTING_USER_BY_PHONE_NUMBER");
          }
        }
        else{
          setSection("ERROR_ON_API_CALL");
        }
      })
    .catch((err) => { console.log(err); setSection("CREATING_RESERVATION_VERIFYING_USER") });
    }
    //1.1 Step get the User Account by PhoneNumber
    else if(section==="GETTING_USER_BY_PHONE_NUMBER"){
      axios({
        url: `${globalVariabes.apiRootURL}getUserRecordByPhoneNumber.php?phoneNumber=${modificationInfo.newInfo.phone}`,
        method: "GET",
      }).then((res) => {
        if(res.status===200){
          const userData : UserEntry[] = res.data;
          if(userData.length>0){
            setUserAccount(userData[0]);
            setSection("VERIFY_DATA_USER")
          }
          else{
            setSection("VERIFY_DATA_USER");
          }
        }
        else{
          setSection("ERROR_ON_API_CALL");
        }
      })
    .catch((err) => { console.log(err); setSection("CREATING_RESERVATION_VERIFYING_USER") });
    }
    //3 Verify User Entry.
    else if(section==="VERIFY_DATA_USER"){
      console.log("Verifing User Data")
      if(hasUserDataChanged(userAccount)){
        axios({
          url: `${globalVariabes.apiRootURL}postUpdateUserEntry.php?id=${userAccount.id}&shootingPermit=${false}&shootingPermitNumber=${modificationInfo.newInfo.shootingPermit}&name=${modificationInfo.newInfo.name}&email=${modificationInfo.newInfo.email}&phone=${modificationInfo.newInfo.phone}`,
          method: "GET",
        }).then((res) => {
          setSection("PROCEED_TO_CREATE_RESERVATION");
        })
      .catch((err) => { console.log(err) });
      }
      else{
        setSection("PROCEED_TO_CREATE_RESERVATION");
      }
    }
    //4 Create Reservation.
    else if(section==="PROCEED_TO_CREATE_RESERVATION"){
      const selectedServiceId = locationList.find((location : any) => location.serviceName === modificationInfo.newInfo.service).id;
      console.log(`Selected Service Id ${selectedServiceId}`)
      axios({
        url: `${globalVariabes.apiRootURL}postCreateBooking.php?selectedLocationId=${selectedServiceId}&selectedSegment=${format(new Date(modificationInfo.newInfo.startTime * 1000), "yyyy-MM-d' 'HH:mm")}&selectedBookingDuration=${modificationInfo.newInfo.length}&selectedOccupancy=${1}&shootingInstructor=${modificationInfo.newInfo.withInstructor}&userId=${userAccount.id}&comment=${newComment}&uuidInvoice=${modificationInfo.newInfo.uuid}`,
        method: "GET",
      }).then((res) => {
        setResponse(res.data);
        setSection("SEND_EMAIL");
      })
    .catch((err) => { console.log(err) });
    }
    //4 Send Email Confirmation Reservation.
    else if(section==="SEND_EMAIL"){
      const formatedDate = `${(new Date(selectedSegment[0])).toLocaleDateString('de-DE')} ${selectedSegment[0].split(' ')[1]}`;
      const formatedSelectedSegment = selectedSegment.length > 1 ? `${formatedDate}-${selectedSegment[selectedSegment.length-1].split(' ')[1]}` : formatedDate;    
      axios({
        url: `${globalVariabes.apiRootURL}postSendChangeEmail.php?sendGridKey=${sendGridKeyAPI}&emailTo=${modificationInfo.newInfo.email}&emailFrom=${globalVariabes.emailFrom}&templateId=${globalVariabes.changeEmailTemplateId}&segmentBooked=${formatedSelectedSegment}&nameOnReservation=${modificationInfo.newInfo.name}&shootingRangeName=${modificationInfo.newInfo.service}&phoneNumber=+${modificationInfo.newInfo.phone}&comment=${newComment}&uuidInvoice=${modificationInfo.newInfo.uuid}`,
        method: "GET",
      }).then((res) => {
        setResponse(res.data);
        setSection("RESERVATION_MADE");
      })
    .catch((err) => { console.log(err) });
    setShowUpPopUpModification(false);    
    closeModalFunction();
    }
  },[section])

  const AreThereChanges = () => {
    const oldInfo = modificationInfo?.oldInfo;
    const newInfo = modificationInfo?.newInfo;
    return (true);
  }

  const closeModal = (e : any) => {
    setShowUpPopUpCancelation(false);
  }
  const closeModalModification = (e : any) => {
    setShowUpPopUpModification(false);
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
      <Popup open={showUpPopUpModification} onClose={closeModal} closeOnDocumentClick={false} >
      {Object.keys(modificationInfo).length>0 ? 
              <div style={{backgroundColor:'white', padding:'25px', border:'2px solid black', borderRadius:'10px', width:'535px', height:'635'}}>
              <table id="outputTable" style={tableStyle}> 
                <caption style={{captionSide:'top', marginBottom:'25px', marginLeft:'42%', fontSize:'20px', fontWeight:'bolder'}}>Summary</caption>
                <tr> 
                    <th style={headerCellStyle}>Field</th> 
                    <th style={headerCellStyle}>Before</th> 
                    <th style={headerCellStyle}>After</th>
                </tr>
                <tr id={'uuid'}>
                  <th style={tableCellSummary}>UUID-Invoice</th>
                  <th style={tableCellSummary}>{modificationInfo.oldInfo.uuid}</th>
                  <th style={tableCellSummary}>{modificationInfo.newInfo.uuid}</th>
                </tr>
                <tr id={'locaitonId'}>
                  <th style={tableCellSummary}>Location Id</th>
                  <th style={tableCellSummary}>{modificationInfo.oldInfo.location}</th>
                  <th style={tableCellSummary}>{modificationInfo.newInfo.location}</th>
                </tr>
                <tr id={'service'}>
                  <th style={tableCellSummary}>Service</th>
                  <th style={tableCellSummary}>{modificationInfo.oldInfo.service}</th>
                  <th style={tableCellSummary}>{modificationInfo.newInfo.service}</th>
                </tr>
                <tr id={'startTime'}>
                  <th style={tableCellSummary}>Start Time</th>
                  <th style={tableCellSummary}>{format(new Date(modificationInfo.oldInfo.startTime * 1000), "d-MM-yyyy' 'HH:mm:ss")}</th>
                  <th style={tableCellSummary}>{format(new Date(modificationInfo.newInfo.startTime * 1000), "d-MM-yyyy' 'HH:mm:ss")}</th>
                </tr>
                <tr id={'length'}>
                  <th style={tableCellSummary}>Length (h)</th>
                  <th style={tableCellSummary}>{modificationInfo.oldInfo.length} h</th>
                  <th style={tableCellSummary}>{modificationInfo.newInfo.length} h</th>
                </tr>
                <tr id={'withInstructor'}>
                  <th style={tableCellSummary}>Instructor</th>
                  <th style={tableCellSummary}>{modificationInfo.oldInfo.withInstructor}</th>
                  <th style={tableCellSummary}>{modificationInfo.newInfo.withInstructor}</th>
                </tr>
                <tr id={'shootingPermit'}>
                  <th style={tableCellSummary}>Shooting Permit</th>
                  <th style={tableCellSummary}>{modificationInfo.oldInfo.shootingPermit}</th>
                  <th style={tableCellSummary}>{modificationInfo.newInfo.shootingPermit}</th>
                </tr>
                <tr id={'name'}>
                  <th style={tableCellSummary}>Jmeno a Prijmeni</th>
                  <th style={tableCellSummary}>{modificationInfo.oldInfo.name}</th>
                  <th style={tableCellSummary}>{modificationInfo.newInfo.name}</th>
                </tr>
                <tr id={'email'}>
                  <th style={tableCellSummary}>Email</th>
                  <th style={tableCellSummary}>{modificationInfo.oldInfo.email}</th>
                  <th style={tableCellSummary}>{modificationInfo.newInfo.email}</th>
                </tr>
                <tr id={'phone'}>
                  <th style={tableCellSummary}>Telefon</th>
                  <th style={tableCellSummary}>{modificationInfo.oldInfo.phone}</th>
                  <th style={tableCellSummary}>{modificationInfo.newInfo.phone}</th>
                </tr>
              </table>
              <div style={{display:'flex', flexDirection:'column'}}>
              <div className="reservation-order-row" style={{width:'100%'}}>
                <label htmlFor="frm-reservationCalendar-orderForm-phone">
                  Poznámky
                </label>
                <textarea style={{paddingTop:'25px', paddingLeft:'10px', paddingRight:'10px', paddingBottom:'10px', width:'100%'}} 
                          onChange={(e)=>setNewComment(e.target.value)} value={newComment} maxLength={150} rows={2} cols={29}/>
              </div>
              <div style={{display:'flex', marginRight:'50%', marginLeft:'35px', marginTop:'40px'}}>
                {AreThereChanges() ? <button style={{marginLeft:'25%', marginRight:'50%'}} className="btn btn-danger" onClick={() => ModifyReservation(modificationInfo, newComment)}>Modify</button>
                  :
                  <button style={{marginLeft:'25%', marginRight:'50%', opacity:'0.3', pointerEvents:'none'}} className="btn" onClick={() => ModifyReservation(modificationInfo, newComment)}>Modify</button>}
                <button className="btn" onClick={()=>setShowUpPopUpModification(false)}>Cancel</button> 
              </div>
              </div>
              </div>    :
              <>Diego</>}
      </Popup>
    </div>
)}