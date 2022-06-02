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
exports.Alpha = exports.computeAlphaValue = void 0;
const react_1 = __importStar(require("react"));
require("./Alpha.scss");
const Checkboard_1 = require("./Checkboard");
const computeAlphaValue = (e, container) => {
    if (container === null) {
        throw new Error('The slider container does\'t exist.');
    }
    let a;
    const containerWidth = container.clientWidth;
    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
    const left = x - (container.getBoundingClientRect().left + window.pageXOffset);
    if (left < 0) {
        a = 0;
    }
    else if (left > containerWidth) {
        a = 1;
    }
    else {
        a = Math.round((left * 100) / containerWidth) / 100;
    }
    return a;
};
exports.computeAlphaValue = computeAlphaValue;
const Alpha = ({ color, onChange }) => {
    const rgb = color.toRgba();
    const container = (0, react_1.useRef)(null);
    const handleChange = (e) => {
        const alpha = (0, exports.computeAlphaValue)(e, container.current);
        color.setAlpha(alpha);
        onChange(color);
    };
    const handleMouseDown = (e) => {
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
    (0, react_1.useEffect)(() => unbindEventListeners());
    const styles = {
        gradient: {
            background: `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
           rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
        },
        pointer: {
            left: `${rgb.a * 100}%`,
        },
    };
    return (react_1.default.createElement("div", { className: "alpha-container" },
        react_1.default.createElement("div", { className: "alpha-checkboard" },
            react_1.default.createElement(Checkboard_1.Checkboard, null)),
        react_1.default.createElement("div", { style: styles.gradient, className: "alpha-gradient" }),
        react_1.default.createElement("div", { ref: container, className: "pointer-container", onMouseDown: handleMouseDown, onTouchMove: handleChange, onTouchStart: handleChange },
            react_1.default.createElement("div", { style: styles.pointer, className: "alpha-pointer" },
                react_1.default.createElement("div", { className: "color-pointer" })))));
};
exports.Alpha = Alpha;
