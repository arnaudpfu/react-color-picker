import React, { useCallback } from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { ColorValueInput } from './common';
import { ColorPickerHandler } from './types';
import SuperColor, { SuperHexColor } from 'super-color';

interface ColorFieldsProps {
    color: SuperColor;
    onChange: ColorPickerHandler;
}

export const ColorFields: React.FC<ColorFieldsProps> = ({ color, onChange }) => {
    const format = color.getFormat();
    const hex = color.toHex();
    const rgb = color.toRgba();
    const hsl = color.toHsla();
    const hsv = color.toHsva();

    const toggleFormat = useCallback(() => {
        switch (format) {
            case 'hex':
                color.setFormat('rgb');
                break;
            case 'rgb':
                color.setFormat('hsl');
                break;
            case 'hsl':
                color.setFormat('hsv');
                break;
            default:
                color.setFormat('hex');
                break;
        }

        onChange(color);
    }, [color, format, onChange]);

    const handleChange = (data: { [type: string]: SuperHexColor | string | number }) => {
        const key = Object.keys(data)[0];
        const value = data[key];
        switch (key) {
            case 'hex':
                if (
                    /^#(([\dA-Fa-f]{3}){1,2}|([\dA-Fa-f]{4}){1,2})$/.test(
                        value as SuperHexColor
                    )
                ) {
                    color.setHex(value as SuperHexColor);
                }
                break;
            case 'a':
                const alphaString: string =
                    typeof value === 'string' ? value : value.toString();
                if (/^\d+(\.\d+)?$/.test(alphaString)) {
                    color.setAlpha(value as number);
                }
                break;
            case 'r':
                color.setRgb({ r: value as number });
                break;
            case 'g':
                color.setRgb({ g: value as number });
                break;
            case 'b':
                color.setRgb({ b: value as number });
                break;
            case 'h':
                color.setHsl({ h: value as number });
                break;
            case 'sLightness':
                color.setHsl({ sLightness: value as number });
                break;
            case 'l':
                color.setHsl({ l: value as number });
                break;
            case 'sValue':
                color.setHsv({ sValue: value as number });
                break;
            case 'v':
                color.setHsv({ v: value as number });
                break;
        }
        onChange(color);
    };

    let fields: React.ReactNode;
    switch (format) {
        case 'rgb':
            fields = (
                <div className="color-picker-fields" key="rgb">
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="r"
                            slug="r"
                            value={rgb.r.toString()}
                            onChange={handleChange}
                            max={255}
                        />
                    </div>
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="g"
                            slug="g"
                            value={rgb.g.toString()}
                            onChange={handleChange}
                            max={255}
                        />
                    </div>
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="b"
                            slug="b"
                            value={rgb.b.toString()}
                            onChange={handleChange}
                            max={255}
                        />
                    </div>
                    <div className="alpha-field">
                        <ColorValueInput
                            label="a"
                            slug="a"
                            afterComma={2}
                            value={rgb.a.toString()}
                            onChange={handleChange}
                            max={1}
                            shape={/^\d*\.?\d*$/}
                        />
                    </div>
                </div>
            );
            break;
        case 'hsl':
            fields = (
                <div className="color-picker-fields" key="hsl">
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="h"
                            slug="h"
                            value={Math.round(hsl.h).toString()}
                            onChange={handleChange}
                            max={359}
                        />
                    </div>
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="s"
                            slug="sLightness"
                            value={`${Math.round(hsl.sLightness * 100)}%`}
                            onChange={handleChange}
                            shape={/^\d+%$/}
                            isPercentage={true}
                            max={1}
                        />
                    </div>
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="l"
                            slug="l"
                            value={`${Math.round(hsl.l * 100)}%`}
                            onChange={handleChange}
                            shape={/^\d+%$/}
                            isPercentage={true}
                            max={1}
                        />
                    </div>
                    <div className="alpha-field">
                        <ColorValueInput
                            label="a"
                            slug="a"
                            afterComma={2}
                            value={hsl.a.toString()}
                            onChange={handleChange}
                            max={1}
                            shape={/^\d*\.?\d*$/}
                        />
                    </div>
                </div>
            );
            break;
        case 'hsv':
            fields = (
                <div className="color-picker-fields" key="hsv">
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="h"
                            slug="h"
                            value={Math.round(hsv.h).toString()}
                            onChange={handleChange}
                            max={359}
                        />
                    </div>
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="s"
                            slug="sValue"
                            value={`${Math.round(hsv.sValue * 100)}%`}
                            onChange={handleChange}
                            shape={/^\d+%$/}
                            isPercentage={true}
                            max={1}
                        />
                    </div>
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="v"
                            slug="v"
                            value={`${Math.round(hsv.v * 100)}%`}
                            onChange={handleChange}
                            shape={/^\d+%$/}
                            isPercentage={true}
                            max={1}
                        />
                    </div>
                    <div className="alpha-field">
                        <ColorValueInput
                            label="a"
                            slug="a"
                            afterComma={2}
                            value={hsv.a.toString()}
                            onChange={handleChange}
                            max={1}
                            shape={/^\d*\.?\d*$/}
                        />
                    </div>
                </div>
            );
            break;
        default:
            fields = (
                <div className="color-picker-fields" key="hex">
                    <div className="color-picker-field">
                        <ColorValueInput
                            label="hex"
                            slug="hex"
                            value={hex}
                            onChange={handleChange}
                            decimalValue={false}
                            shape={/^(#([\dA-Fa-f]{0,8}))$/}
                        />
                    </div>
                </div>
            );
            break;
    }

    return (
        <div className="color-picker-fields-container">
            {fields}
            <div className="toggle-button">
                <div className="toggle-icon-container" onClick={toggleFormat}>
                    <CgArrowsExchangeAltV className="toggle-icon" />
                </div>
            </div>
        </div>
    );
};
