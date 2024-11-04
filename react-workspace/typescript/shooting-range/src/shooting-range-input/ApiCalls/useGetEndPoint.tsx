import React from 'react';
import axios from 'axios';
import { REQUEST_STATUS } from './enums';
import { ManagementDashboardContext } from '../Context/ManagementDashboardContext';

function useGetEndPoint(apiRootURL : string, endpoint : string, urlParameters  ='')
{
  const {refreshManagementDashboard}        =   React.useContext(ManagementDashboardContext);
  const   itHasUrlParameters                =   urlParameters==='' ? '' : '?';
  const   requestUri                        =   `${apiRootURL}${endpoint}.php${itHasUrlParameters}${urlParameters}`;
  const   [payload, setPayload]             =   React.useState();
  const   [message, setMessage]             =   React.useState("");
  const   [status, setStatus]               =   React.useState(0);
  const   [requestStatus, setRequestStatus] =   React.useState("");
  const   [error, setError]                 =   React.useState(""); 
  React.useEffect(() => {
    async function FetchData(){
      if(requestStatus!== REQUEST_STATUS.LOADING){
        setRequestStatus(REQUEST_STATUS.LOADING);
        await axios.get(
          requestUri
        ).then(response => {
          setTimeout(() => {
            setPayload(response.data);
            setRequestStatus(REQUEST_STATUS.SUCCESS);
            setStatus(response.status);
            setMessage(response.data.message)
          }, 500);
        }).catch(e=>{
          setRequestStatus(REQUEST_STATUS.SUCCESS);
          setError(e);
          setPayload(e.response.data);
          setStatus(e.response.status)
          setMessage(e)
        })
      }
    }
    FetchData();
  },[refreshManagementDashboard]);
  return{payload, requestStatus, status, error, message}
}

export {useGetEndPoint}