import React from 'react';
import {RenderHeader} from "../../components/RenderHeader";
import {AdminBookingsContext} from "../../Context/AdminBookingsContext";
import {ManagementDashboardContext} from "../../Context/ManagementDashboardContext";
import {useMediaQuery} from "../../hooks/useMediaQuery";

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
                </div>
            </div>
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
