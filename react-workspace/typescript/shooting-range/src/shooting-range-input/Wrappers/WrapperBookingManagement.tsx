import React from 'react';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';
import { BookingManagementSpace } from '../Spaces/BookingManagementSpace/BookingManagementSpace';
import { EditBookingsProvider } from '../Context/EditBookingsContext';
import { Translations } from '../types/translations';
import { CustomResponse, EditBookingsTabType } from '../../Shared/types';
import { initializeCustomerResponseObject } from '../../Shared/GeneralAPIHelpers';
import { API_REQUEST_STATUS } from '../../Shared/enums';
import { apiCallsEditBookingsTab } from '../../Shared/MultiAPICalls';
import { PlaceHolderTabComponent } from '../../Shared/Components';

const WrapperBookingManagement = () => {
  const apiCalls: React.MutableRefObject<CustomResponse> = React.useRef<CustomResponse>( initializeCustomerResponseObject() );
  const [editBookingRenderTime, SetEditBookingRenderTime] = React.useState( new Date() );
  const { globalVariabes } = React.useContext( ManagementDashboardContext );
  /*-----------------------------------------------------------------------------------------------------------*/
  /*                          CALL OF APIS UPON RENDENRING THE TAB FOR EDITING RESERVATIONS                    */
  /*-----------------------------------------------------------------------------------------------------------*/
  React.useEffect( () => {
    async function FetchData (): Promise<void> {
      apiCalls.current = await apiCallsEditBookingsTab();
      if ( apiCalls.current.status === API_REQUEST_STATUS.SUCCESS ) { SetEditBookingRenderTime( new Date() ) }
    }
    FetchData();
  }, [] )
  return (
    <div className={`editBookingContainerTab`}>
      {
        apiCalls.current.status === API_REQUEST_STATUS.SUCCESS ?
          <EditBookingsProvider {...{ InputProps: apiCalls.current.payload as EditBookingsTabType, GlobalVariables: globalVariabes }} >
            <BookingManagementSpace />
          </EditBookingsProvider>
          :
          <div style={{ width: '100%', height: '800px' }}>
            <PlaceHolderTabComponent {...{ status: apiCalls.current.status, errorMessage: Translations.ErrorPlaceHolderTab, loadingMessage: Translations.Loading }} />
          </div>
      }
    </div >
  )
}
export default WrapperBookingManagement;