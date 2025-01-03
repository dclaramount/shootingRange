import { Typography } from "@mui/material";
import { API_REQUEST_STATUS } from "./enums";
import { PlaceHolderTabProps } from "./types";

export function TextPlaceholder ( { text }: any ) {

  const addStylesheetRules = ( style: any ) => {
    const styleElement = document.createElement( 'style' );
    let styleSheet = null;

    document.head.appendChild( styleElement );

    styleSheet = styleElement.sheet;

    styleSheet?.insertRule( style, styleSheet.cssRules.length );
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
  addStylesheetRules( keyframesStyle );

  const container = {
    divStyle: {
      height: '100%',
      fontSize: '84px',
      fontWeight: 800,
      textAlign: 'center' as React.CSSProperties["textAlign"],
      fontFamily: `"Montserrat", "sans-serif"`

    },
    spanStyle: ( idx: number ) => ( {
      display: 'inline-block',
      margin: `calc(0 - '.05em')`,
      animationName: 'pulse',
      animationDuration: '1.4s',
      animationTimingFunction: 'ease',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate',
      animationFillMode: 'none',
      animationPlayState: 'running',
      animationTimeline: 'auto',
      animationRangeStart: 'normal',
      animationRangeEnd: 'normal',
      animationDelay: `${idx * 0.1}s`
    } ),
  }
  const cText: string[] = text.toString().split( "" );
  return (
    <div style={container.divStyle}>
      <div style={{ height: '50%' }}></div>
      {cText.map( ( c: string, index: number ) => <span style={container.spanStyle( index )} key={index}>{c}</span> )}
    </div>
  )
}

export function PlaceHolderTabComponent ( props: PlaceHolderTabProps ) {
  return (
    <div className={`containerPlaceHolderTab`} style={{ width: '100%', height: '100%', marginTop: '25%' }} >
      {props.status === API_REQUEST_STATUS.FAILURE && < i className="fa fa-exclamation-circle fa-8x" style={{ color: 'orange', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px', marginBottom: '15px' }} aria-hidden="true"></i>}
      {props.status === API_REQUEST_STATUS.FAILURE && <Typography sx={{ p: 2 }} style={{
        height: '100%', marginTop: 'auto', marginBottom: 'auto', fontSize: '40px', fontWeight: 'bold', color: 'orange', textAlign: 'center'
      }}>{props.errorMessage}</Typography>}
      {props.status === API_REQUEST_STATUS.LOADING && < TextPlaceholder text={props.loadingMessage} />}
    </ div >
  )
}