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
exports.Hue = exports.computeHueValue = void 0;
const react_1 = __importStar(require("react"));
const computeHueValue = (e, container) => {
    if (container === null) {
        throw new Error("The slider container does't exist.");
    }
    let h;
    const containerWidth = container.clientWidth;
    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
    const left = x - (container.getBoundingClientRect().left + window.pageXOffset);
    if (left < 0) {
        h = 0;
    }
    else if (left > containerWidth) {
        h = 359;
    }
    else {
        const percent = (left * 100) / containerWidth;
        h = (360 * percent) / 100;
    }
    return h;
};
exports.computeHueValue = computeHueValue;
const Hue = ({ color, onChange }) => {
    const hsla = color.toHsla();
    const container = (0, react_1.useRef)(null);
    const handleChange = (e) => {
        const hue = (0, exports.computeHueValue)(e, container.current);
        color.setHue(hue);
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
        pointer: {
            left: `${hsla.h / 3.6}%`,
        },
    };
    return (react_1.default.createElement("div", { className: "hue-container" },
        react_1.default.createElement("div", { className: "hue-horizontal", ref: container, onMouseDown: handleMouseDown, onTouchMove: handleChange, onTouchStart: handleChange },
            react_1.default.createElement("style", null, `
            .hue-horizontal {
              background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
                33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to right, #f00 0%, #ff0
                17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }
          `),
            react_1.default.createElement("div", { style: styles.pointer, className: "hue-pointer" },
                react_1.default.createElement("div", { className: "color-pointer" })))));
};
exports.Hue = Hue;
