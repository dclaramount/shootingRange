import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

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
export function BookingConfPlaceHolder() {
  return (
    <div style={{padding:'50px', backgroundColor:'white'}}>
      <Skeleton variant="rectangular" width={'398px'} height={40} style={{margin:'10px'}}/>
      <div style={{marginTop:'15px', marginRight:'27px', marginLeft:'27px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'32px'} height={32}/>
        <Skeleton variant="rectangular" width={'310px'} height={32} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'15px', marginRight:'27px', marginLeft:'27px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'32px'} height={32}/>
        <Skeleton variant="rectangular" width={'310px'} height={32} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'15px', marginRight:'27px', marginLeft:'27px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'32px'} height={32}/>
        <Skeleton variant="rectangular" width={'310px'} height={32} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'15px', marginRight:'27px', marginLeft:'27px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'32px'} height={32}/>
        <Skeleton variant="rectangular" width={'310px'} height={32} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'15px', marginRight:'27px', marginLeft:'27px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'32px'} height={32}/>
        <Skeleton variant="rectangular" width={'310px'} height={32} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'15px', marginRight:'27px', marginLeft:'27px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'32px'} height={32}/>
        <Skeleton variant="rectangular" width={'310px'} height={32} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'15px', marginRight:'27px', marginLeft:'27px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'32px'} height={32}/>
        <Skeleton variant="rectangular" width={'310px'} height={32} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'15px', marginRight:'27px', marginLeft:'27px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'32px'} height={32}/>
        <Skeleton variant="rectangular" width={'310px'} height={32} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'15px', marginRight:'27px', marginLeft:'27px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'32px'} height={32}/>
        <Skeleton variant="rectangular" width={'310px'} height={32} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'22px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'12px'} height={12}/>
        <Skeleton variant="rectangular" width={'280px'} height={14} style={{marginLeft:'10px'}}/>
      </div>
      <div style={{marginTop:'15px', display:'flex'}}>      
        <Skeleton variant="rectangular" width={'150px'} height={35} style={{marginLeft:'auto', marginRight:'auto'}}/>
      </div>
    </div>
  );
}
export function CreatingBookingPlaceholder() {
  return(
    <div style={{width:'100%', height:'100%', display:'flex'}}>
      <div style={{background:'white', width: '100%', height:'100%',padding:'5px', border:'2px solid black', borderRadius:'10px', display:'flex' }}>
        <div style={{margin:'auto', width:'auto', height:'auto'}}>
        <i className="fa fa-spinner fa-spin" style={{fontSize:'84px'}}></i>
        </div>
      </div>
    </div>
  )
}