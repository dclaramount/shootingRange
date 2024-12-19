import axios, { AxiosResponse } from "axios";
import { globalVariableEntity, SimpleCustomResponse } from "./types";
import { parseGlobalVariablesResponse } from "./GeneralAPIHelpers";

export async function fetchGlobalVariables (): Promise<SimpleCustomResponse> {
  const uri = "https://strelniceprerov.cz/wp-content/plugins/elementor-addon/widgets/getGlobalVariables.php"
  const response: AxiosResponse<globalVariableEntity[], any> = await axios.get<globalVariableEntity[]>( uri );
  return {
    status: response.status,
    payload: parseGlobalVariablesResponse( response )
  }
}