
import { useContext, useEffect, useState } from 'react';
import './LinkItem.css';
import storage from '@/storage';
import { Preview } from '@/context/PreviewContext';

export default function LinkItem({ title, description, label, link }) {
    let {uiStyleLive, styleHover} = useContext(Preview);
    const isStyleLive = Object.values(uiStyleLive).length > 0

    let uiStyleHover = storage.getUiStyleHover();
    let uiStyle = storage.getUiStyle();

    const [style, setStyle] = useState(uiStyle);
    
    useEffect(() => {
        if(!isStyleLive) {
            return;
        }
        setStyle({
            ...uiStyleLive,
            fontSize: uiStyleLive.fontSize + 'px',
            borderRadius: uiStyleLive.borderRadius + 'px',
            borderWidth: uiStyleLive.borderWidth + 'px'
        });
    }, [uiStyleLive]);
    
    const handleHover = () => {
        let currentStyle = !isStyleLive ? uiStyle : uiStyleLive 
        let currentHover = Object.values(styleHover).length === 0 ? uiStyleHover : styleHover
        setStyle({...currentStyle, ...currentHover});
    }

    const handleLeave = () => 
    {
        let currentStyle = !isStyleLive ? uiStyle : uiStyleLive;
        setStyle(currentStyle);
    }

    return (
        <>
        <div className="link-wrap" >
            {title && description && (
                <>
                    <span className="title">{title}</span>
                    <span className="description">{description}</span>
                </>
            )}
            <a href={link} className="link-item" style={style} 
                onMouseOver={ handleHover } 
                onMouseLeave={ handleLeave}>{ label }</a>
        </div>
        </>
    );
}