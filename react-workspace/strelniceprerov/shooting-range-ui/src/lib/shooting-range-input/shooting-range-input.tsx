import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import axios from 'axios';
import TabManagement from './components/TabManagement';
import { WrapperManagementDashboard } from './components/WrapperManagementDashboard';

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
export function ShootingRangeInput(props: ShootingRangeInputProps) {
  const [globalVariables, setGlobalVariables] = React.useState({});
  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getGlobalVariables.php",
      method: "GET",
  }).then((res) => {
    console.log("WE ARE HERE");
    console.log(res);
    setGlobalVariables(({
      startBusinessHours: res.data.find((variable : any) => variable.name==="Start_Business_Hours").value,
      endBusinessHours:   res.data.find((variable : any) => variable.name==="End_Business_Hours").value,
      startDayHours:      res.data.find((variable : any) => variable.name==="Start_Day_Hours").value,
      endDayHours:        res.data.find((variable : any) => variable.name==="End_Day_Hours").value,
      apiRootURL:         res.data.find((variable : any) => variable.name==="API_URL").value
    }))
  })
    .catch((err) => { console.log(err) });
  },[])
  return (  
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="reservation">
          {Object.keys(globalVariables).length > 0 ? <WrapperManagementDashboard gVariables={globalVariables}/> : "LOADING Management Dasboard..."}
        </div>
      </div>
    </div>
  </div>);
}

/**
 * Exposing props to elementor through the web component
 */
ShootingRangeInput.propTypes = ShootingRangeInputPropsTypes;
