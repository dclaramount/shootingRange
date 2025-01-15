import { format } from 'date-fns';
import React from 'react';
import { DaysColumPropsType, FilteredBookingsType, SummaryBookingsType } from '../../../../../Shared/types';

function bookedOccupancy ( sBookings: SummaryBookingsType[], sFilteredBookings: FilteredBookingsType[], day: any, daysOfWeek: any, isoDaysOfWeek: any, time: any, selectedServiceId: any, locationList: any, allInvoices: any, selectedLocation: any ) {
  const idx = daysOfWeek.indexOf( day );
  const currentDayToAnalyze = new Date( `${isoDaysOfWeek[idx + 1]} ${time}` );
  const formatedCurrentSegmentToAnalyze = format( currentDayToAnalyze, 'yyyy-MM-dd HH:mm:ss' );
  const bookingsForTheSegment = sFilteredBookings.length > 0 ? sFilteredBookings.filter( ( sb: FilteredBookingsType ) => ( format( sb.start, 'yyyy-MM-dd HH:mm:ss' ) === formatedCurrentSegmentToAnalyze ) && ( sb.serviceId ) === parseInt( selectedServiceId ) ) : [];
  const color = 'white';
  const names: string[] = [];
  bookingsForTheSegment.forEach( ( bfts: FilteredBookingsType, idx: number ) => { if ( idx < 2 ) { names.push( `${bfts.name} ${bfts.withComments ? '*' : ''}` ) } else if ( idx === 2 ) { names.push( `${bfts.name}...` ) } } )
  if ( bookingsForTheSegment.length > 0 ) {
    console.log( bookingsForTheSegment )
    return (
      <div className="reservation-cal-legend-item occupied" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '0 5px 0 5px', margin: '0px' }}>
        {bookingsForTheSegment.map( ( bfts: FilteredBookingsType ) =>
          <span style={{ width: '100%', height: '100%', textAlign: 'left', display: 'flex' }} id={`${isoDaysOfWeek[idx + 1]} ${time}`}>
            <div style={{ fontSize: '8px', margin: '0px', padding: '0px', fontWeight: 'lighter', pointerEvents: 'none' }}>
              {`${bfts.name} ${bfts.comments.some( ( c: string ) => c ) ? '*' : ''}`}
            </div>
            <em style={{ marginBottom: 'auto', marginTop: '5px', display: 'inline-block', width: '10px', height: '10px', border: `1px solid ${color === 'white' ? 'black' : `${color}`}`, background: `${color}`, color: `${color}`, borderRadius: '50%', margin: '0 5px 0 auto', pointerEvents: 'none' }}></em>
          </span>
        )
        }
      </div >
    )
  }
  else { return ( '' ) };
}
export function DaysColumn ( props: React.PropsWithChildren<DaysColumPropsType> ) {

  const {
    timesToShow,
    allInvoices,
    summaryBookingSegments,
    locationList,
    selectedLocation,
    weekSelector,
    selectedSegment,
    setSelectedSegment
  } = props;


  const daysOftheWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  /*                                                      Function to Handle the Click on the Cell                                                                               */
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  const handlerClick = ( e: any ) => {
    if ( !e.target.className.includes( 'occupied' ) ) {
      const array = [];
      if ( e.target.childNodes[0] ) {
        array.push( e.target.id )
        props.setSelectedSegment( array );
      }
    }
  }

  const selected = ( clickedCell: string ) => {
    if ( selectedSegment.includes( clickedCell ) ) {
      if ( selectedSegment.length === 1 ) {
        return 'active first active last'
      }
      if ( selectedSegment.indexOf( clickedCell ) === 0 ) {
        return 'active first'
      }
      else if ( selectedSegment.indexOf( clickedCell ) === selectedSegment.length - 1 ) {
        return 'active last'
      }
      else {
        return 'active'
      }
    }
  }
  console.log( `Re Render the Days Column ${new Date()}` );
  return (
    <>
      {weekSelector.daysOfWeek.map( ( day: string, idx: number ) => {
        return (
          <div className="reservation-cal-table-day">
            <div className="reservation-cal-table-day-head">
              <span>
                {daysOftheWeek[idx]}
              </span>
              <br />
              <strong>
                {day}
              </strong>
            </div>
            {timesToShow.map( ( timeToShow: string ) => {
              return (
                <div className={`reservation-cal-table-day-block ${selected( `${weekSelector.isoDaysOfWeek[idx + 1]} ${timeToShow}:00` )}`} id={`${weekSelector.isoDaysOfWeek[idx + 1]} ${timeToShow}:00`} style={{ padding: '0px' }} onClick={( e ) => handlerClick( e )}>
                  {bookedOccupancy( props.summaryBookingSegments, props.weekSelector.filteredBookings, day, weekSelector.daysOfWeek, weekSelector.isoDaysOfWeek, `${timeToShow}:00`, parseInt( selectedLocation.toString() ), locationList, allInvoices, selectedLocation )}
                </div> )
            } )}
          </div> )
      } )}
    </>
  )
}