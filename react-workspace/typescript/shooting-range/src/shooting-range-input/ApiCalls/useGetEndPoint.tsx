import React from 'react';
import axios from 'axios';
import { REQUEST_STATUS } from './enums';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';

function useGetEndPoint(apiRootURL : string, endpoint : string, urlParameters : string  ='')
{
  const   itHasUrlParameters                =   urlParameters==='' ? '' : '?';
  let     requestUri                        =   `${apiRootURL}${endpoint}.php${itHasUrlParameters}${urlParameters}`;
  const {refreshManagementDashboard}        =   React.useContext(ManagementDashboardContext);
  const   [payload, setPayload]             =   React.useState();
  const   [message, setMessage]             =   React.useState("");
  const   [status, setStatus]               =   React.useState(0);
  const   [requestStatus, setRequestStatus] =   React.useState("");
  const   [error, setError]                 =   React.useState(""); 
  React.useEffect(() => {
    async function FetchData(){
      if(requestStatus=== ""){
        console.log("SET REQUEST")
        setRequestStatus(REQUEST_STATUS.LOADING);
        await axios.get(
          requestUri
        ).then(response => {
          setPayload(response.data);
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          console.log(response);
          setStatus(response.status);
          setMessage(response.data.message)
        }).catch(e=>{
          setRequestStatus(REQUEST_STATUS.FAILURE);
          setError(e);
          setStatus(500)
          setMessage(e)
        })
      }
    }
    FetchData();
  },[refreshManagementDashboard]);
  return{payload, requestStatus, status, error, message}
}

export {useGetEndPoint}