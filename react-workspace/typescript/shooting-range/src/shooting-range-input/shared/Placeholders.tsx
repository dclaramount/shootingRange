import React from "react";

export function Spinner() {
  return(
    <div style={{width:'100%', height:'100%', display:'flex'}}>
      <div style={{margin:'auto', width:'auto', height:'auto'}}>
      <i className="fa fa-spinner fa-spin" style={{fontSize:'84px'}}></i>
      </div>
  </div>
  )
}
export function SpinnerPulse() {
  return(
    <div style={{width:'100%', height:'100%', display:'flex'}}>
      <div style={{margin:'auto', width:'auto', height:'auto'}}>
      <i className="fas fa-spinner fa-pulse" style={{fontSize:'84px'}}></i>
      </div>
  </div>
  )
}
export function Arrows() {
  return(
    <div style={{width:'100%', height:'100%', display:'flex'}}>
      <div style={{margin:'auto', width:'auto', height:'auto'}}>
      <i className="fas fa-sync fa-spin" style={{fontSize:'84px'}}></i>
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