import { Type_ColorText } from '@common/types/Type_ColorText';
import { DeviceType } from '@common/types/Type_Device';
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React from 'react'

const ColorTextSection = ({ section }: { section: Type_ColorText }) => {
    const { title, items } = section.fields;

    const getItem = (item, i) => {
        const desktop = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
        const mobile = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);
        return <>
            <div className='wp-container-desktop'>
                <div className='d-flex flex-row flex-wrap' style={{ lineHeight: mobile?.fields?.lineHeight }}>
                    <span className="text" style={{ color: desktop?.fields?.textColor, fontWeight: desktop?.fields?.fontWeight }}><RichTextRenderer text={item?.fields?.content} color={item?.fields?.textColor} /></span>
                    {i < items?.length - 1 && (
                        <span className="separater">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    )}
                </div>
            </div>
            <div className='wp-container-mobile'>
                <div className='d-flex flex-row flex-wrap' style={{ lineHeight: mobile?.fields?.lineHeight }}>
                    <span className="text" style={{ color: mobile?.fields?.textColor, fontWeight: mobile?.fields?.fontWeight }}><RichTextRenderer text={item?.fields?.content} color={item?.fields?.textColor} /></span>
                    {i < items?.length - 1 && (
                        <span className="separater">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    )}
                </div>
            </div>
        </>
    }

    return (
        <div className="container-color-text">
            <div className="d-flex flex-row justify-content-center title" >
                <RichTextRenderer text={title?.fields?.content} />
            </div>
            <div className='d-flex flex-row flex-wrap justify-content-center px-4' style={{ lineHeight: '14px' }}>
                {items.map((item, i) => (
                    <>{getItem(item, i)}</>
                ))}
            </div>
        </div>
    )
}

export default ColorTextSection