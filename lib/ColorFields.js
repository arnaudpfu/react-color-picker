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
exports.ColorFields = void 0;
const react_1 = __importStar(require("react"));
require("./ColorFields.scss");
const cg_1 = require("react-icons/cg");
const common_1 = require("./common");
const ColorFields = ({ color, onChange }) => {
    const format = color.getFormat();
    const hex = color.toHex();
    const rgb = color.toRgba();
    const hsl = color.toHsla();
    const hsv = color.toHsva();
    const toggleFormat = (0, react_1.useCallback)(() => {
        switch (format) {
            case 'hex':
                color.setFormat('rgb');
                break;
            case 'rgb':
                color.setFormat('hsl');
                break;
            case 'hsl':
                color.setFormat('hsv');
                break;
            default:
                color.setFormat('hex');
                break;
        }
        onChange(color);
    }, [color, format, onChange]);
    const handleChange = (data) => {
        const key = Object.keys(data)[0];
        const value = data[key];
        switch (key) {
            case 'hex':
                if (/^#(([\dA-Fa-f]{3}){1,2}|([\dA-Fa-f]{4}){1,2})$/.test(value)) {
                    color.setHex(value);
                }
                break;
            case 'a':
                const alphaString = typeof value === 'string' ? value : value.toString();
                if (/^\d+(\.\d+)?$/.test(alphaString)) {
                    color.setAlpha(value);
                }
                break;
            case 'r':
                color.setRgb({ r: value });
                break;
            case 'g':
                color.setRgb({ g: value });
                break;
            case 'b':
                color.setRgb({ b: value });
                break;
            case 'h':
                color.setHsl({ h: value });
                break;
            case 'sLightness':
                color.setHsl({ sLightness: value });
                break;
            case 'l':
                color.setHsl({ l: value });
                break;
            case 'sValue':
                color.setHsv({ sValue: value });
                break;
            case 'v':
                color.setHsv({ v: value });
                break;
        }
        onChange(color);
    };
    let fields;
    switch (format) {
        case 'rgb':
            fields = (react_1.default.createElement("div", { className: "color-picker-fields", key: "rgb" },
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "r", slug: "r", value: rgb.r.toString(), onChange: handleChange, max: 255 })),
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "g", slug: "g", value: rgb.g.toString(), onChange: handleChange, max: 255 })),
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "b", slug: "b", value: rgb.b.toString(), onChange: handleChange, max: 255 })),
                react_1.default.createElement("div", { className: "alpha-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "a", slug: "a", afterComma: 2, value: rgb.a.toString(), onChange: handleChange, max: 1, shape: /^\d*\.?\d*$/ }))));
            break;
        case 'hsl':
            fields = (react_1.default.createElement("div", { className: "color-picker-fields", key: "hsl" },
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "h", slug: "h", value: Math.round(hsl.h).toString(), onChange: handleChange, max: 359 })),
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "s", slug: "sLightness", value: `${Math.round(hsl.sLightness * 100)}%`, onChange: handleChange, shape: /^\d+%$/, isPercentage: true, max: 1 })),
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "l", slug: "l", value: `${Math.round(hsl.l * 100)}%`, onChange: handleChange, shape: /^\d+%$/, isPercentage: true, max: 1 })),
                react_1.default.createElement("div", { className: "alpha-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "a", slug: "a", afterComma: 2, value: hsl.a.toString(), onChange: handleChange, max: 1, shape: /^\d*\.?\d*$/ }))));
            break;
        case 'hsv':
            fields = (react_1.default.createElement("div", { className: "color-picker-fields", key: "hsv" },
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "h", slug: "h", value: Math.round(hsv.h).toString(), onChange: handleChange, max: 359 })),
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "s", slug: "sValue", value: `${Math.round(hsv.sValue * 100)}%`, onChange: handleChange, shape: /^\d+%$/, isPercentage: true, max: 1 })),
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "v", slug: "v", value: `${Math.round(hsv.v * 100)}%`, onChange: handleChange, shape: /^\d+%$/, isPercentage: true, max: 1 })),
                react_1.default.createElement("div", { className: "alpha-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "a", slug: "a", afterComma: 2, value: hsv.a.toString(), onChange: handleChange, max: 1, shape: /^\d*\.?\d*$/ }))));
            break;
        default:
            fields = (react_1.default.createElement("div", { className: "color-picker-fields", key: "hex" },
                react_1.default.createElement("div", { className: "color-picker-field" },
                    react_1.default.createElement(common_1.ColorValueInput, { label: "hex", slug: "hex", value: hex, onChange: handleChange, decimalValue: false, shape: /^(#([\dA-Fa-f]{0,8}))$/ }))));
            break;
    }
    return (react_1.default.createElement("div", { className: "color-picker-fields-container" },
        fields,
        react_1.default.createElement("div", { className: "toggle-button" },
            react_1.default.createElement("div", { className: "toggle-icon-container", onClick: toggleFormat },
                react_1.default.createElement(cg_1.CgArrowsExchangeAltV, { className: "toggle-icon" })))));
};
exports.ColorFields = ColorFields;
