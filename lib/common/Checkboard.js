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
exports.Checkboard = exports.get = exports.render = void 0;
const react_1 = __importStar(require("react"));
const checkboardCache = {};
const render = (c1, c2, size) => {
    if (typeof document === 'undefined') {
        return null;
    }
    const canvas = document.createElement('canvas');
    canvas.width = size * 2;
    canvas.height = size * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return null;
    } // If no context can be found, return early.
    ctx.fillStyle = c1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = c2;
    ctx.fillRect(0, 0, size, size);
    ctx.translate(size, size);
    ctx.fillRect(0, 0, size, size);
    return canvas.toDataURL();
};
exports.render = render;
const get = (c1, c2, size) => {
    const key = `${c1}-${c2}-${size}`;
    if (checkboardCache[key]) {
        return checkboardCache[key];
    }
    const checkboard = (0, exports.render)(c1, c2, size);
    checkboardCache[key] = checkboard;
    return checkboard;
};
exports.get = get;
const Checkboard = ({ white, grey, size, children }) => {
    const gridStyle = {
        position: 'absolute',
        inset: 0,
        background: `url(${(0, exports.get)(white, grey, size)}) center left`,
    };
    return (0, react_1.isValidElement)(children) ? (react_1.default.cloneElement(children, Object.assign(Object.assign({}, children.props), { style: gridStyle }))) : (react_1.default.createElement("div", { style: gridStyle }));
};
exports.Checkboard = Checkboard;
exports.Checkboard.defaultProps = {
    size: 8,
    white: 'transparent',
    grey: 'rgba(0,0,0,.08)',
};
