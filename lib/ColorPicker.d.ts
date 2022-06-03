import React from 'react';
import { ColorPickerHandler } from './types';
import SuperColor from 'super-color';
interface ColorPickerProps {
    defaultColor: string;
    onChange: ColorPickerHandler;
    width?: number;
}
interface ColorPickerState {
    superColor: SuperColor;
}
export declare class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
    shouldComponentUpdate(): boolean;
    render(): React.ReactNode;
}
export {};
