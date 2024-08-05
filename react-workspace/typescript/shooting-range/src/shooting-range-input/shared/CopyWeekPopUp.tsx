import React from "react";
import { Translations } from "../types/translations";
import { BlockSegmentToCreate, DayPilotEvent } from "../types/blocking-segment.types";
import { HonestWeekPicker } from "../BookingManagement/Dashboard/Components/WeekSelector/WeekPicker";
import {endOfWeek, startOfWeek } from "date-fns";
import { Button } from '@mui/material';
import { SegmentBlockerContext } from "../Context/SegmentBlockerContext";
import { ManagementDashboardContext } from "../Context/ManagementDashboardContext";
import { useGetEndPoint } from "../ApiCalls/useGetEndPoint";
import { REQUEST_STATUS } from "../ApiCalls/enums";

export const CopyWeekPopUp = ({listOfAllEvents, startDateOfSelectedWeek, closeModal} : any) => {
  const [selectedWeek, setSelectedWeek]                                   =   React.useState({firstDay: startOfWeek(new Date(), { weekStartsOn: 1 }),lastDay: endOfWeek(new Date(), { weekStartsOn: 1 })});
  const {blockingSegmentsToCopy, setBlockingSegmentsToCopy}               =   React.useContext(SegmentBlockerContext);
  const [copyButtonClick, setCopyButtonClicked]                           =   React.useState(false);
  listOfAllEvents.sort((a : any, b : any) => new Date(a.start).getTime()  - new Date(b.start).getTime());

  let startDate : Date                                                    =   new Date();
  let endDate   : Date                                                    =   new Date();
  let weekNumber : number                                                 =   0;
  let oneJanSelectedDate : Date;
  let numberOfDays  : number;

  let startDateTo : Date                                                  =   new Date();
  let toWeekNumber: number                                                =   0;
  let oneJanSelectedDateTo : Date;
  let numberOfDaysTo  : number;

  if(startDateOfSelectedWeek){
    //let startDateOfWeek = new Date(startDateOfSelectedWeek.value).setHours(0,0,0,0);
    startDate   = new Date(startDateOfSelectedWeek.control.ta[0].start);
    oneJanSelectedDate = new Date(startDate.getFullYear(),0,1);
    numberOfDays =  Math.floor((startDate.getTime() - oneJanSelectedDate.getTime()) / (24 * 60 * 60 * 1000));   
    weekNumber =  Math.ceil(( startDate.getDay() + 1 + numberOfDays) / 7); 
    endDate     = new Date(startDateOfSelectedWeek.control.ta[6].start);
  }
  const [selectedSegments, setSelectedSegments]   =   React.useState(listOfAllEvents.filter((loa:any) => (new Date(loa.start) >= startDate) && (new Date(loa.end) <= endDate)).map((a : any)=> a.uuid));
  const TimeSegmentString = (start : any , end : any) => {
    const baseString = new Date(start).toLocaleString('cs-CZ', { timeZone: 'CET', hour12:false});
    const endString = new Date(end).toLocaleString('cs-CZ', { timeZone: 'CET', hour12:false}).split(' ')[3];
    return `${baseString} -> ${endString}`;
  }
  const NameOfSegment = (props : DayPilotEvent) => {
    const color = props.backColor;
    const name  = props.text;
    return(
          <div style={{display:'flex', flexDirection:'row', margin:'10px'}}>
              <em style={{display: 'inline-block', width:'20px', height:'20px', border:`1px solid ${color}`, background:`${color}`, color:`${color}`, borderRadius:'50%', margin:'0 5px 0 0'}}>.</em>
                <div>{name}</div>
          </div>)
  }

  const onCopyClick = () => {
    const  filteredSegmentsToCopy = listOfAllEvents.filter((loa: any) => selectedSegments.includes(loa.uuid));
    const  listOfSegmentsToCopy : BlockSegmentToCreate[] = [];
    filteredSegmentsToCopy.forEach((fstc : any) => {
      const segmentToCopy : BlockSegmentToCreate = {
        start:        fstc.start.value,
        end :         fstc.end.value,
        uuid:         fstc.uuid,
        name:         fstc.text,
        locationId:   parseInt(fstc.locationId),
        url:          `start=${fstc.start.value}&end=${fstc.end.value}&guid=${fstc.uuid}&name=${fstc.text}&locationId=${parseInt(fstc.locationId)}`
      }
      listOfSegmentsToCopy.push(segmentToCopy);
    });
    setBlockingSegmentsToCopy(listOfSegmentsToCopy);
    setCopyButtonClicked(true);
  }
  startDateTo         = new Date(selectedWeek.firstDay);
  oneJanSelectedDateTo = new Date(startDateTo.getFullYear(),0,1);
  numberOfDaysTo =  Math.floor((startDate.getTime() - oneJanSelectedDateTo.getTime()) / (24 * 60 * 60 * 1000));   
  toWeekNumber =  Math.ceil(( startDate.getDay() + 1 + numberOfDaysTo) / 7);

  const onChange = (week : any) => {
    setSelectedWeek(week);
    startDateTo         = new Date(week.firstDay);
    oneJanSelectedDate = new Date(startDate.getFullYear(),0,1);
    numberOfDays =  Math.floor((startDate.getTime() - oneJanSelectedDate.getTime()) / (24 * 60 * 60 * 1000));   
    weekNumber =  Math.ceil(( startDate.getDay() + 1 + numberOfDays) / 7); 
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
  const updateSelectedList = (e : any) =>{
    if(selectedSegments.includes(e.target.id)){
      setSelectedSegments(selectedSegments.filter((ss:any)=> ss!== e.target.id))
    }else{
      setSelectedSegments((selectedSegments : string[]) => [...selectedSegments, e.target.id])
    }
  }
  const getEquivalent = (start : any, end : any) =>{
    const dayOfWeek = new Date(start.value);
    const dayOfWeekEnd = new Date(end.value);
    let actualDayOfWeek = 0;
    switch(dayOfWeek.getDay()){
      case 0:
        actualDayOfWeek = 7;
        break;
      default:
        actualDayOfWeek = dayOfWeek.getDay();
        break;
    }
    const iterationDay = new Date(selectedWeek.firstDay)
    iterationDay.setDate(iterationDay.getDate() + actualDayOfWeek - 1);
    iterationDay.setHours(dayOfWeek.getHours(),0,0,0)
    return `${iterationDay.toLocaleString('cs-CZ', { timeZone: 'CET', hour12:false})} -> ${dayOfWeekEnd.getHours()}:00:00`;
  }
  // Post Creationg of Blocking Segments
  const PostBlockingCreation = (uuid : any) => {
    const segment = blockingSegmentsToCopy.filter((bstc : any) => bstc.uuid===uuid);
    let     postDone                          =   false;
    const   {globalVariabes}                  =   React.useContext(ManagementDashboardContext);
    const   postCreationOfSegment             =   useGetEndPoint(globalVariabes.apiRootURL, 'Dummy.php', segment.url);
    postDone                                  =   postCreationOfSegment.requestStatus  === REQUEST_STATUS.SUCCESS   
    return(<>{postDone ? (postCreationOfSegment.status === 200 ? <div><i className="fa fa-check" aria-hidden="true"></i></div> : <div><i className="fa fa-times-circle" aria-hidden="true" style={{color:'red'}}></i></div>) : <div className="loading" style={{fontSize:'15px'}}>...</div>}</>)
  }
  return( <>
        <div style={style.wrapperPopUp()}>
            <div className="close" style={style.closeButton()} onClick={closeModal}>
              <i className="fa fa-times"></i>
            </div>
            <h2 style={style.title()}>{Translations.CopyBlockSegments.Title.toUpperCase()}</h2>
            <div style={style.wrapperTable()}>
              <table border={1}> 
                <tr> 
                  <th style={style.mainHeaderFrom()} colSpan={4}>
                    <div>
                    {`${Translations.CopyBlockSegments.MainFromHeader.toUpperCase()} ${weekNumber}`}
                    </div>
                    <div>
                      {`${startDate.toLocaleDateString('cs-CZ', { timeZone: 'CET', hour12:false})} -> ${endDate.toLocaleDateString('cs-CZ', { timeZone: 'CET', hour12:false})}`}
                    </div>
                  </th> 
                  <th  style={style.mainHeaderFrom()} colSpan={2}>
                    <div>
                      {`${Translations.CopyBlockSegments.MainToHeader.toUpperCase()} ${toWeekNumber}`}
                    </div>
                    <div style={style.wrapperWeekPicker()}>
                      <HonestWeekPicker onChange={onChange}/>
                    </div>
                  </th> 
                  <th  style={style.mainHeaderFrom()} colSpan={1}/>
                </tr> 
                <tr> 
                  {Translations.CopyBlockSegments.Headers.map((hf:any) => {return(<th style={style.header()}>{hf.toUpperCase()}</th> )})}
                </tr> 
                {listOfAllEvents.filter((loa:any) => (new Date(loa.start) >= startDate) && (new Date(loa.end) <= endDate)).map((event:DayPilotEvent) => {
                  return(
                  <tr id={event.uuid} style={style.normalrow()}>
                    <th style={style.checkBoxCell()}><input id={event.uuid} type="checkbox" name="select" checked={selectedSegments.includes(event.uuid)} onClick={(e) => updateSelectedList(e)} /></th>
                    <th style={style.cell()}>{event.uuid.slice(0,8)}...</th>
                    <th style={style.cell()}>{NameOfSegment(event)}</th>
                    <th style={style.cell()}>{TimeSegmentString(event.start, event.end)}</th>
                    {/*THIS IS THE INDICATIONS FOR THE SEGMENTS (TO WHERE WILL BE COPIED)*/}
                    <th style={selectedSegments.includes(event.uuid) ? style.cell() : style.notSelectedCell()}>{NameOfSegment(event)}</th>
                    <th style={selectedSegments.includes(event.uuid) ? style.cell() : style.notSelectedCell()}>{getEquivalent(event.start, event.end)}</th>
                    {blockingSegmentsToCopy.length > 0 && <th style={selectedSegments.includes(event.uuid) ? style.statusCell() : style.notSelectedStatusCell()}><PostBlockingCreation uuid={event.uuid}/></th>}
                  </tr>)
                })}
              </table>
            </div>
            <div style={style.buttonWrapper()}>
              {!copyButtonClick  && <Button  variant="contained" color="success" style={style.button()}  onClick={()=>onCopyClick()}>{Translations.CopyBlockSegments.CopyButton}</Button>}
              {copyButtonClick  && <Button  variant="contained" color="success" style={style.closePopUpButton()}  onClick={()=>onCopyClick()}>{Translations.CopyBlockSegments.CloseButton}</Button>}
            </div>
            </div>
          </>
    )
}

const style = {
  statusCell: () => ({
    textAlign:        'center' as React.CSSProperties["textAlign"],
    verticalAlign:    'middle',
    padding:          '3px',
    fontSize:         'small',
    border:           '0px solid black'
  }),
  notSelectedStatusCell: () => ({
    textAlign:        'center' as React.CSSProperties["textAlign"],
    verticalAlign:    'middle',
    padding:          '3px',
    fontSize:         'small',
    border:           '0px solid black',
    backgroundColor:  'gray'

  }),
  closeButton: () => ({
    marginLeft:       '98%', 
    marginRight:      'auto', 
    width:            '24px', 
    height:           '24px', 
    cursor:           'pointer'
  }),
  title: () => ({
    margin:           '10px', 
    color:            'black', 
    alignContent:     'center'
  }),
  buttonWrapper: () => ({
    width:            "auto",
    margin:           '10px auto 0 auto'
  }),
  button: () => ({
    backgroundColor:  "forestgreen",
    fontWeight:       "bolder",
    color:            "white",
    border:           '1px solid forestgreen'
  }),
  closePopUpButton: () => ({
    backgroundColor:  "red",
    fontWeight:       "bolder",
    color:            "white",
    border:           '1px solid red'
  }),
  wrapperWeekPicker: () => ({
    backgroundColor:  'white', 
    borderRadius:     '8px', 
    margin:           '5px'
  }),
  wrapperTable: () => ({
    marginTop:        '10px',
    padding:          '0px', 
    maxHeight:        '450px', 
    overflowY:        'scroll' as React.CSSProperties["overflowY"],
  }),
  wrapperPopUp: () => ({
    backgroundColor:  'white', 
    width:            'auto', 
    maxHeight:        '470px', 
    paddingTop:       '5px', 
    paddingRight:     '15px', 
    paddingLeft:      '15px', 
    paddingBottom:    '15px', 
    border:           '2px solid black', 
    borderRadius:     '10px', 
    outline:          '10px solid transparent', 
    display:          'flex', 
    flexDirection:    'column'  as React.CSSProperties["flexDirection"],
  }),
  mainHeaderFrom: () =>({
    fontFamily:       '"Roboto", "Helvetica", "Arial", sans-serif;',
    backgroundColor:  'black',
    color:            'white',
    fontWeight:       'bolder',
    padding:          '5px',
    verticalAlign:    'middle',
    textAlign:        'center' as React.CSSProperties["textAlign"],
    border:           '1px solid black',
    position:         'sticky' as React.CSSProperties["position"],
    top:              -1,
    zIndex:           '999'
  }),
  header:() => ({
    padding:          '5px',
    fontSize:         'medium',
    fontFamily:       '"Roboto", "Helvetica", "Arial", sans-serif;',
    fontWeight:       'bold',
    backgroundColor:  'gray',
    color:            'white',
    border:           '1px solid black',
    position:         'sticky' as React.CSSProperties["position"],
    top:              '79px',
    zIndex:           '998'
  }),
  normalrow: ()  => ({
   width:             'auto',
  }),
  checkBoxCell: ()  => ({
    textAlign:        'center' as React.CSSProperties["textAlign"],
    verticalAlign:    'middle',
    padding:          '3px',
    width:            'auto',
    border:           '1px solid black'
   }),
   cell: ()  => ({
    textAlign:        'center' as React.CSSProperties["textAlign"],
    verticalAlign:    'middle',
    padding:          '3px',
    fontSize:         'small',
    border:           '1px solid black'
   }),
   notSelectedCell: ()  => ({
    textAlign:        'center' as React.CSSProperties["textAlign"],
    verticalAlign:    'middle',
    padding:          '3px',
    fontSize:         'small',
    border:           '1px solid black',
    backgroundColor:  'gray'
   })
};