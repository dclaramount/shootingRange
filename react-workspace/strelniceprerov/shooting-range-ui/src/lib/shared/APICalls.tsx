import axios, { AxiosResponse } from "axios";
import { globalVariableEntity, SimpleCustomResponse } from "./types";
import { parseGlobalVariablesResponse } from "./GeneralAPIHelpers";
/** 
* Returns All the entries of the global_variables table.
*
* @remarks
  * This method returns an empty SimpleCustomResponse Object with the entries of the global_variables table.
*
* @returns an empty SimpleCustomResponse Object.
*
* @beta
      */
export async function fetchGlobalVariables (): Promise<SimpleCustomResponse> {
  const uri = "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getGlobalVariables.php"
  const response: AxiosResponse<globalVariableEntity[], any> = await axios.get<globalVariableEntity[]>( uri );
  return {
    status: response.status,
    payload: parseGlobalVariablesResponse( response )
  }
}