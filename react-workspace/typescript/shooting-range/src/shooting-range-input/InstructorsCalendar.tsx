import React from 'react';
import axios from 'axios';
import { ManagementDashboardContext } from './Context/ManagementDashboardContext';
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
  }
};

const InstructorsCalendar = () => {
  const [refresh, setRefresh] = React.useState(false);
  const {instructosListFromDB, fullInfoInstructors, globalVariabes, instructorSegments, setRefreshManagementBoard, setShowingPage} = React.useContext(ManagementDashboardContext);
  const calendarRef = React.useRef<any>()
  const clickEventCalendar = async (e:any) => {
    const dp = calendarRef.current.control;
    const modal = await dns.DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };
  const [calendarConfig, setCalendarConfig] = React.useState({
    businessBeginsHour:   parseInt(globalVariabes.startBusinessHours),
    businessEndsHour:     parseInt(globalVariabes.endBusinessHours),
    dayBeginsHour:        parseInt(globalVariabes.startDayHours),
    dayEndsHour:          parseInt(globalVariabes.endDayHours),
    viewType:             "Week",
    scrollToHour:         8,
    cellDuration:         60,
    timeHeaderCellDuration : 60,
    durationBarVisible:   true,
    timeRangeSelectedHandling: "Enabled",
    //CREATE NEW SEGMENT
    onTimeRangeSelected: async (args : any) => {
      console.log(args);

      const dp = calendarRef.current.control;
      const uniqueGUI = dns.DayPilot.guid();
      dp.events.add({
        start: args.start,
        end: args.end,
        id: uniqueGUI,
        text: `Segment - ${uniqueGUI.slice(-5)}`,
        backColor: `red`
      });
      //Form for creating event in calendar
      const form = [
        {name: "Create Segment:", type: "title" },
        { 
          name:   "Instructor: ", 
          id:     "instructor",
          options: instructosListFromDB,
          type: "select"
        },
        { name:   "Start of the Segment: ", 
          id:     "start",
          dateFormat: "d.M.yyyy",
          timeFormat: "H:mm",
          timeInterval: 60,
          type: "datetime"
        },
        { 
          name:   "End of the Segment: ", 
          id:     "end",
          dateFormat: "d.M.yyyy",
          timeFormat: "H:mm",
          timeInterval: 60,
          type: "datetime"
      },
      ];
      const data = { 
        instructor: 1,
        start :   args.start,
        end   :   args.end
      };
      const modal = await dns.DayPilot.Modal.form(form, data, {okText: "Create"});
      dp.clearSelection();
      if (!modal.result) { 
        //IF MODAL IS CANCELLED DELETE THE PLACHOLDER EVENT
        dp.events.remove(args.source);
        return; 
      }
      else{
        // Simple POST request with a JSON body using axios
        const instructorId = modal.result.instructor;
        const startSegment = modal.result.start;
        const endSegment = modal.result.end;
        const guid =  uniqueGUI;
        axios({
          url: `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/postCreateInstructorSegment.php?instructorId=${instructorId}&start=${startSegment}&end=${endSegment}&guid=${guid}`,
          method: "GET",
        }).then((res) => {
          console.log('REFRESH'); 
          setRefreshManagementBoard(Math.random());
          setShowingPage('LOADING');})
        }

    },
    onEventClick: async (args:any) => {
      //await clickEventCalendar(args.e);
    },
    contextMenu: new dns.DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async (args:any) => {
            const dp = calendarRef.current.control;
            const modal = await dns.DayPilot.Modal.confirm("Are you sure you want to delete this segment?", {okText: "Delete"});
            if (!modal.result) { 
              //IF MODAL IS CANCELLED NOTHING HAPPENS
              return; 
            }
            else{
              const thisGui = args.source.data.text.split('-')[1].trim()
              if(thisGui){
                console.log("DELETE")
                axios({
                  url: `https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/postDeleteInstructorSegment.php?guid=${thisGui}`,
                  method: "GET",
              }).then((res) => {console.log('REFRESH'); setRefreshManagementBoard(Math.random())})
              }

              console.log(args.source.data.text.split('-')[1].trim());
              dp.events.remove(args.source);
            }
          },
        },
        {
          text: "-"
        },
        {
          text: "Edit...",
          onClick: async (args:any) => {
            await clickEventCalendar(args.source);
          }
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
    let events :  ({
      id: number;
      text: string;
      start: any;
      end: any;
      backColor?: undefined;
  } | {
      id: number;
      text: string;
      start: string;
      end: string;
      backColor: string;
  })[] = [];
    instructorSegments.forEach((segment:any, idx: any) => {
      events.push({
        id: idx+1,
        text: `Event - ${segment.guid.slice(-5)}`,
        start: segment.startTime,
        end: segment.endTime,
        backColor: fullInfoInstructors.find((instructor : any) => instructor.id === segment.instructorId).color
      })
    })

    const startDate = `${new Date().toISOString()}`;
    calendarRef.current.control.update({startDate, events});
    setRefresh(true);
  }, [refresh]);

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <dns.DayPilotNavigator
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
    </div>
  );
}

export default InstructorsCalendar;