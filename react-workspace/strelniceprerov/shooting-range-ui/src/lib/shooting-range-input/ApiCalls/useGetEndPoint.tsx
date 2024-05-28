import React from 'react';
import axios from 'axios';
import { REQUEST_STATUS } from './enums';

function useGetEndPoint(apiRootURL : string, endpoint : string, urlParameters ='')
{
  const   itHasUrlParameters                =   urlParameters==='' ? '' : '?';
  const   requestUri                        =   `${apiRootURL}${endpoint}.php${itHasUrlParameters}${urlParameters}`;
  const   [payload, setPayload]             =   React.useState();
  const   [requestStatus, setRequestStatus] =   React.useState("");
  const   [error, setError]                 =   React.useState(""); 
  React.useEffect(() => {
    async function FetchData(){
      if(requestStatus!== REQUEST_STATUS.LOADING){
        setRequestStatus(REQUEST_STATUS.LOADING);
        await axios.get(
          requestUri
        ).then(response => {
          setPayload(response.data);
          setRequestStatus(REQUEST_STATUS.SUCCESS);
        }).catch(e=>{
          setRequestStatus(REQUEST_STATUS.FAILURE);
          setError(e);
        })
      }
    }
    FetchData();
  },[]);
  return{payload, requestStatus, error}
}

export {useGetEndPoint}