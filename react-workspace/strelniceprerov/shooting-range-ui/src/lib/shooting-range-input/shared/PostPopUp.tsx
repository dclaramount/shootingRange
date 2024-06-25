import Popup from "reactjs-popup";
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { useGetEndPoint } from "../ApiCalls/useGetEndPoint";
import React from "react";
import { REQUEST_STATUS } from "../ApiCalls/enums";
import { Spinner } from "./Placeholders";
import { ManagementDashboardContext } from "../components/Context/ManagementDashboardContext";

const Banner = (props :any) => {
  return(
    <>
      {props.status!==200 &&  <WarningIcon style={{marginLeft:'auto', marginRight:'auto', marginTop:'10px', marginBottom:'10px', color:'green'}}/>}
      {props.status===200 &&  <CheckCircleIcon style={{marginLeft:'auto', marginRight:'auto', marginTop:'10px', marginBottom:'10px', color:'green'}}/>}
      {props.status!==200 && <Typography sx={{ p: 2 }} style={{ fontWeight:'bold', color:'red', textAlign:'center'}}>{props.payload.message}</Typography>}
      {props.status===200 && <Typography sx={{ p: 2 }} style={{ fontWeight:'bold', color:'green', textAlign:'center'}}>{props.payload.message}</Typography>}
      <Button onClick={()=>props.closeModal()} variant='contained' style={{backgroundColor:'green', fontWeight:'bolder', color:'white', width:'auto'}}>
        Close
      </Button>
    </>
  )
}

export const PostPopUp = ({postAPI, postParameters, closeModal} : any) => {
  let     postDone                          =   false;
  const   {globalVariabes}                  =   React.useContext(ManagementDashboardContext);
  const   postCreationOfSegment             =   useGetEndPoint(globalVariabes.apiRootURL, postAPI, postParameters);
  postDone                                  =   postCreationOfSegment.requestStatus  === REQUEST_STATUS.SUCCESS 
  return( <Popup open={true} onClose={()=>closeModal()} closeOnDocumentClick={false} >
            <div style={{backgroundColor:'white', width:'500px', height:'250px', paddingTop:'5px', paddingRight:'15px', paddingLeft:'15px', paddingBottom:'15px', border:'2px solid black', borderRadius:'10px', outline:'10px solid transparent', display:'flex', flexDirection:'column'}}>
            {postDone ? <Banner payload={postCreationOfSegment.payload} status={postCreationOfSegment.status} closeModal={closeModal}/> : <Spinner/>}
            </div>
          </Popup>
    )
}
