import { createContext } from "react";


interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean

    //methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (entry: boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}

export const UiContext = createContext({} as ContextProps)


