import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

export const ToggleButtons = () => {
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'DFA', value: '1' },
        { name: 'RE', value: '2' },
    ];

    return (
        <ButtonGroup>
            {radios.map((radio, index) => (
                <ToggleButton
                    key={index}
                    id={`radio-${index}`}
                    type="radio"
                    variant={radioValue === radio.value ? 'outline-success' : 'outline-secondary'}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}
