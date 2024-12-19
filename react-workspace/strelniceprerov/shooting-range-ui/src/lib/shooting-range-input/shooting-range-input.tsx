import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import axios from 'axios';
import TabManagement from './components/TabManagement';
import { WrapperManagementDashboard } from './components/WrapperManagementDashboard';
import { CustomResponse, ManagementPluginPayload } from '../shared/types';
import { apiCallsManagementPlugIn, initializeCustomerResponseObject } from '../shared/GeneralAPIHelpers';
import { API_REQUEST_STATUS } from '../shared/enums';
import { TextPlaceholder } from './shared/Placeholders';
import { Translations } from '../shared/Translations';

export const ShootingRangeInputPropsTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

export type ShootingRangeInputProps = InferProps<
  typeof ShootingRangeInputPropsTypes
>;

/**
 * Same component linked to the store
 */
export function ShootingRangeInput ( props: ShootingRangeInputProps ) {
  const [globalVariables, setGlobalVariables] = React.useState( {} );
  /********************************************************************************************************************************/
  /* PART TO DEFINE LOCAL ENVIRONMENT */
  /********************************************************************************************************************************/
  const envVariables: string[] = process.env.NX_RELEASE_VERSION === undefined ? [] : process.env.NX_RELEASE_VERSION.split( '.' );
  let thisEnv = envVariables[0];
  let localURL = '';
  if ( envVariables.length > 1 ) {
    localURL = envVariables[1];
  }
  let URL = "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getGlobalVariables.php";
  if ( thisEnv === 'local' ) {
    URL = `http://${localURL}.local/wp-content/plugins/elementor/getGlobalVariables.php`;
  }
  const [renderTime, SetRenderTime] = React.useState( new Date() );
  const apiCalls: React.MutableRefObject<CustomResponse> = React.useRef<CustomResponse>( initializeCustomerResponseObject() );
  /********************************************************************************************************************************/
  /*                                                    MANAGEMENT DASHBOARD                                                      */
  /********************************************************************************************************************************/
  React.useEffect( () => {
    async function FetchData (): Promise<void> {
      apiCalls.current = await apiCallsManagementPlugIn();
      if ( apiCalls.current.status === API_REQUEST_STATUS.SUCCESS ) { SetRenderTime( new Date() ) }
    }
    FetchData();
  }, [] )
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="reservation">
            {apiCalls.current.status === API_REQUEST_STATUS.LOADING ? <div style={{ width: '100%', height: '800px' }}><TextPlaceholder text={Translations.Tex_Loading_Management_Dashboard} /></div> : ( apiCalls.current.status < API_REQUEST_STATUS.BAD_REQUEST ? <WrapperManagementDashboard {...apiCalls.current.payload as ManagementPluginPayload} /> : <>FAILURE</> )}
          </div>
        </div>
      </div>
    </div> );
}

/**
 * Exposing props to elementor through the web component
 */
ShootingRangeInput.propTypes = ShootingRangeInputPropsTypes;
