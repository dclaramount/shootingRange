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
          <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
          </Stack>
          </div>
      </div>
    </div>
  </div>
  );
}