import { ShootingRangeSelectorProps } from 'shooting-range-ui/src/lib/shared/types';
import { Translations } from '../../../../types/translations';

export function SelectedShootingRange ( props: ShootingRangeSelectorProps ) {

  const { locationList, setSelectedLocation, selectedLocation } = props;
  return (
    <div className="reservation-order-row" style={{ marginTop: '20px' }}>
      <div className="select-box">
        <label htmlFor="select-location-dropdown-menu">Střelnice</label>
        <select onChange={( e ) => setSelectedLocation( parseInt( e.target.value ) )} name="service" id="select-location-dropdown-menu" defaultValue={selectedLocation}>
          <option value="" selected disabled hidden>{Translations.ManagementDashboard.Default_Select_Service}</option>
          {locationList.map( ( location: any ) => {
            return (
              <option value={location.id}>{location.serviceName}</option>
            )
          } )}
        </select>
      </div>
    </div>
  )
}