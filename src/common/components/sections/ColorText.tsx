import { Type_ColorText } from '@common/types/Type_ColorText';
import { DeviceType } from '@common/types/Type_Device';
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React from 'react'

const ColorTextSection = ({ section }: { section: Type_ColorText }) => {
    const { title, items } = section.fields;

    const getItem = (item, i) => {
        const mobile = item?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);
        return <>
            <span className="text" style={{ lineHeight: mobile?.fields?.lineHeight, color: mobile?.fields?.textColor, fontWeight: mobile?.fields?.fontWeight, margin: mobile?.fields?.margin, }}>{item?.fields?.content}
            </span>
            {i < items?.length - 1 && (
                <span className="separater">|</span>
            )}

        </>
    }

    return (
        <div className="container-color-text">
            <div className="d-flex flex-row justify-content-center title" >
                <RichTextRenderer text={title?.fields?.content} />
            </div>
            <div className="text-center" style={{ lineHeight: '32px' }}>
                {items.map((item, i) => (
                    <>{getItem(item, i)}</>
                ))}
            </div>
        </div>
    )
}

export default ColorTextSection