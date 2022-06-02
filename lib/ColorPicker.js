"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPicker = void 0;
const react_1 = __importDefault(require("react"));
require("./ColorPicker.scss");
const ColorPickerInner_1 = require("./ColorPickerInner");
const super_color_1 = __importDefault(require("super-color"));
class ColorPicker extends react_1.default.Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (react_1.default.createElement(ColorPickerInner_1.ColorPickerInner, { defaultColor: new super_color_1.default(this.props.defaultColor), onChange: this.props.onChange, width: this.props.width }));
    }
}
exports.ColorPicker = ColorPicker;
