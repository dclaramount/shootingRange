import React from 'react';
import axios from 'axios';
import {ApiEndpointFetchStatus} from "./Types/enums";
import {retriggerFetchType} from "./Types/types";

function useFetchEndPoint(apiRootURL : string, endpoint : string,  fn :  React.Dispatch<React.SetStateAction<any>> = () => void(0),  trigger : retriggerFetchType = true, urlParameters  : string = '' )
{
    const   itHasUrlParameters                          =   urlParameters==='' ? '' : '?';
    const   requestUri                                  =   `${apiRootURL}${endpoint}.php${itHasUrlParameters}${urlParameters}`;
    const   [payload, setPayload]                       =   React.useState();
    const   [message, setMessage]                       =   React.useState("");
    const   [status, setStatus]                         =   React.useState(200);
    const   [requestStatus, setRequestStatus]           =   React.useState(ApiEndpointFetchStatus.NOTSTARTED);
    const   [error, setError]                           =   React.useState("");
    const   [oldTriggerStatus, setOldTriggerStatus]     =   React.useState(trigger)
    React.useEffect(() => {
        async function FetchData(){
            if(requestStatus=== ApiEndpointFetchStatus.NOTSTARTED || requestStatus===ApiEndpointFetchStatus.SUCCESS){
                setRequestStatus(ApiEndpointFetchStatus.LOADING);
                await axios.get(
                    requestUri
                ).then(response => {
                    setTimeout(() => {
                        setPayload(response.data.payload);
                        fn(response.data.payload);
                        setStatus(response.status);
                        setMessage(response.data.message)
                        setRequestStatus(ApiEndpointFetchStatus.SUCCESS);
                    }, 500);
                }).catch(e=>{
                    setError(e);
                    setPayload(e.response.data);
                    setStatus(e.response.status)
                    setMessage(e)
                    setRequestStatus(ApiEndpointFetchStatus.FAILURE);
                })
            }
        }
        switch(typeof(trigger)) {
            case 'boolean':
                if(requestStatus===ApiEndpointFetchStatus.NOTSTARTED){ FetchData();}
                else if(oldTriggerStatus===true && trigger===false){FetchData();}
                break;
            case 'object':
                if(requestStatus===ApiEndpointFetchStatus.NOTSTARTED){ FetchData();}
                else if(oldTriggerStatus!==trigger){FetchData();}
                break;
            default:
                console.log('IS NOTHING');
                break;
        }
        setOldTriggerStatus(trigger);
    },[JSON.stringify(trigger)]);
    return{payload, requestStatus, status, error, message}
}

export {useFetchEndPoint}