import { Type_Style } from '@common/types/Type_Style'
import React from 'react'

const StyleSection = ({ section }: { section: Type_Style }) => {
    const { margin } = section.fields;
    return (
        <div style={{ margin: margin }}></div>
    )
}

export default StyleSection