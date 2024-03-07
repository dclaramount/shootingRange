import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import axios from 'axios';
import DataGridWrapper from './DataGridWrapper';
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
  const [allBookings, setAllBookings] = React.useState([]);
  React.useEffect(() =>{    
    axios({
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getAllBookings.php",
      method: "GET",
  }).then((res) => {setAllBookings(res.data)})
    .catch((err) => { console.log(err) });
  },[])

  return (  
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="reservation" style={{padding:'100px'}}>
          <DataGridWrapper Data={allBookings}/>
        </div>
      </div>
    </div>
  </div>);
}

/**
 * Exposing props to elementor through the web component
 */
ShootingRangeInput.propTypes = ShootingRangeInputPropsTypes;
