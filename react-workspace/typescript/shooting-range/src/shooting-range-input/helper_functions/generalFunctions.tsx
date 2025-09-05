import { endOfWeek, startOfWeek } from "date-fns";
import { HonestWeekType } from "../../Shared/types";

export function getFirstAndLastDayOfThisWeek (): HonestWeekType {
  return ( {
    firstDay: startOfWeek( new Date(), { weekStartsOn: 1 } ),
    lastDay: endOfWeek( new Date(), { weekStartsOn: 1 } )
  } );
}
export function buildArrayOfBusinessHours ( startHour: number | string, endHour: number | string ): string[] {
  const arrayToReturn: string[] = [] as string[];
  let countStartHour = parseInt( startHour.toString() );
  while ( countStartHour < parseInt( endHour.toString() ) ) {
    if ( countStartHour < 10 ) {
      arrayToReturn.push( `0${countStartHour}` );
    }
    else {
      arrayToReturn.push( `${countStartHour}` );
    }
    countStartHour = countStartHour + 1;
  }
  return arrayToReturn;
}