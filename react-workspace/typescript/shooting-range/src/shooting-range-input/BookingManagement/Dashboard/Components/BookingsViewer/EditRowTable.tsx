import React from 'react';
import { ManagementDashboardContext } from '../../../../Context/ManagementDashboardContext';
import {format } from 'date-fns';

const wrapperDropDown : React.CSSProperties = {
  display:'flex'
}
const editableCell : React.CSSProperties = {
  border:'1px solid black',
  borderRadius:'5px',
  height: '20px',
  width: '-webkit-fill-available',
  padding: '2px'
}

const tableCell: React.CSSProperties  = { 
  border: "1px solid black", 
  borderCollapse: "collapse", 
  fontFamily:'sans-serif', 
  fontSize:'10px',
  padding:'5px', 
  textAlign:'center'
}
const EmptyStyle: React.CSSProperties = {
}
const ErrorMessageStyle: React.CSSProperties = {
  fontWeight:'bold', color:'red'
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
const iconStyleDisabled: React.CSSProperties = {
  display: "flex",
  margin:'5px', 
  color: 'gray',
  opacity: 0.33,
  pointerEvents:'none'
}
//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function EditRowTable({inv} : any) {
  const [edit, setEdit]                                         = React.useState(false);
  //Old Values
  const [oldLocation, setOldLocation]             =   React.useState(inv.locationId);
  const [oldService, setOldService]               =   React.useState(inv.serviceName);
  const [oldStartTime, setOldStartTime]           =   React.useState(inv.startTime);
  const [oldLength, setOldLength]                 =   React.useState(inv.lenght);
  const [oldShootingPermit, setOldShootingPermit] =   React.useState("PLACEHOLDER");
  const [oldWithInstructor, setOldWithInstructor] =   React.useState(inv.instructor)
  const [oldName, setOldName]                     =   React.useState(inv.customerName);
  const [oldEmail, setOldEmail]                   =   React.useState(inv.customerEmail);
  const [oldComments, setOldComments]             =   React.useState(inv.comment);
   //New Values
   const [newLocation, setNewLocation]             =   React.useState(inv.locationId);
   const [newService, setNewService]               =   React.useState(inv.serviceName);
   const [newStartTime, setNewStartTime]           =   React.useState(inv.startTime);
   const [newLength, setNewLength]                 =   React.useState(inv.lenght);
   const [newShootingPermit, setNewShootingPermit] =   React.useState("PLACEHOLDER");
   const [newWithInstructor, setNewWithInstructor] =   React.useState(inv.instructor)
   const [newName, setNewName]                     =   React.useState(inv.customerName);
   const [newEmail, setNewEmail]                   =   React.useState(inv.customerEmail);
   const [newPhoneNumber, setNewPhoneNumber]       =   React.useState(inv.phoneNumber);
   const [newComments, setNewComments]             =   React.useState<string>(inv.comment);

  const comment = newComments === null ? [] : newComments.split(';');
  const { locationList,               showUpPopUpCancelation, 
          setShowUpPopUpCancelation,  showUpPopUpModification, 
          setShowUpPopUpModification, selectedBooking, 
          setSelectedBooking,         globalVariabes,
          fieldsOnError,              setFieldsOnError,
          allInvoices,                instructorSegments
        } = React.useContext(ManagementDashboardContext);
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*                                                                      Editable DropDown                                                                                  */
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const DropDownEditableCell = ({name, value, listOfValues, updateFunction} : any) => {
    let temp = [];
    if(typeof listOfValues[0] !== 'object'){
      for (var i=0; i<listOfValues.length; i++) {
        temp[i] = {
            id: listOfValues[i],
            serviceName: listOfValues[i]
        };
    }
    }
    const list = (typeof listOfValues[0]) !== 'object' ? temp : listOfValues;
    const [tempValue, setTempValue] = React.useState(list.find((lov : any) => lov.serviceName===value));
    //Once clicking out of the calendar (Update the newValue) (ONLY IF NO ERRORS)
    const updateNewValue = (arg : any) => {
      const fNewTempValue = list.find((tv:any)=> parseInt(tv.id)===parseInt(arg));
      const newValue = list.find((lov : any) => lov.serviceName===fNewTempValue.serviceName).serviceName;
      updateFunction(newValue);
    }
    return(
      <>
      {edit ? 
      <div style={wrapperDropDown}>
        {/*<label htmlFor="services">Service:</label>*/}
          <select id={`menu-${name}`} style={editableCell} name="service" onChange={(e)=> {updateNewValue(e.target.value)}} >
            {list.map((ll : any) => {return(<option selected={tempValue.id===ll.id} id={ll.id} value={ll.id}>{ll.serviceName}</option>)})}
          </select>
      </div> :
      <div>
        {value}
      </div>
      }
      </>
    )
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*                                                                      Editable Time Stamp Box                                                                      */
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const TimeStampEditableCell = ({id, value, originalValue, updateFunction} : any) => {
    let errorMessageGeneral = "You must select a rounded hour.";
    let errorSegmentNotAvailable = "Segment Conditions not met."
    const oldStartTimeValue = format(new Date(originalValue * 1000), "yyyy-MM-d'T'HH:mm");
    const [tempValue, setTempValue] = React.useState(format(new Date(value * 1000), "yyyy-MM-d'T'HH:mm"));
    const [showErrorGeneral, setShowErrorGeneral] = React.useState(false);
    const [showError, setShowError] = React.useState(false);

    const VerifyDate = (date : any) => {
      const dt = new Date(Date.parse(date));
      //Shows Error if Selected Time is not rounded hour
      if(dt.getMinutes() > 0 ){ 
        setShowErrorGeneral(true);
        setTempValue(date);
      }
      //If the selected time is rounded hour proceed with evaluation
      else{
      //Loop with every start hour
        for (let i = 0; i < parseInt(newLength); i++) {
          const relevantLocation = locationList.find((li:any) => li.serviceName===newService);
          const basedStartTime = format(new Date(Date.parse(date)).getTime(), "yyyy-MM-d'T'HH:mm")
          const selectedStartTime = format(new Date(Date.parse(date)).getTime() + (i*60*60*1000), 'd.MM.yyyy HH:mm:ss');
          const selectedStartTimeInstructorFormat = format(new Date(Date.parse(date)).getTime() + (i*60*60*1000), 'yyyy-MM-d HH:mm:ss');
          const fInvoicesByLocationId = allInvoices.filter((ai:any) => 
                parseInt(ai.locationId)===parseInt(relevantLocation.locationId) && 
                (newWithInstructor === ai.instructor) &&
                (selectedStartTime===format(new Date(ai.startTime * 1000), 'd.MM.yyyy HH:mm:ss'))
              );
          const fInvoicesByLocationIdDiffService = allInvoices.filter((ai:any) => 
          parseInt(ai.locationId)===parseInt(relevantLocation.locationId) && 
          (newWithInstructor === ai.instructor) &&
          (selectedStartTime===format(new Date(ai.startTime * 1000), 'd.MM.yyyy HH:mm:ss')) &&
          (ai.serviceName !== newService)
              );
          const fSegmentsInstructors = instructorSegments.filter((is : any) => 
            is.startTime === selectedStartTimeInstructorFormat
          );
          const sumOfCapacityInstructors = fSegmentsInstructors.length;
          console.log(instructorSegments);
          //Get Capacity for the given start time segment
          let summOfBookedCapacity = 0;
          fInvoicesByLocationId.forEach((inv : any) => summOfBookedCapacity=summOfBookedCapacity+ parseInt(inv.occupancy))
          const locationCapacityWOutInstructors = parseInt(locationList.find((loc:any) => parseInt(loc.id) === parseInt(relevantLocation.locationId)).capacity);
          const locationCapacity = newWithInstructor ? sumOfCapacityInstructors :locationCapacityWOutInstructors;
          console.log(`/*-------------Information to Compare (${selectedStartTime}) -----------------*/`);
          console.log(`Location Id: ${relevantLocation.locationId}:${relevantLocation.locationName}`);
          console.log(`Service Id: ${relevantLocation.id}:${relevantLocation.serviceName} `);
          console.log(`Status of Normal Occupancy: ${summOfBookedCapacity}/${relevantLocation.capacity}`);
          console.log(`Status of Instructor Occupancy:${summOfBookedCapacity}/${sumOfCapacityInstructors}`); 

          const capacityNotAvailable =  (summOfBookedCapacity >= locationCapacity) || //Change is not available if (Capacity for any of the segments is not ther) 
                                        (fInvoicesByLocationIdDiffService.length>0);  //Or in the case of shared location (E.g. Streliste B and C) have blocking reservations.
          console.log(`Capacity Not Available ${capacityNotAvailable}`);
          if(capacityNotAvailable && !(oldStartTimeValue===basedStartTime)){
            setShowError(true);
          }
          setTempValue(date);
        }
      }
    }
    //Once clicking out of the calendar (Update the newValue) (ONLY IF NO ERRORS)
    const updateNewValue = () => {
      if(!showError && !showErrorGeneral){
      updateFunction(Date.parse(tempValue)/1000);
    }
    }
    React.useEffect(() =>{    
      console.log('ONE CHECK');
      VerifyDate(tempValue);
    },[])
    return(
      <>
      {edit ? 
      <div >
        <input id={id}  value={tempValue}
          min="2018-06-07T00:00"
          style={editableCell} 
          type="datetime-local" 
          onChange={(e) => VerifyDate(e.target.value)}
          onBlur={(e) => updateNewValue()}
          />
          {showErrorGeneral && <div style={ErrorMessageStyle}>{errorMessageGeneral}</div>}
          {showError && <div style={ErrorMessageStyle}>{errorSegmentNotAvailable}</div>}
      </div> :
      <div>
        {format(new Date(value * 1000), 'd.MM.yyyy HH:mm:ss')}
      </div>
      }
      </>
    )
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*                                                                      Editable Check Box Form                                                                      */
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const CheckBoxEditable = ({id, value, updateFunction} : any) => {
    const verifyCheckBoxCondition = () => {
      console.log("VERIFIED CHECKBOX CONDITION");
    }
    return(
      <>
      {edit ? 
      <div >
        <input type="checkbox" id={id} name="scales" checked={value} onChange={()=>updateFunction(!value)} onBlur={()=> verifyCheckBoxCondition()}/>
      </div> :
      <div>
        {<input disabled={true} type="checkbox" id="scales" name="scales" checked={value}/>}
      </div>
      }
      </>
    )
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*                                                                      Editable Text Field                                                                          */
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const TextEditableCell = ({id, value, updateFunction} : any) => {
    let errorMessage = "";
    const [tempValue, setTempValue] = React.useState(value);
    const [showError, setShowError] = React.useState(false);
    if(id === 'phone_number'){
      errorMessage = 'Test Error Message';
    }
    else if(id==='email'){
      errorMessage = 'Test Error Message Email';
    }
    const verifyTextFieldConditions = () => {
      if(id === 'phone_number'){
      let patternPhoneNumber = /420[1-9][0-9]{8}$/;
      let resultPhoneNumberValidation = patternPhoneNumber.test(tempValue);
      if(!resultPhoneNumberValidation){setShowError(true);}else{setShowError(false)}
      } else if(id === 'email'){
        let patternEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        let resultEmailValidation = patternEmail.test(tempValue);
        if(!resultEmailValidation){setShowError(true);}else{setShowError(false)}
      }
      updateFunction(tempValue);
    }
    return(
      <>
        {edit ? <div><input type="text" id={id} name={id} style={editableCell} value={`${tempValue}`} onBlur={()=> verifyTextFieldConditions()} onChange={(e)=> setTempValue(e.target.value)}/>{showError && <div style={ErrorMessageStyle}>{errorMessage}</div>}</div>:<div>+{value}</div>}
      </>
    )
  }
  return(
          <tr id={inv.invoiceId}>
            {/*<td style={tableCell}><div style={edit ? tableCellEditable : EmptyStyle }>{inv.invoiceId}</div></td>*/}
            {/*<td style={tableCell}>{inv.invoiceType}</td> */}
            <td style={tableCell}><DropDownEditableCell name={`list_of_services`} value={newService} listOfValues={locationList} updateFunction={setNewService}/></td>
            <td style={tableCell}><TimeStampEditableCell value={newStartTime} originalValue={oldStartTime} updateFunction={setNewStartTime}/></td>
            <td style={tableCell}><DropDownEditableCell name={`list_of_lengths`} updateFunction={setNewLength} value={newLength} listOfValues={Array.from(Array(parseInt(globalVariabes.maxOccupancy)+1).keys()).slice(1)}/></td>
            <td style={tableCell}>PlaceHolder</td>
            <td style={tableCell}><CheckBoxEditable id={'instructor_checkbox'} value={newWithInstructor} updateFunction={setNewWithInstructor}/></td>
            <td style={tableCell}><TextEditableCell id={'customer_name'} value={newName} updateFunction={setNewName}/></td>
            <td style={tableCell}><TextEditableCell id={'email'} value={newEmail} updateFunction={setNewEmail}/></td>
            <td style={tableCell}><TextEditableCell id={'phone_number'} value={newPhoneNumber} updateFunction={setNewPhoneNumber}/></td>
            <td style={tableCell}>{comment.map((c : any) => {if(c!==''){return (<>-{c}<br/></>)}else{return(<></>)}})}</td>
            <td style={iconsCell}>
              {!edit && <i style={iconStyle} className="fas fa-edit" onClick={() => setEdit(true)}></i>}
              {!edit && <i style={iconStyle} className="fa fa-trash" aria-hidden="true" onClick={()=>{setSelectedBooking(inv);setShowUpPopUpCancelation(true)}}></i>}
              {edit && <i  style={iconStyle} className="fas fa-save"></i>}
              {edit && <i  style={iconStyle} className="fa fa-times" onClick={() => setEdit(false)} aria-hidden="true"></i>}
            </td>
          </tr>
        )
 }