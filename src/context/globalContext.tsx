import { ScreenMode } from "@common/enums/Mode";
import useWindowDimensions from "@components/WindowDimension";
import React, { useEffect, useState } from "react";

export type IGlobalContextProps = {
    screenMode: ScreenMode | null;
    isTabView: Boolean;
    setScreenMode: (value: ScreenMode) => void;
};


export const GlobalContext = React.createContext<IGlobalContextProps>({
    screenMode: null,
    isTabView: false,
    setScreenMode: () => { }
});


export const GlobalContextProvider = (props) => {
    const [screenMode, setScreenMode] = useState<ScreenMode>(null);
    const [isTabView, setIsTabView] = useState(false)
    const { height, width } = useWindowDimensions();


    useEffect(() => {
        if (!width) {
            setScreenMode(null);
            return;
        }
        if (width < 980 && width > 478) {
            setIsTabView(true)
        } else {
            setIsTabView(false)
        }
        setScreenMode(width > 980 ? ScreenMode.Desktop : ScreenMode.Mobile)
    }, [width])


    return (
        <GlobalContext.Provider
            value={{
                screenMode: screenMode,
                isTabView:isTabView,
                setScreenMode: setScreenMode
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};