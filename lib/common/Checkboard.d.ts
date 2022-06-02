import React from 'react';
export declare const render: (c1: string, c2: string, size: number) => string | null;
export declare const get: (c1: string, c2: string, size: number) => string | null;
interface CheckboardProps {
    white?: string;
    grey?: string;
    size?: number;
    children?: React.ReactNode;
}
export declare const Checkboard: React.FC<CheckboardProps>;
export {};
