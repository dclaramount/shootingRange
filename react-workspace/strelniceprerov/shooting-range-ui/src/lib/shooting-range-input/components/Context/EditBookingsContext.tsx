import React, { Context } from 'react';
import CryptoJS from 'crypto-js';
import { EditBookingProviderPropsType, EditBookingsContextType, globalVariablesType, InstructorSegmentType, InvoiceType, ShootingRangeType, SummaryBookingsType, WeekSelectorUpdatedCallBackType } from 'shooting-range-ui/src/lib/shared/types';
import { buildArrayOfBusinessHours } from '../../helper_functions/generalFunctions';
export const EditBookingsContext: Context<EditBookingsContextType> = React.createContext<EditBookingsContextType>( {} as EditBookingsContextType );

export function EditBookingsProvider ( props: EditBookingProviderPropsType ) {
  const sendGridKey = CryptoJS.AES.decrypt( props.GlobalVariables.sendGridEncryptedKey, props.GlobalVariables.decryptionKey ).toString( CryptoJS.enc.Utf8 );
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [allInvoices, setAllInvoices] = React.useState<InvoiceType[]>( props.InputProps.Invoices );
  const [locationList, setLocationList] = React.useState<ShootingRangeType[]>( props.InputProps.ShootingRanges );
  const [instructorSegments, setInstructorSegments] = React.useState<InstructorSegmentType[]>( props.InputProps.InstructorSegments );
  const [selectedLocation, setSelectedLocation] = React.useState<number>( props.GlobalVariables.defaultLocation );
  const [selectedSegment, setSelectedSegment] = React.useState<string[]>( [] );
  const [showUpPopUp, setShowUpPopUp] = React.useState<boolean>( false );
  const [summaryBookingSegments, setSummaryBookingSegments] = React.useState<SummaryBookingsType[]>( props.InputProps.SummaryBookings );
  const [timesToShow, setTimesToShow] = React.useState<string[]>( buildArrayOfBusinessHours( props.GlobalVariables.startBusinessHours, props.GlobalVariables.endBusinessHours ) );
  const [weekSelector, setWeekSelector] = React.useState<WeekSelectorUpdatedCallBackType>( {} as WeekSelectorUpdatedCallBackType );
  const [refreshTab, setRefreshTab] = React.useState<Date>( new Date() );
  const [globalVariables, setGlobalVariables] = React.useState<globalVariablesType>( props.GlobalVariables );
  const [sendGridKeyAPI, setSendGridKeyAPI] = React.useState<string>( sendGridKey );

  return (
    <EditBookingsContext.Provider value={{
      allInvoices, setAllInvoices,
      instructorSegments, setInstructorSegments,
      globalVariables, setGlobalVariables,
      locationList, setLocationList,
      selectedLocation, setSelectedLocation,
      selectedSegment, setSelectedSegment,
      sendGridKeyAPI, setSendGridKeyAPI,
      timesToShow, setTimesToShow,
      refreshTab, setRefreshTab,
      showUpPopUp, setShowUpPopUp,
      summaryBookingSegments, setSummaryBookingSegments,
      weekSelector, setWeekSelector
    }}>
      {props.children}
    </EditBookingsContext.Provider>
  )
}