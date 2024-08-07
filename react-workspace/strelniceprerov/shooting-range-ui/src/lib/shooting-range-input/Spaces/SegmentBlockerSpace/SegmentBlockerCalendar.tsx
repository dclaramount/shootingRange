import React from 'react';
import { SegmentBlockerContext } from '../../components/Context/SegmentBlockerContext';
import { DayPilotEvent, WeekPickerType } from '../../types/blocking-segment.types';
import { generateDayPilotCalendarEvents } from '../../helper_functions/SegmentBlockerCalendar';
import { PostPopUp } from '../../shared/PostPopUp';
import { ManagementDashboardContext } from '../../components/Context/ManagementDashboardContext';
import { Translations } from '../../types/translations';
import Popup from 'reactjs-popup';
import { CopyWeekPopUp } from '../../shared/CopyWeekPopUp';
import {endOfWeek, startOfWeek } from "date-fns";
import { HonestWeekPicker } from '../../BookingManagement/Dashboard/Components/WeekSelector/WeekPicker';
const dns = require ("@daypilot/daypilot-lite-react");

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  },
  copyButton: ()  => ({
    marginTop:'auto',
    marginBottom:'auto',
  })
};
/*-------------------------------------------------------------------------------------------------*/
/*                                    VALIDATE TEXT FIELD                                          */
/*-------------------------------------------------------------------------------------------------*/
function validateTextRequired(args : any) {
  const value = args.value || "";
  if (value.trim().length === 0) {
    args.valid = false;
    args.message = "Text required";
  }
  else if (value.length > 7) {
    args.valid = false;
    args.message = "Text should not exceed 7 characters.";
  }
}
export const SegmentBlockerCalendar = () => {
  const [showPopUp,    setShowPopUp]                                =   React.useState(false);
  const [copyWeek,     setCopyWeek]                                 =   React.useState(false);
  const [postParameters, setPostParameters]                         =   React.useState("");
  const [endpoint, setEndPoint]                                     =   React.useState("");
  const [refresh, setRefresh]                                       =   React.useState(false);
  const {globalVariabes:gVariables,blockegSegmentsList,locationList}=   React.useContext(SegmentBlockerContext);
  const {refreshManagementDashboard, setRefreshManagementDashboard} =   React.useContext(ManagementDashboardContext);
  const calendarRef                                                 =   React.useRef<any>()
  const closeModalPopUp                                             =   () => {setRefreshManagementDashboard(refreshManagementDashboard+1);setShowPopUp(false);}
  const Legend = ({props} : any) => {
    return(
          <div style={{display:'flex', flexDirection:'row', width:'auto',justifyContent:'space-around'}}>
            {props.map((prop : any) => {
              const color = prop.color;
              const name = prop.name;
              return(
                <div style={{display:'flex', flexDirection:'row', margin:'10px'}}>
                    <em style={{display: 'inline-block', width:'20px', height:'20px', border:`1px solid ${color}`, background:`${color}`, color:`${color}`, borderRadius:'50%', margin:'0 5px 0 0'}}>.</em>
                      <div>{name}</div>
                </div>)
            })}
          </div>);
  }
  /*-------------------------------------------------------------------------------------------------*/
  /*                    HANDLES THE CLICK ON THE CALENDAR OBJECT                                     */
  /*-------------------------------------------------------------------------------------------------*/
  const clickEventCalendar = async (e:any) => {
    const dp                                                        =   calendarRef.current.control;
    const modal                                                     =   await dns.DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text                                                     =   modal.result;
    dp.events.update(e);
  };
  /*-------------------------------------------------------------------------------------------------*/
  /*                          CONFIGURATION OF THE CALENDAR                                          */
  /*-------------------------------------------------------------------------------------------------*/
  const style                                                       =   document.createElement('style');
  style.innerHTML                                                   =   '.calendar_default_colheader_inner {background-color: black; font-size: small; color:white;font-weight:bold;text-wrap:wrap;}' 
                                                                        + '.calendar_default_rowheader_inner{background-color: black; font-size: large; color:white;font-weight:bold;text-wrap:wrap;}'
                                                                        + '.calendar_default_corner_inner{background-color: black; font-size: large; color:white;font-weight:bold;text-wrap:wrap;}';
  document.getElementsByTagName('head')[0].appendChild(style);
  const [calendarConfig, setCalendarConfig]                         = React.useState({
    /*Parsing the business hours from the global variables table*/
    businessBeginsHour:                                             parseInt(gVariables.startBusinessHours),
    businessEndsHour:                                               parseInt(gVariables.endBusinessHours),
    /*Parsing the day hours from the global variables table*/
    dayBeginsHour:                                                  parseInt(gVariables.startDayHours),
    dayEndsHour:                                                    parseInt(gVariables.endDayHours),
    /*Other parameters for the calendar for the blocking of the segments*/
    viewType:                                                      "Week",
    /*scrollToHour:                                                   8,*/
    cellDuration:                                                   60,
    timeHeaderCellDuration :                                        60,
    durationBarVisible:                                             true,
    timeRangeSelectedHandling:                                      "Enabled",
    locale:                                                         'cs-cz',
    //Step 0.1. The Table Headers personalization
    onBeforeHeaderRender: (args : any) => {
      const headerCell                                              =   new Date(Date.parse(args.column.start)).toLocaleDateString('cs-CZ', {weekday:'short', month:'2-digit', day:'2-digit'});
      args.header.html                                              =   headerCell
    },
    //Step 1. Upon clicking there should be a placeholder created for the segment being created
    onTimeRangeSelected: async (args : any) => {
      const dp                                                      =   calendarRef.current.control;
      const uniqueGUI                                               =   dns.DayPilot.guid(); //Unique GUID to register the segment in the DB.
      dp.events.add({
        start:          args.start,
        end:            args.end,
        id:             uniqueGUI,
        text:           `Placeholder`,
        backColor:      `red`
      });
    //Step 2. The form for creating a new blocking segment is shown (and has to be properly configured.).
      const form = [
        { name:   `${Translations.BlockingSegment.CreateSegmentPopUp.Title}`,  type: "title" },
        { 
          name:             `${Translations.BlockingSegment.CreateSegmentPopUp.SubTitle_SelectLocation}`,  
          id:               "location",
          options:          locationList,
          type:             "select"
        },
        { name:   `${Translations.BlockingSegment.CreateSegmentPopUp.SubTitle_NameOfSegment}`,        id: "text"    ,onValidate: validateTextRequired},
        { name:   `${Translations.BlockingSegment.CreateSegmentPopUp.SubTitle_TypeOfEvent}`,          id: "All_Day",    type: "radio",  options: [
          { name: `${Translations.BlockingSegment.CreateSegmentPopUp.SubTitle_AllDay}`,               id: "allDayEvent", 
            children: [
              { name: `${Translations.BlockingSegment.CreateSegmentPopUp.Date}`,                      id: "daySelected",  type: "date", dateFormat: "d.M.yyyy", locale:'cs-cz'}
            ]},
          {name:`${Translations.BlockingSegment.CreateSegmentPopUp.SubTitle_NotAllDay}`,              id: "Hourly", children: [
            { name:`${Translations.BlockingSegment.CreateSegmentPopUp.SubTitle_SelectStartSegment}`,  id: "start",  dateFormat: "d.M.yyyy", timeFormat: "H:mm", timeInterval: 60, type: "datetime", locale:'cs-cz'},
            { name:`${Translations.BlockingSegment.CreateSegmentPopUp.SubTitle_SelectEndSegment}`,    id: "end",    dateFormat: "d.M.yyyy", timeFormat: "H:mm", timeInterval: 60, type: "datetime", locale:'cs-cz'},            
          ]}
        ]}
      ];
      //Step 3. This data will be auto-populating the modal (for creating a new segment). 
      const tStart             = new Date(Date.parse(args.start));
      const tEnd               = new Date(Date.parse(args.end));
      const timeZoneOffset     =   tStart.getTimezoneOffset()/60;
      const timeZoneOffsetEnd  =   tEnd.getTimezoneOffset()/60;
      tStart.setHours(tStart.getHours() - timeZoneOffset);
      tEnd.setHours(tEnd.getHours() - timeZoneOffsetEnd);
      if(tStart.getMinutes() !== 0) { tStart.setMinutes(0); }
      if(tEnd.getMinutes() !== 0) { tEnd.setMinutes(0); tEnd.setHours(tEnd.getHours()+1)}
      const data = { 
        daySelected :   args.start.value,
        start :         tStart,
        end   :         tEnd
      };
      const modal = await dns.DayPilot.Modal.form(form, data, {okText: `${Translations.BlockingSegment.CreateSegmentPopUp.Create_Button}`, cancelText:`${Translations.BlockingSegment.CreateSegmentPopUp.Cancel_Button}`});
      dp.clearSelection();
      //Step 4. The modal gets closed for 1 out 2 reasons (either it was cancelled or submitted)
      if (!modal.result) { 
        //Step 4.1 If Modal is Cancelled then the placeholder event is deleted too....
        dp.events.remove(args.source);
        return; 
      }
      else{
        //Step 4.2 If Modal is submitted then the POST request will be send tot he Post End Point.
        let startSegmentAPI;
        let endSegmentAPI;
        let startSegment;
        let endSegment;
        const guid              =   uniqueGUI;
        const name              =   modal.result.text;
        const locationId        =   modal.result.location;
        if(modal.result.All_Day==="allDayEvent"){
          //Manipulation of Date selected to account for the Offset of TimeZone
          const today           =   new Date(Date.parse(modal.result.daySelected.split('T')[0]));
          const timeZoneOffset  =   (today.getTimezoneOffset() * -1)/60;
          startSegment          =   new Date(Date.parse(modal.result.daySelected.split('T')[0]));
          endSegment            =   new Date(Date.parse(modal.result.daySelected.split('T')[0]));
          startSegment.setHours(parseInt(gVariables.startBusinessHours) + timeZoneOffset);
          endSegment.setHours(parseInt(gVariables.endBusinessHours) + timeZoneOffset);
          startSegmentAPI       = startSegment.toISOString();
          endSegmentAPI         = endSegment.toISOString();
        }
        else{
          startSegment          =   modal.result.start;
          endSegment            =   modal.result.end;
          startSegmentAPI       =   modal.result.start.value;
          endSegmentAPI         =   modal.result.end.value;
        }
        setEndPoint("postCreateBlockingSegment") 
        setPostParameters(`start=${startSegmentAPI}&end=${endSegmentAPI}&guid=${guid}&name=${name}&locationId=${locationId}`);
        setShowPopUp(true);
      }
    },
    onEventClick: async (args:any) => {
      //await clickEventCalendar(args.e);
    },
    contextMenu: new dns.DayPilot.Menu({
      items: [
        {
          text: `${Translations.BlockingSegment.SubMenuSegment.Delete}`,
          onClick: async (args:any) => {
            const dp = calendarRef.current.control;
            const modal = await dns.DayPilot.Modal.confirm(`${Translations.BlockingSegment.DeleteSegmentPopUp.Disclaimer}`, {okText: `${Translations.BlockingSegment.DeleteSegmentPopUp.Delete_Button}`, cancelText:`${Translations.BlockingSegment.DeleteSegmentPopUp.Cancel_Button}`});
            if (!modal.result) { 
              //IF MODAL IS CANCELLED NOTHING HAPPENS
              return; 
            }
            else{
              setEndPoint("postDeleteBlockingSegment") 
              setPostParameters(`guid=${args.source.data.uuid}`);
              setShowPopUp(true);
              dp.events.remove(args.source);
            }
          },
        },
        {
          text: "-"
        }
      ]
    }),
    onBeforeEventRender: (args:any) => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async (args : any) => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          }
        }
      ];


      const participants = args.data.participants;
      if (participants > 0) {
        // show one icon for each participant
        for (let i = 0; i < participants; i++) {
          args.data.areas.push({
            bottom: 5,
            right: 5 + i * 30,
            width: 24,
            height: 24,
            action: "None",
            image: `https://picsum.photos/24/24?random=${i}`,
            style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
          });
        }
      }
    }
  });
  const showCopyWeekPopUp                           =   React.useRef<any>();
  const refPickCalendar                             =   React.useRef<any>();
  const refCheckBoxCopy                             =   React.useRef<any>();
  const refCopyButton                               =   React.useRef<any>();
  const refToCopyWeekUp                             =   React.useRef<WeekPickerType>();
  const dummyRef                                    =   React.useRef<any>();
  const [events, setEvents]                         =   React.useState<DayPilotEvent[]>();
  const [selectedWeek, setSelectedWeek]             =   React.useState({firstDay: startOfWeek(new Date(), { weekStartsOn: 1 }),lastDay: endOfWeek(new Date(), { weekStartsOn: 1 })});
  const closeModal                                  =   (e : any) => {showCopyWeekPopUp.current?.close();setRefreshManagementDashboard(refreshManagementDashboard+1);}
  React.useEffect(() => {
    const events : DayPilotEvent[] = generateDayPilotCalendarEvents(blockegSegmentsList);
    const startDate = `${new Date().toISOString()}`;
    calendarRef.current.control.update({startDate, events});
    setEvents(events);
    setRefresh(true);
  }, [refresh]);
  const onChange = (week : any) => {
    refToCopyWeekUp.current=week;
    dummyRef.current.firstDay = week.firstDay;
    dummyRef.current.lastDay = week.lastDay;
    const arrayDaysOfWeek = []
    const isoDaysOfWeek = []
    for (let i=0; i<=7; i++){
      const dt = new Date(week.firstDay);
      dt.setDate(dt.getDate() + i);
      isoDaysOfWeek.push(dt.toISOString().split('T')[0]);
      if(i<7){
        arrayDaysOfWeek.push(`${dt.getDate()}.${dt.getMonth() + 1}`);
      }
    }
  };
  return (
    <div>
      <div style={{display:'flex'}}>
      <input ref={refCheckBoxCopy} style={{margin:'auto 0 auto 0'}} id={'checkbox_copy_week'} name="checkbox_copy_week"  type="checkbox" onClick={(e) => {refPickCalendar.current.hidden=!refPickCalendar.current.hidden;refCopyButton.current.hidden=!refCopyButton.current.hidden;}} />
          <label style={{verticalAlign:'middle', margin:'auto 0 auto 10px'}} htmlFor="checkbox_copy_week">{Translations.CopyBlockSegments.LabelCopyWeek}</label>
          <div ref={refPickCalendar} style={{margin:'0 auto 0 auto'}} hidden={true}>{Translations.CopyBlockSegments.ToWeek}<HonestWeekPicker onChange={onChange}/> </div>
          <input ref={refCopyButton} hidden={true} type="button" name="copyWeekPopUp" className="btn btn-secondary" value="Copy Week" style={styles.copyButton()} onClick={(e)=>{showCopyWeekPopUp.current?.open()}}/>
      </div>
    <Legend props={locationList}/>
    <div style={styles.wrap}>
      <div style={styles.left}>
        <dns.DayPilotNavigator
          locale= "cs-cz"
          selectMode={"Week"}
          showMonths={2}
          skipMonths={2}
          startDate={`${new Date().toISOString()}`}
          selectionDay={`${new Date().toISOString()}`}
          onTimeRangeSelected={ (args : any) => {
            calendarRef.current.control.update({
              startDate: args.day
            });
          }}
        />
      </div>
      <div style={styles.main}>
        <dns.DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
        />
      </div>
      <input hidden ref={dummyRef} />
      {/*Vámi vybraný čas k vyblokování není možné zrušit z důvodu existujících rezervací. Prosím o kontrolu.*/}
      {showPopUp && postParameters!=='' && <PostPopUp postAPI={endpoint} postParameters={postParameters} closeModal={closeModalPopUp}/>}
      <Popup ref={showCopyWeekPopUp} onClose={(e)=>closeModal(e)} closeOnDocumentClick={false} >
        <CopyWeekPopUp  toWeek={dummyRef.current} popUpRef={showCopyWeekPopUp} closeModal={closeModal} listOfAllEvents={events} startDateOfSelectedWeek={calendarRef.current}/>
      </Popup>
    </div>
    </div>
  );
};