import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import useGlobalContext from '../hooks/useGlobalContext';

export const ToggleButtons = () => {
    const { mode, setMode, setPath, setVocabularyTemp } = useGlobalContext();

    const radios = [
        { name: 'DFA', value: 'DFA' },
        { name: 'RE', value: 'RE' },
    ];

    return (
        <ButtonGroup>
            {radios.map((radio, index) => (
                <ToggleButton
                    key={index}
                    id={`radio-${index}`}
                    type="radio"
                    variant={mode === radio.value ? 'outline-success' : 'outline-secondary'}
                    name="radio"
                    value={radio.value}
                    checked={mode === radio.value}
                    onChange={(e) => {
                        setMode(e.currentTarget.value)
                        setVocabularyTemp('');
                        setPath('');
                    }}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}
