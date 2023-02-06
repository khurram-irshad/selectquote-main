import { Type_Divider } from '@common/types/Type_Divider'
import { Type_MultiSection } from '@common/types/Type_MultiSection';
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React from 'react'
import ColumnSection from './Column';

const MultiSection = ({ section }: { section: Type_MultiSection }) => {
    const { sections, title, backgroundImage, } = section.fields;
    return (
        <div>
            {title && (<>
                <div>
                    <RichTextRenderer text={title} />
                </div>
            </>)}
            {sections.map(section => (
                <>
                    <ColumnSection section={section} />
                </>
            ))}
        </ div>
    )
}

export default MultiSection