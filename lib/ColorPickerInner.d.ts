import React from 'react';
import { ColorPickerHandler } from './types';
import SuperColor from 'super-color';
interface ColorPickerInnerProps {
    defaultColor: SuperColor;
    onChange: ColorPickerHandler;
    width?: number;
}
export declare const ColorPickerInner: React.FC<ColorPickerInnerProps>;
export {};
