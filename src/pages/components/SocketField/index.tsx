import React, { useState, useEffect } from 'react'

import { Container } from './styles'

interface FieldProps {
    label?: string,
    value: string,
    newValue?: string
}

const SocketField = ({ label, value, newValue = '' }: FieldProps) => {
    const [currentValue, setCurrentValue] = useState<string>(value)

    const updateValue = (val: string) => {
        setCurrentValue(val)
    }

    useEffect(() => {
        if(newValue !== '') {
            updateValue(newValue)
        }
    }, [newValue])
    
    return (
        <Container>
            <h1>{currentValue}</h1>
        </Container>
    )
}

export default SocketField
