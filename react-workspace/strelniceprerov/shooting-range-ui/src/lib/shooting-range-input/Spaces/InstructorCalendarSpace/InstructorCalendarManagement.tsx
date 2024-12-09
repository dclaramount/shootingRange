import React from 'react';
import { generateDayPilotCalendarEvents } from '../../helper_functions/SegmentBlockerCalendar';
import { DayPilotEvent, WeekPickerType } from '../../types/blocking-segment.types';
import { PostPopUp } from '../../shared/PostPopUp';
import { ManagementDashboardContext } from '../../components/Context/ManagementDashboardContext';
import { InstructorCalendarContext } from '../../components/Context/InstructorCalendarContext';
import { Translations } from '../../types/translations';
import { CopyWeekInstructorsPopUp } from '../../shared/CopyWeekInstructors';
import Popup from 'reactjs-popup';
import { HonestWeekPicker } from '../../components/HonnestWeekPicker';

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
    marginLeft: 'auto'
   })
};

export const InstructorCalendarManagement = () => {
  const [showPopUp,    setShowPopUp]                                          =   React.useState(false);
  const [postParameters, setPostParameters]                                   =   React.useState("");
  const [endpoint, setEndPoint]                                               =   React.useState("");
  const [refresh, setRefresh]                                                 =   React.useState(false);
  const [events, setEvents]                                                   =   React.useState<DayPilotEvent[]>();
  const {globalVariabes:gVariables, instructorsList, instructorSegmentsList}  =   React.useContext(InstructorCalendarContext);
  const {refreshManagementDashboard, setRefreshManagementDashboard}           =   React.useContext(ManagementDashboardContext);
  const calendarRef                                                           =   React.useRef<any>()
  const showCopyWeekPopUp                           =   React.useRef<any>();
  const refCheckBoxCopy                             =   React.useRef<any>();
  const refPickCalendar                             =   React.useRef<any>();
  const refCopyButton                               =   React.useRef<any>();
  const refToCopyWeekUp        =   React.useRef<WeekPickerType>();
  const currentWeek                                 =   React.useRef<any>();
  /*-------------------------------------------------------------------------------------------------*/
  /*                              Handler: CLOSE OF MODAL                                            */
  /*-------------------------------------------------------------------------------------------------*/
  const closeModal                                  =   (e : any) => {showCopyWeekPopUp.current?.close()}
  React.useEffect(() => {
    let events : DayPilotEvent[] = generateDayPilotCalendarEvents(instructorSegmentsList);
    const startDate = `${new Date().toISOString()}`;
    calendarRef.current.control.update({startDate, events});
    setEvents(events);
    setRefresh(true);
  }, [refresh]);
  /*-------------------------------------------------------------------------------------------------*/
  /*              Handler: OF THE CHANGE FUNCTION OF THE COPY WEEK SELECTOR                          */
  /*-------------------------------------------------------------------------------------------------*/
  const onChangeCopyWeekSelector = (week : any) => {
    refToCopyWeekUp.current=week;
    console.log(week);
    currentWeek.current.firstDay = week.firstDay;
    currentWeek.current.lastDay = week.lastDay;
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
  const closeModalPopUp                                                       =   () => {setRefreshManagementDashboard(refreshManagementDashboard+1);setShowPopUp(false);}
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
      //Step 2. The form for creating a new instructor segment is shown (and has to be properly configured.).
      const form = [
        {name: Translations.InstructorSegmentManagementCalendar.CreateSegmentPopUp.Title, type: "title" },
        { 
          name:             Translations.InstructorSegmentManagementCalendar.CreateSegmentPopUp.SubTitle_SelectInstructor,  
          id:               "instructor",
          options:          instructorsList,
          type:             "select"
        },
        { name:             Translations.InstructorSegmentManagementCalendar.CreateSegmentPopUp.SubTitle_Date, 
          id:               "date",
          dateFormat:       "d.M.yyyy",
          type:             "date",
          locale:           'cs-cz'
        },
        { name:             Translations.InstructorSegmentManagementCalendar.CreateSegmentPopUp.SubTitle_SelectStartSegment, 
          id:               "start",
          //dateFormat:       "d.M.yyyy",
          timeFormat:       "H:mm",
          timeInterval:     60,
          type:             "time",
          locale:           'cs-cz'
        },
        { 
          name:             Translations.InstructorSegmentManagementCalendar.CreateSegmentPopUp.SubTitle_SelectEndSegment,  
          id:               "end",
          //dateFormat:       "d.M.yyyy",
          timeFormat:       "H:mm",
          timeInterval:     60,
          type:             "time",
          locale:           'cs-cz'
      },
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
      const piecesStart = tStart.toLocaleTimeString('cz-CZ',{hour12:false}).split(' ')[0].split(':');
      const timeStart = `${piecesStart[0]}:${piecesStart[1]}`;
      const piecesEnd = tEnd.toLocaleTimeString('cz-CZ',{hour12:false}).split(' ')[0].split(':');
      const timeEnd = `${piecesEnd[0]}:${piecesEnd[1]}`;
      const data = { 
        daySelected :   args.start,
        start :         timeStart,
        end   :         timeEnd,
        date  :         tStart
      };
      const modal = await dns.DayPilot.Modal.form(form, data, {okText: Translations.InstructorSegmentManagementCalendar.CreateSegmentPopUp.Create_Button, cancelText:Translations.InstructorSegmentManagementCalendar.CreateSegmentPopUp.Cancel_Button});
      dp.clearSelection();
      //Step 4. The modal gets closed for 1 out 2 reasons (either it was cancelled or submitted)
      if (!modal.result) { 
        //Step 4.1 If Modal is Cancelled then the placeholder event is deleted too....
        dp.events.remove(args.source);
        return; 
      }
      else{
        //Step 4.2 If Modal is submitted then the POST request will be send tot he Post End Point.
        const guid              =   uniqueGUI;
        const instructorId      =   modal.result.instructor;
        //const startSegmentAPI   =   modal.result.start;
        //const endSegmentAPI     =   modal.result.end;
        const date              =   modal.result.date.split('T');
        const startSegmentAPI   =   `${date[0]}T${modal.result.start}:00`
        const endSegmentAPI     =   `${date[0]}T${modal.result.end}:00`
        setEndPoint("postCreateInstructorSegment") 
        setPostParameters(`start=${startSegmentAPI}&end=${endSegmentAPI}&guid=${guid}&instructorId=${instructorId}`);
        setShowPopUp(true);
      }
    },
    onEventClick: async (args:any) => {
      //await clickEventCalendar(args.e);
    },
    contextMenu: new dns.DayPilot.Menu({
      items: [
        {
          text: Translations.InstructorSegmentManagementCalendar.SubMenuSegment.Edit,
          onClick: async (args:any) => {
            const segment         = instructorSegmentsList.find((seg:any) => seg.uuid===args.source.data.uuid);
            const _guid           = segment.uuid;
            const _guid1          = dns.DayPilot.guid();
            const _guid2          = dns.DayPilot.guid();
            const _instructorId   = segment.instructorId;
            //Form for editing 
            //Step 2. The form for creating a new blocking segment is shown (and has to be properly configured.).
            const editform = [
              { name:   `${Translations.InstructorSegmentManagementCalendar.EditSegmentPopUp.Title}`,  type: "title" },
              { name:   `${Translations.InstructorSegmentManagementCalendar.EditSegmentPopUp.Start_of_the_blocking_segment}`, id: "start",  dateFormat: "d.M.yyyy", timeFormat: "H:mm", timeInterval: 60, type: "datetime"},
              { name:   `${Translations.InstructorSegmentManagementCalendar.EditSegmentPopUp.End_of_the_blocking_segment}`,   id: "end",    dateFormat: "d.M.yyyy", timeFormat: "H:mm", timeInterval: 60, type: "datetime"},            
              ];
            const dp = calendarRef.current.control;
            const data = {
              start :         args.source.data.start.value,
              end   :         args.source.data.end.value
            };
            const modal = await dns.DayPilot.Modal.form(editform, data, {okText: `${Translations.InstructorSegmentManagementCalendar.EditSegmentPopUp.Modify_Button}`, cancelText:`${Translations.InstructorSegmentManagementCalendar.EditSegmentPopUp.Cancel_Button}`});
            if (!modal.result) { 
              //IF MODAL IS CANCELLED NOTHING HAPPENS
              return; 
            }
            else{
                const startSegmentAPI       =   modal.result.start.value;
                const endSegmentAPI         =   modal.result.end.value;
                setEndPoint("postEditInstructorSegment") 
                setPostParameters(`guid=${_guid}&start=${startSegmentAPI}&end=${endSegmentAPI}&instructor=${_instructorId}&originalStart=${args.source.data.start.value}&originalEnd=${args.source.data.end.value}&guid1=${_guid1}&guid2=${_guid2}`);
                setShowPopUp(true);
            }
              dp.events.remove(args.source);
          },
          },
          {
            text: "-"
          },
          {
            text: Translations.InstructorSegmentManagementCalendar.SubMenuSegment.Delete,
            onClick: async (args:any) => {
              const dp = calendarRef.current.control;
              const modal = await dns.DayPilot.Modal.confirm(`${Translations.InstructorSegmentManagementCalendar.DeleteSegmentPopUp.Disclaimer}`, {okText: `${Translations.InstructorSegmentManagementCalendar.DeleteSegmentPopUp.Delete_Button}`, cancelText:`${Translations.InstructorSegmentManagementCalendar.DeleteSegmentPopUp.Cancel_Button}`});
              if (!modal.result) { 
                //IF MODAL IS CANCELLED NOTHING HAPPENS
                return; 
              }
              else{
                const startSegmentAPI =   args.source.data.start.value;
                const endSegmentAPI   =   args.source.data.end.value;        
                setEndPoint("postDeleteInstructorSegment") 
                setPostParameters(`guid=${args.source.data.uuid}&start=${startSegmentAPI}&end=${endSegmentAPI}`);
                setShowPopUp(true);
                dp.events.remove(args.source);
              }
            },
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

  React.useEffect(() => {
    const events : DayPilotEvent[] = generateDayPilotCalendarEvents(instructorSegmentsList);
    const startDate = `${new Date().toISOString()}`;
    calendarRef.current.control.update({startDate, events});
    setRefresh(true);
  }, [refresh]);
  return (
    <div>
      <div style={{display:'flex'}}>
        <input ref={refCheckBoxCopy} style={{margin:'auto 0 auto 0'}} id={'checkbox_copy_week'} name="checkbox_copy_week"  type="checkbox" onClick={(e) => {refPickCalendar.current.hidden=!refPickCalendar.current.hidden;refCopyButton.current.hidden=!refCopyButton.current.hidden;}} />
        <label style={{verticalAlign:'middle', margin:'auto 0 auto 10px'}} htmlFor="checkbox_copy_week">{Translations.CopyBlockSegments.LabelCopyWeek}</label>
        <div ref={refPickCalendar} style={{margin:'0 0 0 auto'}} hidden={true}>{Translations.CopyBlockSegments.ToWeek}<HonestWeekPicker onChange={onChangeCopyWeekSelector}/> </div>
        <input ref={refCopyButton} hidden={true} type="button" name="copyWeekPopUp" className="btn btn-secondary" value="Copy Week" style={styles.copyButton()} onClick={(e)=>{showCopyWeekPopUp.current?.open()}}/>
      </div>
    <Legend props={instructorsList}/>
    <div style={styles.wrap}>
      <div style={styles.left}>
        <dns.DayPilotNavigator
          locale='cs-cz'
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
      <input hidden ref={currentWeek} />
      {/*Vámi vybraný čas k vyblokování není možné zrušit z důvodu existujících rezervací. Prosím o kontrolu.*/}
      {showPopUp && postParameters!=='' && <PostPopUp postAPI={endpoint} postParameters={postParameters} closeModal={closeModalPopUp}/>}
      <Popup ref={showCopyWeekPopUp} onClose={(e)=>closeModal(e)} closeOnDocumentClick={false} >
          <CopyWeekInstructorsPopUp  toWeek={currentWeek.current} popUpRef={showCopyWeekPopUp} closeModal={closeModal} listOfAllEvents={events} startDateOfSelectedWeek={calendarRef.current}/>
      </Popup>
    </div>
    </div>
  );
};