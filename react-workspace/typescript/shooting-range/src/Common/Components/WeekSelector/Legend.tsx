export function Legend() {
    return(
        <div className="reservation-cal-legend">
            <p className="visible-xs-block">
                Vyberte dostupný čas rezervace v levém kalendáři a vpravo doplňte údaje o rezervaci.
            </p>
            <div className="reservation-cal-legend-item occupied">
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
    )
}