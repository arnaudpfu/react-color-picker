/// <reference types="react" />
import SuperColor from "super-color";
export declare type ColorPickerHandler = (color: SuperColor) => void;
export interface StyleCSSProperties {
    [cssClass: string]: React.CSSProperties;
}
