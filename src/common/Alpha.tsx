import React, { useEffect, useRef } from 'react';
import { ColorPickerHandler, StyleCSSProperties } from '../types';
import { Checkboard } from './Checkboard';
import SuperColor from 'super-color';

export const computeAlphaValue = (
    e: any,
    container: Element | null
): number => {
    if (container === null) {
        throw new Error('The slider container does\'t exist.');
    }
    let a: number;
    const containerWidth = container.clientWidth;
    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
    const left = x - (container.getBoundingClientRect().left + window.pageXOffset);

    if (left < 0) {
        a = 0;
    } else if (left > containerWidth) {
        a = 1;
    } else {
        a = Math.round((left * 100) / containerWidth) / 100;
    }

    return a;
};

interface AlphaProps {
    color: SuperColor;
    onChange: ColorPickerHandler;
}

export const Alpha: React.FC<AlphaProps> = ({ color, onChange }) => {
    const rgb = color.toRgba();
    const container = useRef(null);

    const handleChange = (e: MouseEvent | React.MouseEvent | React.TouchEvent) => {
        const alpha = computeAlphaValue(e, container.current);
        color.setAlpha(alpha);
        onChange(color);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
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
        gradient: {
            background: `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
           rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
        },
        pointer: {
            left: `${rgb.a * 100}%`,
        },
    };

    return (
        <div className="alpha-container">
            <div className="alpha-checkboard">
                <Checkboard />
            </div>
            <div style={styles.gradient} className="alpha-gradient" />
            <div
                ref={container}
                className="pointer-container"
                onMouseDown={handleMouseDown}
                onTouchMove={handleChange}
                onTouchStart={handleChange}
            >
                <div style={styles.pointer} className="alpha-pointer">
                    <div className="color-pointer" />
                </div>
            </div>
        </div>
    );
};
