# React Color Picker
Simple and customizable color picker.

## Installation

```
npm i @arnaudpfu/react-color-picker
```

```
pnpm add @arnaudpfu/react-color-picker
```

## Examples

```tsx
import React, { useCallback } from 'react';
import ColorPicker, { ColorPickerHandler, SuperColor } from '@arnaudpfu/react-color-picker';
import { PortalFieldContainer } from './PortalFieldContainer';

interface Props {
    value: string;
    onChange: (color: string) => void;
}

export const ColorPickerContainer: React.FC<Props> = ({
    onChange,
    value,
    closeColorPicker,
    parent,
}) => {
    const updateColorOnChange: ColorPickerHandler = useCallback(
        (color: SuperColor): void => {
            onChange(color.toString());
        },
        [onChange]
    );

    return (
        <ColorPicker defaultColor={value} onChange={updateColorOnChange} />
    );
};
```

## License

[GPL](https://www.gnu.org/licenses/gpl-3.0.html) licensed.

