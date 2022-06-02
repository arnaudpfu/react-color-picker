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
exports.ColorPickerInner = void 0;
const react_1 = __importStar(require("react"));
const ColorFields_1 = require("./ColorFields");
const common_1 = require("./common");
const ColorPickerInner = ({ defaultColor, onChange, width = 225, }) => {
    const [superColor, setSuperColor] = (0, react_1.useState)(defaultColor);
    const [, setRandom] = (0, react_1.useState)((Math.random() + 1).toString(36).substring(2));
    const rgb = superColor.toRgba();
    const hsv = superColor.toHsva();
    const renderNotice = {
        background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
    };
    const handleChange = (0, react_1.useCallback)((newColor) => {
        onChange(newColor);
        setSuperColor(newColor);
        //Required because superColor is not mutated.
        setRandom((Math.random() + 1).toString(36).substring(2));
    }, [onChange]);
    const handleSaturationChange = (0, react_1.useCallback)((sValue, v) => {
        superColor.setHsv({ sValue, v });
        handleChange(superColor);
    }, [handleChange, superColor]);
    return (react_1.default.createElement("div", { style: { width }, className: "color-picker" },
        react_1.default.createElement("div", { className: "saturation-container" },
            react_1.default.createElement(common_1.Saturation, { onChange: handleSaturationChange, h: hsv.h, sValue: hsv.sValue, v: hsv.v })),
        react_1.default.createElement("div", { className: "color-picker-body" },
            react_1.default.createElement("div", { className: "slide-controls flexbox-fix" },
                react_1.default.createElement("div", { className: "rendering-notice" },
                    react_1.default.createElement("div", { className: "swatch" },
                        react_1.default.createElement("div", { style: renderNotice, className: "render" }),
                        react_1.default.createElement(common_1.Checkboard, null))),
                react_1.default.createElement("div", { className: "toggles" },
                    react_1.default.createElement("div", { className: "hue" },
                        react_1.default.createElement(common_1.Hue, { color: superColor, onChange: handleChange })),
                    react_1.default.createElement("div", { className: "alpha" },
                        react_1.default.createElement(common_1.Alpha, { color: superColor, onChange: handleChange })))),
            react_1.default.createElement(ColorFields_1.ColorFields, { color: superColor, onChange: handleChange }))));
};
exports.ColorPickerInner = ColorPickerInner;
