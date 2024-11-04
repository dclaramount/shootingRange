import React from 'react';
import {AdminBookingsContext} from "../../components/Context/AdminBookingsContext";
import {ManagementDashboardContext} from "../../components/Context/ManagementDashboardContext";
import {useMediaQuery} from "../../components/hooks/useMediaQuery";
import {RenderHeader} from "../../components/RenderHeader";
import {BookingCalendarWrappper} from "../../components/BookingCalendarWrapper";
import { BookingFormWrapper } from '../../components/BookingFormWrapper';
import Popup from "reactjs-popup";
import { BookingFlowSpace } from '../../components/BookingFlowSpace';
import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function AdminBookingSpace() {
    const respArray : any[]                                             =   [];
    const [refreshBookingEnv, setRefreshBookingEnv]                     =   React.useState(0);
    const {selectedWeek, setSelectedSegment, setSelectedBookingDuration,
        setShootingPermitNumber, setName, setEmail, setPhone, setComment,
        showingPage, setShowingPage, showPopUpBookingProcess,
        setShowPopUpBookingProcess, showWarningChooseAnotherSegment,
        setShowWarningChooseAnotherSegment, isNormalComputer,
        setIsNormalComputer}                                             =   React.useContext(AdminBookingsContext);
    const {refreshManagementDashboard: refreshEntirePlugin,
        setRefreshManagementDashboard: setRefreshEntirePlugin}           =   React.useContext(ManagementDashboardContext);
    const scaleFactor = window.innerWidth/430;
    setIsNormalComputer(useMediaQuery('(min-width: 500px)'));
    const closeModal = (e : any) => {
        if(e==="BOOKING_COMPLETE"){
            setShowPopUpBookingProcess(false);
            setShowingPage("DASHBOARD"); //TOVERIFY: This should be set like this as shown page is handle different in the management dashboard
            setSelectedSegment([]);
            setName("");
            setEmail("");
            setPhone("");
            //setShootingPermitNumber(""); NOT USED IN THE MANAGEMENT DASHBOARD
            setSelectedBookingDuration(1);
            setComment("");
            setRefreshBookingEnv(refreshBookingEnv + 1);
            setRefreshEntirePlugin(!refreshEntirePlugin);
        }
        else{
            setShowPopUpBookingProcess(false);
        }
    }
    const closeModalWarning = () => {
        setShowWarningChooseAnotherSegment(false);
    }
    return(
        <>
            <div className='BookingSpaceWrapper' style={styles.container(isNormalComputer, showPopUpBookingProcess, showWarningChooseAnotherSegment, scaleFactor)}>
                <div className="wrapperPopUp" style={stylesWrapperPopUp.container(isNormalComputer, showPopUpBookingProcess, showWarningChooseAnotherSegment, scaleFactor)}>
                    {(showingPage!=="POPUP_LENGTH" && showingPage!=="CONFIRMATION_PAGE") &&  <RenderHeader/>}
                    <div style={{ display:'flex'}}>
                    {showingPage==="BOOKING_CALENDAR" &&
                        <div style={{width:'100%'}}>
                            <BookingCalendarWrappper/>
                        </div>}
                        {showingPage==="BOOKING_CALENDAR" && <BookingFormWrapper/>}
                    </div>
                </div>
            </div>
            <Popup open={showPopUpBookingProcess} onClose={closeModal} closeOnDocumentClick={false} >
                <BookingFlowSpace closeModalFunction={closeModal}/>
            </Popup>
            <Popup open={showWarningChooseAnotherSegment} onClose={closeModalWarning} closeOnDocumentClick={false} >
                <div style={{backgroundColor:'white', width:'500px', height:'250px', paddingTop:'5px', paddingRight:'15px', paddingLeft:'15px', paddingBottom:'15px', border:'2px solid black', borderRadius:'10px', outline:'10px solid transparent', display:'flex', flexDirection:'column'}}>
                    <WarningIcon style={{height:'72px', width:'72px', marginLeft:'auto', marginRight:'auto', marginTop:'10px', marginBottom:'10px', color:'orange'}}/>
                    <Typography sx={{ p: 2 }} style={{ fontWeight:'bold', color:'black', textAlign:'center'}}>Vybral/a jste čas, který přesahuje do rezervace, která je plná. Prosíme o vybránní nového času nebo zkrácení doby rezervace.</Typography>
                    <Button onClick={()=>setShowWarningChooseAnotherSegment(false)} variant='contained' style={{backgroundColor:'orange', fontWeight:'bolder', color:'white', width:'auto'}}>
                    Close
                    </Button>
                </div>
            </Popup>
        </>
    )}
const styles = {
    container: (isNormalComputer: boolean, showPopUpBookingProcess: boolean, showWarningChooseAnotherSegment:boolean, scaleFactor:any)  => ({
        display:'flex',
        opacity:(showPopUpBookingProcess || showWarningChooseAnotherSegment) ? '0.5' : '1',
        pointerEvents: showPopUpBookingProcess ? 'none' as React.CSSProperties["pointerEvents"] : 'auto' as React.CSSProperties["pointerEvents"],
        flexDirection: isNormalComputer ? 'row' as React.CSSProperties["flexDirection"] : 'column' as React.CSSProperties["flexDirection"],
        width: '100%',
        scale: isNormalComputer ? 'unsnet' : scaleFactor
    })
};
const stylesWrapperPopUp = {
    container: (isNormalComputer: boolean, showPopUpBookingProcess: boolean, showWarningChooseAnotherSegment:boolean, scaleFactor:number)  => ({
        opacity:`${(showPopUpBookingProcess || showWarningChooseAnotherSegment) ? '0.5' : '1'}`,
        pointerEvents: showPopUpBookingProcess ? 'none' as React.CSSProperties["pointerEvents"] : 'auto' as React.CSSProperties["pointerEvents"],
        height: isNormalComputer ? 'unsnet' : `${(1/scaleFactor) * 710}px`
    })
};
