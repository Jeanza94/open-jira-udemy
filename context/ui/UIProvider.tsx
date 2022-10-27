import { FC, PropsWithChildren, useReducer } from "react";
import { UiContext, uiReducer } from "./";

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({ type: 'UI-Open SideBar' });
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI-Close SideBar' });
    }

    const setIsAddingEntry = (entry: boolean) => {
        dispatch({ type: 'UI-Set isAddingEntry', payload: entry })
    }

    const startDragging = () => {
        dispatch({ type: 'UI-Start Dragging' });
    }

    const endDragging = () => {
        dispatch({ type: 'UI-End Dragging' });
    }


    return (
        <UiContext.Provider value={{
            ...state,

            //methods
            openSideMenu,
            closeSideMenu,

            setIsAddingEntry,

            startDragging,
            endDragging
        }}>
            {children}
        </UiContext.Provider>
    )
}





