import React from 'react';

export const GlobalVariablesContext = React.createContext<any>("");

export function GlobalVariablesProvider({children, gVariables} : any)
{
  /*-------------------------------------------------------------------------------------------------------------*/
  /*                                     HOOKS IN CONTEXT PROVIDER                                               */
  /*-------------------------------------------------------------------------------------------------------------*/
  const [globalVariabes, setGlobalVariables]                          = React.useState(gVariables);                     //Stores the list of global variables
  return(
    <GlobalVariablesContext.Provider value={{globalVariabes,setGlobalVariables}}>
      {children}
    </GlobalVariablesContext.Provider>
  )
}