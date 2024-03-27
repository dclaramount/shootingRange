import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function PlaceHolderBookingSection() {
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="reservation">
          <div className="reservation-date" style={{display:'flex', flexDirection:'column'}}>
            <Skeleton variant="rectangular" width={'300px'} height={48} style={{marginBottom:'10px'}}/>
            <Skeleton variant="rectangular" width={'360px'} height={20} style={{marginBottom:'10px'}}/>
            <div style={{display:'flex'}}>
            <Skeleton variant="circular" width={20} height={20} style={{marginRight:'5px'}}/>
            <Skeleton variant="rectangular" width={'86px'} height={20} style={{marginRight:'10px'}}/>
            <Skeleton variant="circular" width={20} height={20} style={{marginRight:'5px'}}/>
            <Skeleton variant="rectangular" width={'86px'} height={20} style={{marginRight:'10px'}}/>
            <Skeleton variant="circular" width={20} height={20} style={{marginRight:'5px'}}/>
            <Skeleton variant="rectangular" width={'86px'} height={20} style={{marginRight:'10px'}}/>
            </div>
          </div>
          <div className="reservation-cal">
            <div className="reservation-cal-table">
              <Skeleton variant="rectangular" style={{marginLeft:'300px'}} width={'100%'} height={'709px'} />
            </div>
          </div>
          <div className="reservation-order" style={{backgroundColor:'transparent'}}>
            <Skeleton variant="rectangular" width={'100%'} height={'709px'}  />
          </div>
          </div>
      </div>
    </div>
  </div>
  );
}