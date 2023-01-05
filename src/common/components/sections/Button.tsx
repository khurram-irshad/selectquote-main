import { Type_Button } from '@common/types/Type_Button'
import React from 'react'

const ButtonSection = ({ section }: { section: Type_Button }) => {
    const { title, backgroundColor, linkUrl, textColor } = section.fields;
    return (
        <a className="action-btn" style={{ color: textColor, backgroundColor: backgroundColor }} href={linkUrl}>
            {title}
        </a>
    )
}

export default ButtonSection