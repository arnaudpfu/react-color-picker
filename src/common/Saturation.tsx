import React, { useEffect, useRef } from 'react';
import { StyleCSSProperties } from '../types';
import './Saturation.scss';
import { throttle } from 'lodash';

interface SaturationProps {
    h: number;
    sValue: number;
    v: number;
    onChange: (sValue: number, v: number) => void;
}

const calculateChange = (
    e: any,
    container: Element | null | undefined
): { sValue: number; v: number } => {
    if (container === null || container === undefined) {
        throw new Error("The container does't exist.");
    }
    const { width: containerWidth, height: containerHeight } =
        container.getBoundingClientRect();
    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
    const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
    let left = x - (container.getBoundingClientRect().left + window.pageXOffset);
    let top = y - (container.getBoundingClientRect().top + window.pageYOffset);

    if (left < 0) {
        left = 0;
    } else if (left > containerWidth) {
        left = containerWidth;
    }

    if (top < 0) {
        top = 0;
    } else if (top > containerHeight) {
        top = containerHeight;
    }

    const saturation = left / containerWidth;
    const bright = 1 - top / containerHeight;

    return { sValue: saturation, v: bright };
};

export const Saturation: React.FC<SaturationProps> = ({ h, sValue, v, onChange }) => {
    const customThrottle: any = throttle((fn, sValue, v) => {
        fn(sValue, v);
    }, 50);
    const containerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const styles: StyleCSSProperties = {
        color: {
            background: `hsl(${h},100%, 50%)`,
        },
        pointer: {
            top: `${-(v * 100) + 100}%`,
            left: `${sValue * 100}%`,
        },
    };

    const getContainerRenderWindow = () => {
        let renderWindow = window as Window;
        while (
            containerRef.current !== null &&
            !renderWindow.document.contains(containerRef.current as Node) &&
            renderWindow.parent !== renderWindow
        ) {
            renderWindow = renderWindow.parent;
        }
        return renderWindow;
    };

    const handleChange = (e: MouseEvent | React.MouseEvent | React.TouchEvent) => {
        const { sValue, v } = calculateChange(e, containerRef.current);
        customThrottle(onChange, sValue, v);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        handleChange(e);
        const renderWindow = getContainerRenderWindow();
        const mouseBarrier = document.createElement('div');
        mouseBarrier.id = 'color-picker-mouse-barrier';
        mouseBarrier.setAttribute(
            'style',
            'position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index: 1;'
        );
        document.body.appendChild(mouseBarrier);
        renderWindow.addEventListener('mousemove', handleChange);
        renderWindow.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        unbindEventListeners();
    };

    const unbindEventListeners = () => {
        const renderWindow = getContainerRenderWindow();
        const barrier = document.getElementById('color-picker-mouse-barrier');
        barrier && barrier.remove();
        renderWindow.removeEventListener('mousemove', handleChange);
        renderWindow.removeEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        return () => {
            customThrottle.cancel();
            unbindEventListeners();
        };
    }, []);

    return (
        <div
            className="color-picker-saturation"
            style={styles.color}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchMove={handleChange}
            onTouchStart={handleChange}
        >
            <div className="saturation-white">
                <div className="saturation-black" />
                <div style={styles.pointer} className="saturation-pointer">
                    <div className="color-pointer-circle" />
                </div>
            </div>
        </div>
    );
};
