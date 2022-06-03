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
exports.ColorValueInput = void 0;
const react_1 = __importStar(require("react"));
const getNumberValue = (value) => {
    let number;
    if (value.indexOf('%') !== -1) {
        number = Number((parseFloat(value.replace('%', '')) * 0.01).toFixed(2));
    }
    else {
        number = parseFloat(value);
    }
    return number;
};
let idCounter = 1;
class ColorValueInput extends (react_1.PureComponent || react_1.Component) {
    constructor(props) {
        super(props);
        this.handleChange = (e) => {
            const inputValue = e.target.value;
            this.shape.test(inputValue) && this.setUpdatedValue(inputValue);
        };
        this.handleKeyDown = (e) => {
            if (!this.decimalValue) {
                return;
            }
            const value = getNumberValue(e.target.value);
            if (!isNaN(value)) {
                const afterComma = this.isPercentage ? 2 : this.afterComma;
                const offset = 10 ** -afterComma;
                let delta = 0;
                switch (e.key) {
                    case 'ArrowUp':
                        delta = 1;
                        break;
                    case 'ArrowDown':
                        delta = -1;
                        break;
                }
                const updatedValue = Number((value + delta * offset).toFixed(afterComma));
                delta !== 0 && this.setUpdatedValue(updatedValue.toString());
            }
        };
        this.handleWheel = (e) => {
            if (!this.decimalValue) {
                return;
            }
            const value = getNumberValue(e.target.value);
            if (!isNaN(value)) {
                const afterComma = this.isPercentage ? 2 : this.afterComma;
                const offset = 10 ** -afterComma;
                const delta = e.deltaY < 0 ? -1 : 1;
                const updatedValue = Number((value + delta * offset).toFixed(afterComma));
                e.deltaY !== 0 && this.setUpdatedValue(updatedValue.toString());
            }
        };
        this.state = {
            value: String(props.value).toUpperCase(),
        };
        this.decimalValue = props.decimalValue !== undefined ? props.decimalValue : true;
        this.afterComma = props.afterComma !== undefined ? props.afterComma : 0;
        this.shape = props.shape !== undefined ? props.shape : /^\d*$/;
        this.isPercentage = props.isPercentage !== undefined ? props.isPercentage : false;
        this.max = props.max !== undefined ? props.max : 1;
        this.min = 0;
        this.input = null;
        this.inputId = `rc-editable-input-${idCounter++}`;
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.value !== this.state.value &&
            (prevProps.value !== this.props.value || prevState.value !== this.state.value)) {
            if (this.input !== document.activeElement) {
                this.setState({
                    value: String(this.props.value).toUpperCase(),
                });
            }
        }
    }
    checkNumberRange(value) {
        let n = value;
        if (value > this.max) {
            n = this.max;
        }
        else if (value < this.min) {
            n = this.min;
        }
        return n;
    }
    getValueObjectWithLabel(value) {
        return {
            [this.props.slug]: value,
        };
    }
    setUpdatedValue(value) {
        let colorValue = value;
        if (this.decimalValue && !/\.$/.test(value) && value !== '') {
            colorValue = this.checkNumberRange(getNumberValue(value));
        }
        const onChangeValue = this.getValueObjectWithLabel(colorValue);
        this.props.onChange(onChangeValue);
        this.setState({
            value: this.isPercentage
                ? Math.round(colorValue * 100).toString() + '%'
                : colorValue,
        });
    }
    render() {
        return (react_1.default.createElement("div", { className: "color-picker-editable-input" },
            react_1.default.createElement("input", { id: this.inputId, ref: (input) => (this.input = input), value: this.state.value, onKeyDown: this.handleKeyDown, onChange: this.handleChange, onWheel: this.handleWheel, spellCheck: "false", autoComplete: "off", type: "text" }),
            react_1.default.createElement("label", { htmlFor: this.inputId }, this.props.label)));
    }
}
exports.ColorValueInput = ColorValueInput;
