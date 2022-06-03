"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Saturation = void 0;
const react_1 = __importStar(require("react"));
const lodash_1 = require("lodash");
const calculateChange = (e, container) => {
    if (container === null || container === undefined) {
        throw new Error("The container does't exist.");
    }
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
    const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
    let left = x - (container.getBoundingClientRect().left + window.pageXOffset);
    let top = y - (container.getBoundingClientRect().top + window.pageYOffset);
    if (left < 0) {
        left = 0;
    }
    else if (left > containerWidth) {
        left = containerWidth;
    }
    if (top < 0) {
        top = 0;
    }
    else if (top > containerHeight) {
        top = containerHeight;
    }
    const saturation = left / containerWidth;
    const bright = 1 - top / containerHeight;
    return { sValue: saturation, v: bright };
};
const Saturation = ({ h, sValue, v, onChange }) => {
    const customThrottle = (0, lodash_1.throttle)((fn, sValue, v) => {
        fn(sValue, v);
    }, 50);
    const containerRef = (0, react_1.useRef)(null);
    const styles = {
        color: {
            background: `hsl(${h},100%, 50%)`,
        },
        pointer: {
            top: `${-(v * 100) + 100}%`,
            left: `${sValue * 100}%`,
        },
    };
    const getContainerRenderWindow = () => {
        let renderWindow = window;
        while (containerRef.current !== null &&
            !renderWindow.document.contains(containerRef.current) &&
            renderWindow.parent !== renderWindow) {
            renderWindow = renderWindow.parent;
        }
        return renderWindow;
    };
    const handleChange = (e) => {
        const { sValue, v } = calculateChange(e, containerRef.current);
        customThrottle(onChange, sValue, v);
    };
    const handleMouseDown = (e) => {
        handleChange(e);
        const renderWindow = getContainerRenderWindow();
        const mouseBarrier = document.createElement('div');
        mouseBarrier.id = 'color-picker-mouse-barrier';
        mouseBarrier.setAttribute('style', 'position:absolute;top:0px;left:0px;width:100vw;height:100vh;z-index: 1;');
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
    (0, react_1.useEffect)(() => {
        return () => {
            customThrottle.cancel();
            unbindEventListeners();
        };
    }, []);
    return (react_1.default.createElement("div", { className: "color-picker-saturation", style: styles.color, ref: containerRef, onMouseDown: handleMouseDown, onTouchMove: handleChange, onTouchStart: handleChange },
        react_1.default.createElement("div", { className: "saturation-white" },
            react_1.default.createElement("div", { className: "saturation-black" }),
            react_1.default.createElement("div", { style: styles.pointer, className: "saturation-pointer" },
                react_1.default.createElement("div", { className: "color-pointer-circle" })))));
};
exports.Saturation = Saturation;
