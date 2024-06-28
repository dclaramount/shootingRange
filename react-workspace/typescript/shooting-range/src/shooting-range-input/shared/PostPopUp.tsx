import Popup from "reactjs-popup";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import { useGetEndPoint } from "../ApiCalls/useGetEndPoint";
import React from "react";
import { ManagementDashboardContext } from "../Context/ManagementDashboardContext";
import { REQUEST_STATUS } from "../ApiCalls/enums";
import { Spinner } from "./Placeholders";
import { Translations } from "../types/translations";
//Icons -> https://fontawesome.com/v4/icons/
const Banner = (props :any) => {
  return(
    <>
      {/* REPONSE 200 - OK*/}
      {props.status===200 &&          <i className="fa fa-check-circle fa-4x"   style={{color:'green', marginLeft:'auto', marginRight:'auto', marginTop:'15px', marginBottom:'15px'}} aria-hidden="true"></i>}
      {props.status===200 &&          <Typography sx={{ p: 2 }} style={{ height:'100%', marginTop:'auto', marginBottom:'auto', fontWeight:'bold', color:'green', textAlign:'center'}}>{props.payload.message}</Typography>}
      {props.status===200 &&          <Button onClick={()=>props.closeModal()} variant='contained' style={{marginTop:'auto', backgroundColor:'green', fontWeight:'bolder', color:'white', width:'auto', borderColor:'green'}}>{Translations.PostPoup.CloseButton}</Button>}
      {/* REPONSE 400 - BAD REQUEST*/}
      {props.status===400 &&          <i className="fa fa-exclamation-circle fa-4x"   style={{color:'orange',  marginLeft:'auto', marginRight:'auto', marginTop:'15px', marginBottom:'15px'}} aria-hidden="true"></i>}
      {props.status===400 &&          <Typography sx={{ p: 2 }} style={{height:'100%', marginTop:'auto', marginBottom:'auto', fontWeight:'bold', color:'orange', textAlign:'center'}}>{props.payload.message}</Typography>}
      {props.status===400 &&          <Button onClick={()=>props.closeModal()} variant='contained' style={{marginTop:'auto', backgroundColor:'orange', fontWeight:'bolder', color:'white', width:'auto', borderColor:'orange'}}>{Translations.PostPoup.CloseButton}</Button>}
      {/* REPONSE 409 - CONFLICT*/}
      {props.status===409 &&          <i className="fa fa-random fa-4x"   style={{color:'orange',  marginLeft:'auto', marginRight:'auto', marginTop:'15px', marginBottom:'15px'}} aria-hidden="true"></i>}
      {props.status===409 &&          <Typography sx={{ p: 2 }} style={{height:'100%', marginTop:'auto', marginBottom:'auto', fontWeight:'bold', color:'orange', textAlign:'center'}}>{props.payload.message}</Typography>}
      {props.status===409 &&          <Button onClick={()=>props.closeModal()} variant='contained' style={{marginTop:'auto', backgroundColor:'orange', fontWeight:'bolder', color:'white', width:'auto', borderColor:'orange'}}>{Translations.PostPoup.CloseButton}</Button>}
      {/* REPONSE 500 - INTERNAL SERVER ERROR*/}
      {props.status===500 &&          <i className="fa fa-times-circle fa-5x"   style={{color:'red',  marginLeft:'auto', marginRight:'auto', marginTop:'15px', marginBottom:'15px'}} aria-hidden="true"></i>}
      {props.status===500 &&          <Typography sx={{ p: 2 }} style={{height:'100%', marginTop:'auto', marginBottom:'auto', fontWeight:'bold', color:'red', textAlign:'center'}}>{props.payload.message}</Typography>}
      {props.status===500 &&          <Button onClick={()=>props.closeModal()} variant='contained' style={{marginTop:'auto', backgroundColor:'red', fontWeight:'bolder', color:'white', width:'auto', borderColor:'red'}}>{Translations.PostPoup.CloseButton}</Button>}
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

