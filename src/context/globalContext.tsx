import { ScreenMode } from "@common/enums/Mode";
import useWindowDimensions from "@components/WindowDimension";
import React, { useEffect, useState } from "react";

export type IGlobalContextProps = {
    screenMode: ScreenMode | null;
    setScreenMode: (value: ScreenMode) => void;
};


export const GlobalContext = React.createContext<IGlobalContextProps>({
    screenMode: null,
    setScreenMode: () => { }
});


export const GlobalContextProvider = (props) => {
    const [screenMode, setScreenMode] = useState<ScreenMode>(null);
    const { height, width } = useWindowDimensions();


    useEffect(() => {
        if (!width) {
            setScreenMode(null);
            return;
        }
        setScreenMode(width > 980 ? ScreenMode.Desktop : ScreenMode.Mobile)
    }, [width])


    return (
        <GlobalContext.Provider
            value={{
                screenMode: screenMode,
                setScreenMode: setScreenMode
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};