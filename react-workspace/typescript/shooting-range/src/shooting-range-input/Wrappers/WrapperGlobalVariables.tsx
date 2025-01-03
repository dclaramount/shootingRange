import React from 'react';
import { REQUEST_STATUS } from '../ApiCalls/enums';
import { useGetEndPoint } from '../ApiCalls/useGetEndPoint';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';
import { Spinner } from '../shared/Placeholders';
import { GlobalVariablesProvider } from '../Context/GlobalVariablesContext';
import GlobalVariablesManagement from '../Spaces/GlobalVariablesSpace/GlobalVariablesManagement';
import { TextPlaceholder } from '../../Shared/Components';
import { Translations } from '../types/translations';

const WrapperGlobalVariables = () => {
  let dataFetched = false;
  const { globalVariabes } = React.useContext( ManagementDashboardContext );
  const fetchGlobalVariables = useGetEndPoint( globalVariabes.apiRootURL, 'getAllGlobalVariables' );
  dataFetched = fetchGlobalVariables.requestStatus === REQUEST_STATUS.SUCCESS
  return (
    <>
      {dataFetched ?
        <GlobalVariablesProvider gVariables={fetchGlobalVariables.payload}>
          <GlobalVariablesManagement />
        </GlobalVariablesProvider>
        :
        <div style={{ width: '100%', height: '800px' }}>
          <TextPlaceholder text={Translations.Loading} />
        </div>
      }
    </>
  )
}
export default WrapperGlobalVariables;