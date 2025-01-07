import React from 'react';
import { format } from 'date-fns';
import { EditRowTable } from './EditRowTable';
import Popup from "reactjs-popup";
import axios from 'axios';
import { EditBookingsPopUpType, FilteredBookingsType, UserModificationType } from 'shooting-range-ui/src/lib/shared/types';
import { initializeModificationObject } from 'shooting-range-ui/src/lib/shared/GeneralAPIHelpers';
import { ManagementDashboardContext } from 'shooting-range-ui/src/lib/shooting-range-input/components/Context/ManagementDashboardContext';
import { Translations } from 'shooting-range-ui/src/lib/shooting-range-input/types/translations';
import { TextPlaceholder } from 'shooting-range-ui/src/lib/shared/Components';


const tableStyle: React.CSSProperties = { border: "1px solid black", borderCollapse: "collapse", borderRadius: '10px', marginTop: '15px', marginBottom: '15px' };
const headerCellStyle: React.CSSProperties = {
  border: "1px solid black",
  borderCollapse: "collapse",
  fontFamily: 'sans-serif',
  fontWeight: 'bolder',
  fontSize: '13px',
  fontStyle: 'italic',
  padding: '5px',
  textAlign: 'center',
}
const tableCellSummary: React.CSSProperties = {
  border: "1px solid black",
  borderCollapse: "collapse",
  fontFamily: 'sans-serif',
  fontSize: '10px',
  padding: '5px',
  textAlign: 'center'
}
//This Renders the PopUp that will navigate the user throughout the booking confirmation process.
export function ManagementPopUp ( props: React.PropsWithChildren<EditBookingsPopUpType> ) {
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
  const { globalVariabes, setTabSelector } = React.useContext( ManagementDashboardContext );
  const { closeModalFunction, locationList, selectedSegment, selectedLocation, allInvoices, setRefreshTab, filteredBookings, sendGridKeyAPI } = props;
  const [modificationInfo, setModificationInfo] = React.useState<UserModificationType>( initializeModificationObject() );
  const [showUpPopUpCancelation, setShowUpPopUpCancelation] = React.useState<boolean>( false );
  const [showUpPopUpModification, setShowUpPopUpModification] = React.useState<boolean>( false );
  const [selectedBooking, setSelectedBooking] = React.useState<FilteredBookingsType>( {} as FilteredBookingsType );

  const filtered: FilteredBookingsType[] = filteredBookings.filter( ( fb: FilteredBookingsType ) => ( format( fb.start, 'yyyy-MM-dd HH:mm:ss' ).includes( selectedSegment[0] ) && ( fb.serviceId === selectedLocation ) ) );
  const [deleteBooking, setDeleteBooking] = React.useState( 0 );
  const [newComment, setNewComment] = React.useState( "" );
  const [section, setSection] = React.useState( "LOADING" );
  const [userAccount, setUserAccount] = React.useState<UserEntry>( { ID: 0, id: "", name: "", email: "", phoneNumber: "", shootingPermit: "", updatedOn: new Date(), userId: "" } );
  const [response, setResponse] = React.useState( [] );

  function hasUserDataChanged ( entryUser: UserEntry ) {
    if ( userAccount.ID === 0 ) {
      return false;
    }
    else if ( entryUser.name === modificationInfo.newInfo.name && entryUser.email === modificationInfo.newInfo.email && entryUser.phoneNumber === modificationInfo.newInfo.phone ) {
      return false;
    }
    else {
      return true;
    }
  }

  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*                                                                      Editable Text Field                                                                          */
  /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const ModifyReservation = ( information: any, newComment: any ) => {
    setSection( "DELETE_OLD_RESERVATION" );
  }
  /*----------------------------------------------------------------------*/
  /*          USE EFFECT FOR THE PROCESS OF MODIFY A BOOKING            */
  /*----------------------------------------------------------------------*/
  React.useEffect( () => {
    //1 Step delete the previous reservation
    if ( section === "DELETE_OLD_RESERVATION" ) {
      axios( {
        url: `${globalVariabes.apiRootURL}postDeleteBooking.php?uuidInvoice=${modificationInfo.newInfo.uuid}`,
        method: "GET",
      } ).then( ( res ) => {
        if ( res.status === 200 ) {
          setSelectedBooking( {} as FilteredBookingsType );
          setRefreshTab( new Date() );
          setSection( "GETTING_USER_BY_EMAIL" )
        }
        else { setSection( "ERROR_ON_API_CALL" ) }
      } )
        .catch( ( err ) => {
          setSection( "ERROR_ON_API_CALL" );
        } );
    }
    //2 Step get the User Account by Email
    if ( section === "GETTING_USER_BY_EMAIL" ) {
      axios( {
        url: `${globalVariabes.apiRootURL}getUserRecordByEmail.php?userEmail=${modificationInfo.newInfo.email}`,
        method: "GET",
      } ).then( ( res ) => {
        if ( res.status === 200 ) {
          const userData: UserEntry[] = res.data.payload;
          setUserAccount( userData[0] );
          setSection( "VERIFY_DATA_USER" )
        }
        else {
          setSection( "ERROR_ON_API_CALL" );
        }
      } )
        .catch( ( err ) => {
          if ( err.response.status === 404 ) {
            setSection( "CREATE_NEW_USER" );
          }
          else {
            setSection( "ERROR_ON_API_CALL" );
          }
        } );
    }
    //2.1 Step get the User Account by PhoneNumber
    else if ( section === "GETTING_USER_BY_PHONE_NUMBER" ) {
      axios( {
        url: `${globalVariabes.apiRootURL}getUserRecordByPhoneNumber.php?phoneNumber=${modificationInfo.newInfo.phone}`,
        method: "GET",
      } ).then( ( res ) => {
        if ( res.status === 200 ) {
          const userData: UserEntry[] = res.data;
          if ( userData.length > 0 ) {
            setUserAccount( userData[0] );
            setSection( "VERIFY_DATA_USER" )
          }
          else {
            setSection( "VERIFY_DATA_USER" );
          }
        }
        else {
          setSection( "ERROR_ON_API_CALL" );
        }
      } )
        .catch( ( err ) => {
          setSection( "CREATING_RESERVATION_VERIFYING_USER" )
        } );
    }
    //3 Verify User Entry.
    else if ( section === "VERIFY_DATA_USER" ) {
      console.log( "Verifing User Data" )
      if ( hasUserDataChanged( userAccount ) ) {
        axios( {
          url: `${globalVariabes.apiRootURL}postUpdateUserEntry.php?id=${userAccount.id}&shootingPermit=${false}&shootingPermitNumber=${modificationInfo.newInfo.shootingPermit}&name=${modificationInfo.newInfo.name}&email=${modificationInfo.newInfo.email}&phone=${modificationInfo.newInfo.phone}`,
          method: "GET",
        } ).then( ( res ) => {
          setSection( "PROCEED_TO_CREATE_RESERVATION" );
        } )
          .catch( ( err ) => { console.log( err ) } );
      }
      else {
        setSection( "PROCEED_TO_CREATE_RESERVATION" );
      }
    }
    //4 Create Reservation.
    else if ( section === "PROCEED_TO_CREATE_RESERVATION" ) {
      axios( {
        url: `${globalVariabes.apiRootURL}postCreateBooking.php?selectedLocationId=${selectedLocation}&selectedSegment=${modificationInfo.newInfo.startTime.toLocaleString( 'en-CA', { timeZone: 'CET', hour12: false, } ).replace( ',', '' )}& selectedBookingDuration=${modificationInfo.newInfo.length}& selectedOccupancy=${1}& shootingInstructor=${modificationInfo.newInfo.withInstructor}& userId=${userAccount.id}& comment=${encodeURIComponent( newComment )}& uuidInvoice=${modificationInfo.newInfo.uuid} `,
        method: "GET",
      } ).then( ( res ) => {
        setResponse( res.data );
        setSection( "SEND_EMAIL" );
      } )
        .catch( ( err ) => { console.log( err ) } );
    }
    //4 Send Email Confirmation Reservation.
    else if ( section === "SEND_EMAIL" ) {
      const formatedDate = `${modificationInfo.newInfo.startTime.toLocaleString( 'cs-CZ', { timeZone: 'CET', hour12: false, } )} `;
      const formatedDateTimeZone = modificationInfo.newInfo.startTime.toLocaleString( 'cs-CZ', { timeZone: 'CET', hour12: false, } )
      const hours = new Date( formatedDateTimeZone ).getHours() + modificationInfo.newInfo.length
      const formatedSelectedSegment = modificationInfo.newInfo.length > 1 ? `${formatedDate} -${hours}:00:00` : formatedDate;
      axios( {
        url: `${globalVariabes.apiRootURL}postSendChangeEmail.php?sendGridKey=${sendGridKeyAPI}&emailTo=${modificationInfo.newInfo.email}&emailFrom=${globalVariabes.emailFrom}&templateId=${globalVariabes.changeEmailTemplateId}&segmentBooked=${formatedSelectedSegment}&nameOnReservation=${modificationInfo.newInfo.name}&shootingRangeName=${modificationInfo.newInfo.service}&phoneNumber=+${modificationInfo.newInfo.phone}&comment=${newComment}&uuidInvoice=${modificationInfo.newInfo.uuid} `,
        method: "GET",
      } ).then( ( res ) => {
        setResponse( res.data );
        setSection( "RESERVATION_MADE" );
        setTabSelector( 1 );
      } )
        .catch( ( err ) => { console.log( err ) } );
      setShowUpPopUpModification( false );
      closeModalFunction( "CLOSED" );
    }
  }, [section] )

  const AreThereChanges = () => {
    const oldInfo = modificationInfo?.oldInfo;
    const newInfo = modificationInfo?.newInfo;
    return ( true );
  }

  const closeModal = ( e: any ) => {
    setShowUpPopUpCancelation( false );
  }
  const closeModalModification = ( e: any ) => {
    setShowUpPopUpModification( false );
  }
  React.useEffect( () => {
    axios( {
      url: `${globalVariabes.apiRootURL}postDeleteBooking.php?uuidInvoice=${selectedBooking.uuid} `,
      method: "GET",
    } ).then( ( res ) => {
      setSelectedBooking( {} as FilteredBookingsType );
      setRefreshTab( new Date() );
      setShowUpPopUpCancelation( false );
    } )
      .catch( ( err ) => { console.log( err ) } );

    // const formatedDate = `${selectedBooking.start.toLocaleDateString( 'de-DE' )} ${selectedSegment[0].split( ' ' )[1]} `;
    // const formatedDateTimeZone = modificationInfo.newInfo.startTime.toLocaleString( 'cs-CZ', { timeZone: 'CET', hour12: false, } )
    // const hours = new Date( formatedDateTimeZone ).getHours() + modificationInfo.newInfo.length
    const formatedSelectedSegment = '';
    axios( {
      url: `${globalVariabes.apiRootURL} postSendDeleteEmail.php ? sendGridKey = ${sendGridKeyAPI}& emailTo=${selectedBooking.email}&emailFrom=${globalVariabes.emailFrom}& templateId=${globalVariabes.deleteEmailTemplate}&segmentBooked=${formatedSelectedSegment}& nameOnReservation=${selectedBooking.name}& shootingRangeName=${selectedBooking.serviceName}& phoneNumber=+${selectedBooking.phoneNumber}& comment=${'PLACEHOLDER'}& uuidInvoice=${selectedBooking.uuid} `,
      method: "GET",
    } ).then( ( res ) => {
      if ( res.status === 200 ) {
        setResponse( res.data );
        setTabSelector( 1 );
        setShowUpPopUpCancelation( false );
      }
    } )
      .catch( ( err ) => { console.log( err ) } );
  }, [deleteBooking] )
  return (
    <div>
      <div style={{ backgroundColor: 'white', width: '1250px', padding: '5px', border: '2px solid black', borderRadius: '15px', display: 'flex', flexDirection: 'column' }}>
        <div className="close" style={{ marginLeft: '98%', marginRight: 'auto', width: '24px', height: '24px', cursor: 'pointer' }} onClick={closeModalFunction}>
          <i className="fa fa-times"></i>
        </div>
        <div style={{ display: 'flex' }}>
          <i className="fa fa-bars" style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', marginRight: '5px', color: '#6c757d' }}></i>
          <caption id='Caption_Summary_Editing_Table' style={{ marginRight: 'auto', captionSide: 'top', fontSize: '20px', fontWeight: 'bolder', textAlign: 'center' }}>{Translations.EditBookingsTab.PopUpSummary.Title}</caption>
        </div>
        <table id="outputTable" style={tableStyle}>
          <tr>
            {/*<th style={headerCellStyle} >Invoice Id</th> */}
            {/*<th style={headerCellStyle}>Invoice Type</th> */}
            <th style={headerCellStyle}>{Translations.EditBookingsTab.PopUpSummary.TableHeaders.ShootingRange}</th>
            <th style={headerCellStyle}>{Translations.EditBookingsTab.PopUpSummary.TableHeaders.DateAndTime}</th>
            <th style={headerCellStyle}>{Translations.EditBookingsTab.PopUpSummary.TableHeaders.Hours}</th>
            <th style={headerCellStyle}>{Translations.EditBookingsTab.PopUpSummary.TableHeaders.ShootingPermit}</th>
            <th style={headerCellStyle}>{Translations.EditBookingsTab.PopUpSummary.TableHeaders.Instructor}</th>
            <th style={headerCellStyle}>{Translations.EditBookingsTab.PopUpSummary.TableHeaders.Name}</th>
            <th style={headerCellStyle}>{Translations.EditBookingsTab.PopUpSummary.TableHeaders.Email}</th>
            <th style={headerCellStyle}>{Translations.EditBookingsTab.PopUpSummary.TableHeaders.Telephone}</th>
            <th style={headerCellStyle}>{Translations.EditBookingsTab.PopUpSummary.TableHeaders.Comments}</th>
            <th></th>
          </tr>
          {filtered.map( ( invoiceInfo: FilteredBookingsType ) => {
            return ( <EditRowTable inv={invoiceInfo}
              showUpPopUpCancelation={showUpPopUpCancelation}
              setShowUpPopUpCancelation={setShowUpPopUpCancelation}
              showUpPopUpModification={showUpPopUpModification}
              setShowUpPopUpModification={setShowUpPopUpModification}
              selectedBooking={selectedBooking}
              setSelectedBooking={setSelectedBooking}
              setModificationInfo={setModificationInfo}
              {...props}
            /> )
          } )}
        </table>
      </div>
      <Popup open={showUpPopUpCancelation} onClose={closeModal} closeOnDocumentClick={false} >
        <div style={{ backgroundColor: 'white', padding: '25px', border: '2px solid black', borderRadius: '10px' }}>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <i className="fa fa-archive" style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', marginRight: '5px', color: '#6c757d' }}></i>
            <caption id='Caption_Summary_Editing_Table' style={{ marginRight: 'auto', captionSide: 'top', fontSize: '20px', fontWeight: 'bolder', textAlign: 'center' }}>{Translations.EditBookingsTab.PopUpDeletion.Title}</caption>
          </div>

          <h6>{Translations.EditBookingsTab.PopUpDeletion.Text} <div style={{ fontWeight: 'bolder' }}>{selectedBooking.uuid}</div></h6>
          <div style={{ display: 'flex', marginRight: '50%', marginLeft: '35px', marginTop: '40px' }}>
            <button style={{ marginRight: '10px' }} className="btn btn-danger" onClick={() => setDeleteBooking( deleteBooking + 1 )}>{Translations.EditBookingsTab.PopUpDeletion.DeleteButton}</button>
            <button className="btn" onClick={() => setShowUpPopUpCancelation( false )}>{Translations.EditBookingsTab.PopUpDeletion.CancelButton}</button>
          </div>
        </div>
      </Popup>
      <Popup open={showUpPopUpModification} onClose={closeModal} closeOnDocumentClick={false} >
        {section === "LOADING" ?
          <div id={`SummaryPopUpContainer`}>
            {( Object.keys( modificationInfo ).length > 0 ) ?
              <div style={{ backgroundColor: 'white', padding: '25px', border: '2px solid black', borderRadius: '10px', width: '535px', height: '635px' }}>
                <div style={{ display: 'flex' }}>
                  <i className="fa fa-bars" style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto', marginRight: '5px', color: '#6c757d' }}></i>
                  <caption id='Caption_Summary_Editing_Table' style={{ marginRight: 'auto', captionSide: 'top', fontSize: '20px', fontWeight: 'bolder', textAlign: 'center' }}>{Translations.EditBookingsTab.PopUpSummary.Title}</caption>
                </div>
                <table id="outputTable" style={tableStyle}>
                  <tr>
                    <th style={headerCellStyle}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableHeaders.Field}</th>
                    <th style={headerCellStyle}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableHeaders.Before}</th>
                    <th style={headerCellStyle}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableHeaders.After}</th>
                  </tr>
                  <tr id={'uuid'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.UUIDInvoice}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.uuid}</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.uuid}</th>
                  </tr>
                  <tr id={'locaitonId'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.LocationId}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.location}</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.location}</th>
                  </tr>
                  <tr id={'service'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.Service}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.service}</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.service}</th>
                  </tr>
                  <tr id={'startTime'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.StartTime}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.startTime.toLocaleString( 'cs-CZ', { timeZone: 'CET' } )}</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.startTime.toLocaleString( 'cs-CZ', { timeZone: 'CET' } )}</th>
                  </tr>
                  <tr id={'length'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.Duration}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.length} h</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.length} h</th>
                  </tr>
                  <tr id={'withInstructor'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.Instructor}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.withInstructor ? "s Instruktorem" : "bez Instruktorem"}</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.withInstructor ? "s Instruktorem" : "bez Instruktorem"}</th>
                  </tr>
                  <tr id={'shootingPermit'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.ShootingPermit}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.shootingPermit}</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.shootingPermit}</th>
                  </tr>
                  <tr id={'name'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.Name}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.name}</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.name}</th>
                  </tr>
                  <tr id={'email'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.Email}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.email}</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.email}</th>
                  </tr>
                  <tr id={'phone'}>
                    <th style={tableCellSummary}>{Translations.EditBookingsTab.SumaryChangesPopUp.TableRows.Telephone}</th>
                    <th style={tableCellSummary}>{modificationInfo.oldInfo.phone}</th>
                    <th style={tableCellSummary}>{modificationInfo.newInfo.phone}</th>
                  </tr>
                </table>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="reservation-order-row" style={{ width: '100%' }}>
                    <label htmlFor="frm-reservationCalendar-orderForm-phone">
                      {Translations.EditBookingsTab.SumaryChangesPopUp.Comments}
                    </label>
                    <textarea style={{ paddingTop: '25px', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '10px', width: '100%' }}
                      onChange={( e ) => setNewComment( e.target.value )} value={newComment} maxLength={150} rows={2} cols={29} />
                  </div>
                  <div style={{ display: 'flex', marginRight: '50%', marginLeft: '35px', marginTop: '40px' }}>
                    {AreThereChanges() ? <button style={{ marginLeft: '25%', marginRight: '50%' }} className="btn btn-danger" onClick={() => ModifyReservation( modificationInfo, newComment )}>{Translations.EditBookingsTab.SumaryChangesPopUp.ModifyButton}</button>
                      :
                      <button style={{ marginLeft: '25%', marginRight: '50%', opacity: '0.3', pointerEvents: 'none' }} className="btn" onClick={() => ModifyReservation( modificationInfo, newComment )}>{Translations.EditBookingsTab.SumaryChangesPopUp.ModifyButton}</button>}
                    <button className="btn" onClick={() => setShowUpPopUpModification( false )}>{Translations.EditBookingsTab.SumaryChangesPopUp.CancelButton}</button>
                  </div>
                </div>
              </div> :
              <>Diego</>
            }
          </div> :
          <div style={{ backgroundColor: 'white', padding: '25px', border: '2px solid black', borderRadius: '10px', width: '535px', height: '635px' }}>
            <TextPlaceholder text={Translations.EditBookingsTab.SumaryChangesPopUp.Loading} />
          </div>
        }
      </Popup >
    </div >
  )
}