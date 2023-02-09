import { Type_ColorText } from '@common/types/Type_ColorText';
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React from 'react'

const ColorTextSection = ({ section }: { section: Type_ColorText }) => {
    const { title, items } = section.fields;
    console.log(title)
    return (
        <div className="container-color-text">
            <div className="d-flex flex-row justify-content-center title" >
                <RichTextRenderer text={title?.fields?.content} />
            </div>
            <div className='d-flex flex-row flex-wrap justify-content-center px-4'>
                {items.map((item, i) => (
                    <div >
                        <div className='d-flex flex-row flex-wrap' style={{lineHeight:'1rem'}}>
                            <span className="text" style={{ color: item?.fields?.textColor, fontWeight: item?.fields?.fontWeight }}><RichTextRenderer text={item?.fields?.content} color={item?.fields?.textColor} /></span>
                            {i < items?.length - 1 && (
                                <span className="separater">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ColorTextSection