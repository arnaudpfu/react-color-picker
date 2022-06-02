import React from 'react';
import './Hue.scss';
import { ColorPickerHandler } from '../types';
import SuperColor from 'super-color';
export declare const computeHueValue: (e: any, container: Element | null) => number;
interface HueProps {
    color: SuperColor;
    onChange: ColorPickerHandler;
}
export declare const Hue: React.FC<HueProps>;
export {};
