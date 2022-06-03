import React from 'react';
import { SuperHexColor } from 'super-color';
interface ColorValueInputProps {
    label: string;
    slug: string;
    value: string;
    onChange: (value: {
        [type: string]: SuperHexColor | string | number;
    }) => void;
    decimalValue?: boolean;
    max?: number;
    afterComma?: number;
    shape?: RegExp;
    isPercentage?: boolean;
}
interface ColorValueInputState {
    value: SuperHexColor | string | number;
}
declare const ColorValueInput_base: typeof React.PureComponent;
export declare class ColorValueInput extends ColorValueInput_base<ColorValueInputProps, ColorValueInputState> {
    private readonly inputId;
    private input;
    private readonly decimalValue;
    private readonly max;
    private readonly min;
    private readonly afterComma;
    private readonly shape;
    private readonly isPercentage;
    constructor(props: ColorValueInputProps);
    componentDidUpdate(prevProps: ColorValueInputProps, prevState: ColorValueInputState): void;
    checkNumberRange(value: number): number;
    getValueObjectWithLabel(value: SuperHexColor | string | number): {
        [x: string]: string | number;
    };
    setUpdatedValue(value: string): void;
    handleChange: (e: React.FormEvent) => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    handleWheel: (e: React.WheelEvent) => void;
    render(): JSX.Element;
}
export {};
