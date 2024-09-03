import * as React from 'react';
import {AdminBookingsContext} from "./Context/AdminBookingsContext";


export const LegendText = () => {
  const { isNormalComputer } = React.useContext(AdminBookingsContext);
  return(
      <div className="reservation-cal-legend" style={stylesLegendWrapper.container(isNormalComputer)}>
        <p className="visible-xs-block">
          Vyberte dostupný čas rezervace v levém kalendáři a vpravo doplňte údaje o rezervaci.
        </p>
        <div className="reservation-cal-legend-item occupied" >
          <em>.</em>
          <span>Obsazeno</span>
        </div>
        <div className="reservation-cal-legend-item occupiedPartly">
          <em>.</em>
          <span>Částečně obsazeno</span>
        </div>
        <div className="reservation-cal-legend-item free">
          <em>.</em>
          <span>Volno</span>
        </div>
      </div>
  );
};

const stylesLegendWrapper = {
  container: (isNormalComputer: boolean)  => ({
    fontSize: isNormalComputer ? '0.9em' : 'x-small'
  })
};