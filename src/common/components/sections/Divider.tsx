import { Type_Divider } from '@common/types/Type_Divider'
import React from 'react'

const DividerSection = ({ section }: { section: Type_Divider }) => {
    const { margin, thickBorder, color = '#646464', height = '14px' } = section.fields;
    return (
        <>
            {!thickBorder && (
                <hr style={{ margin: margin }} />
            )}
            {thickBorder && (
                <div style={{ margin: margin, borderBottom: `${height} solid ${color}` }} />
            )}

        </ >
    )
}

export default DividerSection