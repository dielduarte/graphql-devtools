import React, { createContext } from 'react'
import coreMachine from "./machine";
import {useMachine} from "@xstate/react";

export const CoreContext = createContext({})

function CoreContextWrapper({  children }: any) {
    const [current, send] = useMachine(coreMachine)

    return <CoreContext.Provider value={{ current, send }}>
        {children}
    </CoreContext.Provider>
}

export default CoreContextWrapper