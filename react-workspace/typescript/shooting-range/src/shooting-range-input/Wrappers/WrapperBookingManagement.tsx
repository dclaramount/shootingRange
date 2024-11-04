import React from 'react';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';
import { EditBookingsSpace } from '../Spaces/EditBookingsSpace/EditBookingsSpace';
import {EditBookingsContextProvider} from "../../Common/Contexts/EditBookingsContext.";

const WrapperBookingManagement = () => {
    const   cManagementDashboard                =   React.useContext(ManagementDashboardContext);
    return(
        <EditBookingsContextProvider listGlobalVariables={cManagementDashboard.globalVariabes}>
            <EditBookingsSpace/>
        </EditBookingsContextProvider>
    )
}
export default WrapperBookingManagement;