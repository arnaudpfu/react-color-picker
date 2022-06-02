"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swatch = exports.handleFocus = void 0;
const react_1 = __importDefault(require("react"));
const Checkboard_1 = require("./Checkboard");
const handleFocus = (Component) => class Focus extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = { focus: false };
        this.handleFocus = () => this.setState({ focus: true });
        this.handleBlur = () => this.setState({ focus: false });
    }
    render() {
        return (react_1.default.createElement("span", { onFocus: this.handleFocus, onBlur: this.handleBlur },
            react_1.default.createElement(Component, Object.assign({}, this.props, this.state))));
    }
};
exports.handleFocus = handleFocus;
const ENTER = 13;
const Swatch = ({ color, style, onClick = () => { }, onHover, title = color, children, focus, focusStyle = {}, }) => {
    const transparent = color === 'transparent';
    const stylesSwatch = Object.assign(Object.assign({ background: color, height: '100%', width: '100%', cursor: 'pointer', position: 'relative', outline: 'none' }, style), (focus ? focusStyle : {}));
    const handleClick = (e) => onClick(color || '', e);
    const handleKeyDown = (e) => e.keyCode === ENTER && onClick(color || '', e);
    const optionalEvents = {};
    if (onHover) {
        optionalEvents.onMouseOver = (e) => onHover(color || '', e);
    }
    return (react_1.default.createElement("div", Object.assign({ style: stylesSwatch, onClick: handleClick, title: title, tabIndex: 0, onKeyDown: handleKeyDown }, optionalEvents),
        children,
        transparent && react_1.default.createElement(Checkboard_1.Checkboard, null)));
};
exports.Swatch = Swatch;
exports.default = (0, exports.handleFocus)(exports.Swatch);
