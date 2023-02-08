import { Type_Divider } from '@common/types/Type_Divider'
import React from 'react'

const DividerSection = ({ section }: { section: Type_Divider }) => {
    const { margin, thickBorder } = section.fields;
    return (
        <>
            {!thickBorder && (
                <hr style={{ margin: margin }} />
            )}
            {thickBorder && (
                <div style={{ margin: margin, borderBottom: '14px solid #646464' }} />
            )}

        </ >
    )
}

export default DividerSection