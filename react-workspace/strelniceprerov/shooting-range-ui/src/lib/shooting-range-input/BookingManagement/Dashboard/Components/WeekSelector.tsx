import React from 'react';
import { HonestWeekPicker } from './WeekSelector/WeekPicker';
import { getFirstAndLastDayOfThisWeek } from '../../../helper_functions/generalFunctions';
import { fetchFilteredBookings } from 'shooting-range-ui/src/lib/shared/APICalls';
import { API_REQUEST_STATUS } from 'shooting-range-ui/src/lib/shared/enums';
import { initializeCustomerResponseObject } from 'shooting-range-ui/src/lib/shared/GeneralAPIHelpers';
import { CustomResponse, FilteredBookingsType, HonestWeekType, WeekSelectorProps, WeekSelectorUpdatedCallBackType } from 'shooting-range-ui/src/lib/shared/types';
export function WeekSelector ( props: React.PropsWithChildren<WeekSelectorProps> ) {
  /*-----------------------------------------------------------------------------------------------------------*/
  /*                                  USESTATE(), USEREF() AREA                                                */
  /*-----------------------------------------------------------------------------------------------------------*/
  const apiCalls: React.MutableRefObject<CustomResponse> = React.useRef<CustomResponse>( initializeCustomerResponseObject() );
  const [daysOfWeek, setDaysOfWeek] = React.useState<string[]>( [] as string[] );
  const [selectedWeek, setSelectedWeek] = React.useState<HonestWeekType>( getFirstAndLastDayOfThisWeek() );
  const [isoDaysOfWeek, setISODaysOfWeek] = React.useState<string[]>( [] as string[] );
  /*-----------------------------------------------------------------------------------------------------------*/
  /*                              ON CHANGE () FOR THE WEEK SELECTOR                                           */
  /*-----------------------------------------------------------------------------------------------------------*/
  const onChange = ( week: HonestWeekType ) => {
    setSelectedWeek( week );
    const arrayDaysOfWeek = []
    const isoDaysOfWeek = []
    for ( let i = 0; i <= 7; i++ ) {
      const dt = new Date( week.firstDay );
      dt.setDate( dt.getDate() + i );
      isoDaysOfWeek.push( dt.toISOString().split( 'T' )[0] );
      if ( i < 7 ) {
        arrayDaysOfWeek.push( `${dt.getDate()}.${dt.getMonth() + 1}` );
      }
    }
    setISODaysOfWeek( isoDaysOfWeek );
    setDaysOfWeek( arrayDaysOfWeek );
  };
  /*-----------------------------------------------------------------------------------------------------------*/
  /*                          CALL OF APIS UPON RENDENRING THE WEEK SELECTOR                                   */
  /*-----------------------------------------------------------------------------------------------------------*/
  React.useEffect( () => {
    async function FetchData (): Promise<void> {
      apiCalls.current = await fetchFilteredBookings( {
        endpoint: `getBookingsFiltered.php`,
        firstDay: ( new Date( selectedWeek.firstDay ) ).toISOString(),
        lastDay: ( new Date( selectedWeek.lastDay ) ).toISOString(),
        selectedLocation: props.selectedLocation
      } );
      if ( apiCalls.current.status === API_REQUEST_STATUS.SUCCESS ) {
        const params: WeekSelectorUpdatedCallBackType = {
          daysOfWeek: daysOfWeek,
          selectedWeek: selectedWeek,
          filteredBookings: apiCalls.current.payload as FilteredBookingsType[],
          isoDaysOfWeek: isoDaysOfWeek
        }
        props.CallBackFc( params )
      }
    }
    FetchData();
  }, [selectedWeek, props.selectedLocation] )
  return (
    <div className="reservation-date">
      <label>Datum</label>
      <HonestWeekPicker onChange={onChange} />
    </div>
  )
}