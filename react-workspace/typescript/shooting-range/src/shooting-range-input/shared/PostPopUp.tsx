import Popup from "reactjs-popup";
import WarningIcon from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { useGetEndPoint } from "../ApiCalls/useGetEndPoint";
import React from "react";
import { ManagementDashboardContext } from "../Context/ManagementDashboardContext";
import { REQUEST_STATUS } from "../ApiCalls/enums";
import { Spinner } from "./Placeholders";

const Banner = (payload : any, closeModal: any) => {
  return(
    <>
      <WarningIcon style={{height:'72px', width:'72px', marginLeft:'auto', marginRight:'auto', marginTop:'10px', marginBottom:'10px', color:'green'}}/>
      <Typography sx={{ p: 2 }} style={{ fontWeight:'bold', color:'black', textAlign:'center'}}>{payload.message}</Typography>
      <Button onClick={()=>closeModal()} variant='contained' style={{backgroundColor:'green', fontWeight:'bolder', color:'white', width:'auto'}}>
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
            {postDone ? <Banner payload={postCreationOfSegment.payload} closeModal={closeModal}/> : <Spinner/>}
            </div>
          </Popup>
    )
}
