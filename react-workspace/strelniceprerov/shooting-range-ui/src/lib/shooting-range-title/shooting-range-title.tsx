import { useSelector } from 'react-redux';
import { falseEntitySelector } from '../store';
import PropTypes, { InferProps } from 'prop-types';
import { ShootingRangeTitleView } from './shooting-range-title.view';
import React from 'react';
import axios from 'axios';
import Clock from 'react-live-clock';
import { WrapperBooking } from './components/WrapperBooking';


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
  const [refreshData, setRefreshData] = React.useState(0);
  const [timeStamp, setTimeStamp] = React.useState(null);

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
      .then((res) => { 
        console.log(res.data.timestamp);  
        setTimeStamp(res.data.timestamp);
      })
      .catch((err) => { 
        console.log(err) 
      });
  },[refreshData])

  function callBackClock(e:any){
    console.log(e);
    setRefreshData(e);
  }
  return (    
    <div className="wrapper-diego">
      {/*<h1 className='header-custom'>This is the place holder</h1>*/}
      <Clock style={{visibility:'hidden'}} format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} onChange={(e) => callBackClock(e)}/>
      {/*timeStamp !== null ? <>Response time-stamp:{timeStamp}</> : <>Waiting</>*/}
      <WrapperBooking/>
    </div>)
}

/**
 * Exposing props to elementor through the web component
 * /!\ o not use this for state management
 */
ShootingRangeTitle.propTypes = ShootingRangeTitlePropsTypes;
