import { Type_Margin } from '@common/types/Type_Margin'
import React from 'react'

const MarginSection = ({ section }: { section: Type_Margin }) => {
    const { top } = section.fields;
    return (
        <div style={{ marginTop: top }}></div>
    )
}

export default MarginSection