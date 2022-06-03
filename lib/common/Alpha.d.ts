import React from 'react';
import { ColorPickerHandler } from '../types';
import SuperColor from 'super-color';
export declare const computeAlphaValue: (e: any, container: Element | null) => number;
interface AlphaProps {
    color: SuperColor;
    onChange: ColorPickerHandler;
}
export declare const Alpha: React.FC<AlphaProps>;
export {};
