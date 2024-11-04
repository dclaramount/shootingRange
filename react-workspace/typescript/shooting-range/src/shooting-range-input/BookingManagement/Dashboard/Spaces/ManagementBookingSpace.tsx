import React from 'react';
import {ManagementDashboardContext} from "../../../Context/ManagementDashboardContext";
import {useGetEndPoint} from "../../../ApiCalls/useGetEndPoint";
import {REQUEST_STATUS} from "../../../ApiCalls/enums";
import {ManagementBookingPopUpProvider} from "../../../Context/ManagementBookingPopUpContext";
import {TextPlaceholder} from "../../../shared/Placeholders";
import {Translations} from "../../../types/translations";
import {ManagementPopUp} from "../Components/BookingsViewer/ManagementPopUp";

const ManagementBookingSpace = ({closeModalFunction} : any) => {
    let     dataFetched                         =   false;

    //Fetching required information from the DB prior to loading the dashboard
    const   {globalVariabes: globalVariables, selectedSegment, selectedLocation}   =   React.useContext(ManagementDashboardContext);
    const   fetchListOfFilteredInvoice          =   useGetEndPoint(globalVariables.apiRootURL, 'getInvoiceBy', `startSegmentTime=${selectedSegment[0]}&serviceId=${selectedLocation}`);
    dataFetched                                 =
        fetchListOfFilteredInvoice.requestStatus              === REQUEST_STATUS.SUCCESS


    return(
        <>
            {dataFetched ?
                <ManagementBookingPopUpProvider gVariables={globalVariables}
                                                startInvoiceList={fetchListOfFilteredInvoice.payload}
                >
                    <ManagementPopUp closeModalFunction={closeModalFunction}/>
                </ManagementBookingPopUpProvider>
                :
                <div style={{width:'100%', height:'800px'}}>
                    <TextPlaceholder text={Translations.Loading}/>
                </div>
            }
        </>
    )
}
export default ManagementBookingSpace;