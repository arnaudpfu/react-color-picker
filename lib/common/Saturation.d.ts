import React from 'react';
interface SaturationProps {
    h: number;
    sValue: number;
    v: number;
    onChange: (sValue: number, v: number) => void;
}
export declare const Saturation: React.FC<SaturationProps>;
export {};
