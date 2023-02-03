import { Type_Divider } from '@common/types/Type_Divider'
import React from 'react'

const DividerSection = ({ section }: { section: Type_Divider }) => {
    const { horizontal, vertical, margin } = section.fields;
    return (
        <>
            {horizontal && (<hr style={{ margin: margin }} />)}
            {vertical && (<div className="verticalLine" ></div>)}
        </ >
    )
}

export default DividerSection