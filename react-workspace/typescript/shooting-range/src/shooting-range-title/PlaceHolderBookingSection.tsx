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
interface PlaceHolderProps {
  background?: string;
  text: string;
}
export function CreatingBookingPlaceholder({background='white', text}:PlaceHolderProps) {
  return(
    <div style={{width:'100%', height:'100%', display:'flex'}}>
      <div style={{background:`${background}`, width: '100%', height:'100%',padding:'5px', border:'2px solid black', borderRadius:'10px', display:'flex' }}>
        <div style={{margin:'auto', width:'auto', height:'auto'}}>
            <TextPlaceholder text={text}/>
        </div>
      </div>
    </div>
  )
}
export function TextPlaceholder({text}:any){

    const addStylesheetRules = (style : any) => {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('id', 'Animation_Style');
        let styleSheet = null;

        document.head.appendChild(styleElement);

        styleSheet = styleElement.sheet;

        styleSheet?.insertRule(style, styleSheet.cssRules.length);
    }
    const keyframesStyle = `
      @-webkit-keyframes pulse {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
      }
    `;
    addStylesheetRules(keyframesStyle);

    const container = {
        divStyle:{
            height: '100%',
            fontSize: '84px',
            fontWeight: 800,
            textAlign: 'center' as React.CSSProperties["textAlign"],
            fontFamily: `"Montserrat", "sans-serif"`

        },
        spanStyle :(idx: number) => ({
            display: 'inline-block',
            margin: `calc(0 - '.05em')`,
            animationName: 'pulse',
            animationDuration: '1.4s',
            animationTimingFunction: 'ease',
            animationIterationCount:'infinite',
            animationDirection:'alternate',
            animationFillMode:'none',
            animationPlayState:'running',
            animationTimeline:'auto',
            animationRangeStart: 'normal',
            animationRangeEnd:'normal',
            animationDelay: `${idx*0.1}s`
        })
    }

    const cText :string[] = text.toString().split("");
    return(
        <div style={container.divStyle}>
            <div style={{height:'50%'}}></div>
            {cText.map((c : string, index : number) => <span style={container.spanStyle(index)} key={index}>{c}</span>)}
        </div>
    )

}