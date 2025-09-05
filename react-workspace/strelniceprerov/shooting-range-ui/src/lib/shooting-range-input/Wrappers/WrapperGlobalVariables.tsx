import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { Spinner, TextPlaceholder } from '../shared/Placeholders';
import { ManagementDashboardContext } from '../components/Context/ManagementDashboardContext';
import { GlobalVariablesProvider } from '../components/Context/GlobalVariablesContext';
import GlobalVariablesManagement from '../Spaces/GlobalVariablesSpace/GlobalVariablesManagement';
import { Translations } from '../types/translations';

const WrapperGlobalVariables = () => {
  let dataFetched = false;
  const { globalVariabes } = React.useContext( ManagementDashboardContext );
  const fetchGlobalVariables = useGetEndPoint( globalVariabes.apiRootURL, 'getAllGlobalVariables' );
  dataFetched = fetchGlobalVariables.requestStatus === REQUEST_STATUS.SUCCESS
  return (
    <div>
      {dataFetched ?
        <GlobalVariablesProvider gVariables={fetchGlobalVariables.payload}>
          <GlobalVariablesManagement />
        </GlobalVariablesProvider>
        :
        <div style={{ width: '100%', height: '800px' }}>
          <TextPlaceholder text={Translations.Loading} />
        </div>
      }
    </div>
  )
}
export default WrapperGlobalVariables;