import { Type_Button } from '@common/types/Type_Button'
import { DeviceType } from '@common/types/Type_Device';
import React from 'react'

const ButtonSection = ({ section }: { section: Type_Button }) => {
    const { title, devices, linkUrl, rounded = true } = section.fields;
    const desktop = devices?.find(item => item.fields.type === DeviceType.Desktop);
    const mobile = devices?.find(item => item.fields.type === DeviceType.Mobile);
    return (
        <div className='button-container' style={{ margin: desktop?.fields?.margin }}>
            <a className={`action-btn ${rounded ? 'btn-border' : ''}`} style={{ color: desktop?.fields?.textColor, backgroundColor: desktop?.fields?.backgroundColor }} href={linkUrl}>
                {title}
            </a>
        </div>
    )
}

export default ButtonSection