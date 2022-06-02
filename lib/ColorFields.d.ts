import React from 'react';
import './ColorFields.scss';
import { ColorPickerHandler } from './types';
import SuperColor from 'super-color';
interface ColorFieldsProps {
    color: SuperColor;
    onChange: ColorPickerHandler;
}
export declare const ColorFields: React.FC<ColorFieldsProps>;
export {};
