import React, { useCallback, useState } from 'react';
import { ColorFields } from './ColorFields';
import { Alpha, Checkboard, Hue, Saturation } from './common';
import { ColorPickerHandler } from './types';
import SuperColor from 'super-color'

interface ColorPickerInnerProps {
    defaultColor: SuperColor;
    onChange: ColorPickerHandler;
    width?: number;
}

export const ColorPickerInner: React.FC<ColorPickerInnerProps> = ({
    defaultColor,
    onChange,
    width = 225,
}) => {
    const [superColor, setSuperColor] = useState(defaultColor);
    const [,setRandom] = useState((Math.random() + 1).toString(36).substring(2));
    const rgb = superColor.toRgba();
    const hsv = superColor.toHsva()
    const renderNotice: React.CSSProperties = {
        background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
    };

    const handleChange = useCallback((newColor: SuperColor) => {
        onChange(newColor)
        setSuperColor(newColor);
        //Required because superColor is not mutated.
        setRandom((Math.random() + 1).toString(36).substring(2));
    }, [onChange])

    const handleSaturationChange = useCallback((sValue: number, v: number) => {
        superColor.setHsv({ sValue, v });
        handleChange(superColor)
    }, [handleChange, superColor])

    return (
        <div style={{ width }} className="color-picker">
            <div className="saturation-container">
                <Saturation
                    onChange={handleSaturationChange}
                    h={hsv.h}
                    sValue={hsv.sValue}
                    v={hsv.v}
                />
            </div>
            <div className="color-picker-body">
                <div className="slide-controls flexbox-fix">
                    <div className="rendering-notice">
                        <div className="swatch">
                            <div style={renderNotice} className="render" />
                            <Checkboard />
                        </div>
                    </div>
                    <div className="toggles">
                        <div className="hue">
                            <Hue
                                color={superColor}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="alpha">
                            <Alpha
                                color={superColor}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <ColorFields color={superColor} onChange={handleChange} />
            </div>
        </div>
    );
};
