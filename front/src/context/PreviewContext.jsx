import { createContext, useState, useEffect } from "react";
import storage from "@/storage";

export const Preview = createContext({
    uiStyle: {},
    setUiStyle: () => {},
    uiStyleLive: {},
    setUiStyleLive: () => {},
    styleHover: {},
    setStyleHover: () => {},
    hoverEnabled: false, 
    setHoverEnabled: () => {},
    handleSubmit: () => {}
});

export default function PreviewContext({ children }) {
    const [uiStyle, setUiStyle] = useState({
        color: storage.getUiStyle('color', '#000000'),
        textAlign: storage.getUiStyle('textAlign', 'center'),
        fontSize: storage.getUiStyle('fontSize', 12),
        borderRadius: storage.getUiStyle('borderRadius', 0),
        borderWidth: storage.getUiStyle('borderWidth', 0),
        borderColor: storage.getUiStyle('borderColor', '#000000'),
        backgroundColor: storage.getUiStyle('backgroundColor', "#ffffff"),
        logoImage: storage.getItem('logo-img'),
    });

    const [uiStyleLive, setUiStyleLive] = useState(uiStyle);

    useEffect(() => {
        setUiStyleLive(uiStyle);
    }, [uiStyle]);
    
    const [hoverEnabled, setHoverEnabled] = useState(0);

    const [styleHover, setStyleHover] = useState(storage.getUiStyleHover());
    
    const handleSubmit = (event) => {
        event.preventDefault();

        storage.setItem('logo-img', uiStyle.logoImage);

        storage.setUiStyle(uiStyle);

        if(!hoverEnabled) {
            storage.setUiStyleHover({});
            return;
        }

        storage.setUiStyleHover(styleHover);
    }

    const uploadHandler = (event) => {
        let fileReader = new FileReader;

        fileReader.onload = (file) => {
            setLogoImage(file.target.result);
        }

        fileReader.readAsDataURL(event.target.files[0]);
    }
    
    return (
        <Preview.Provider value={{
            uiStyle,
            setUiStyle,
            uiStyleLive,
            setUiStyleLive,
            styleHover,
            setStyleHover,
            hoverEnabled, 
            setHoverEnabled,
            handleSubmit
        }}>
            { children }
        </Preview.Provider>
    )
}