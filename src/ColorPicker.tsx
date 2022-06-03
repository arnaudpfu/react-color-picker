import React from 'react';
import { ColorPickerHandler } from './types';
import { ColorPickerInner } from './ColorPickerInner';
import SuperColor from 'super-color'

interface ColorPickerProps {
    defaultColor: string;
    onChange: ColorPickerHandler;
    width?: number;
}

interface ColorPickerState {
    superColor: SuperColor;
}

export class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
    shouldComponentUpdate(): boolean {
        return false;
    }

    render(): React.ReactNode {
        return (
            <ColorPickerInner
                defaultColor={new SuperColor(this.props.defaultColor)}
                onChange={this.props.onChange}
                width={this.props.width}
            />
        );
    }
}
