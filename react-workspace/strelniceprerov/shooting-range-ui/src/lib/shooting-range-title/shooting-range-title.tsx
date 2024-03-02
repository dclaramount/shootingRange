import { useSelector } from 'react-redux';
import { falseEntitySelector } from '../store';
import PropTypes, { InferProps } from 'prop-types';
import { ShootingRangeTitleView } from './shooting-range-title.view';
import React from 'react';
import axios from 'axios';

export const ShootingRangeTitlePropsTypes = {
  label: PropTypes.string,
};

export type ShootingRangeTitleProps = InferProps<
  typeof ShootingRangeTitlePropsTypes
>;

/**
 * Same component linked to the store
 */
export function ShootingRangeTitle(props: ShootingRangeTitleProps) {
  const v = useSelector(falseEntitySelector);

  React.useEffect(() =>{
    axios({
      // Endpoint to send files
      url: "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/test.php",
      method: "GET",
      headers: {
          // Add any auth token here
      },
      // Attaching the form data
  })
      // Handle the response from backend here
      .then((res) => { console.log(res.data.timestamp);  })
  
      // Catch errors if any
      .catch((err) => { console.log(err) });
  },[])
  
  return <ShootingRangeTitleView lastValue={v} {...props} />;
}

/**
 * Exposing props to elementor through the web component
 * /!\ o not use this for state management
 */
ShootingRangeTitle.propTypes = ShootingRangeTitlePropsTypes;
