import React, { useEffect, useRef } from 'react';
import { ColorPickerHandler, StyleCSSProperties } from '../types';
import SuperColor from 'super-color';

export const computeHueValue = (e: any, container: Element | null) => {
    if (container === null) {
        throw new Error("The slider container does't exist.");
    }
    let h: number;
    const containerWidth = container.clientWidth;
    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
    const left = x - (container.getBoundingClientRect().left + window.pageXOffset);

    if (left < 0) {
        h = 0;
    } else if (left > containerWidth) {
        h = 359;
    } else {
        const percent = (left * 100) / containerWidth;
        h = (360 * percent) / 100;
    }

    return h;
};

interface HueProps {
    color: SuperColor;
    onChange: ColorPickerHandler;
}

export const Hue: React.FC<HueProps> = ({ color, onChange }) => {
    const hsla = color.toHsla();
    const container = useRef(null);

    const handleChange = (e: MouseEvent | React.MouseEvent | React.TouchEvent) => {
        const hue = computeHueValue(e as MouseEvent | React.MouseEvent, container.current);
        color.setHue(hue);
        onChange(color);
    };
    
    const handleMouseDown = (e: MouseEvent | React.MouseEvent) => {
        handleChange(e);
        window.addEventListener('mousemove', handleChange);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        unbindEventListeners();
    };

    const unbindEventListeners = () => {
        window.removeEventListener('mousemove', handleChange);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => unbindEventListeners());

    const styles: StyleCSSProperties = {
        pointer: {
            left: `${hsla.h / 3.6}%`,
        },
    };

    return (
        <div className="hue-container">
            <div
                className="hue-horizontal"
                ref={container}
                onMouseDown={handleMouseDown}
                onTouchMove={handleChange}
                onTouchStart={handleChange}
            >
                <style>{`
            .hue-horizontal {
              background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
                33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to right, #f00 0%, #ff0
                17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }
          `}</style>
                {
                    <div style={styles.pointer} className="hue-pointer">
                        <div className="color-pointer" />
                    </div>
                }
            </div>
        </div>
    );
};
