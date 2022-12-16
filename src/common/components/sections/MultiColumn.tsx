import RichTextRenderer from '@components/rich-text/RichTextRenderer'
import React from 'react'
import _ from 'lodash';
import ColumnSection from './Column';
import { Type_MultiColumn, } from '@common/types';

const MultiColumnSection = ({ section }: { section: Type_MultiColumn }) => {
    const { title, columns, direction, columnPerRow, fullWidth } = section.fields;

    return <section className='multi-column'>
        <div className={`d-flex flex-column ${fullWidth ? "container-fluid px-0" : "container wp-container"}`}
        >
            {
                section?.fields?.title
                && <RichTextRenderer text={title} />
            }

            <div className=' d-flex flex-wrap'>
                {
                    columns.map(item => <div key={item.sys.id} style={{ width: `${item.sys.contentType?.sys.id === "templateMultiColumn" ? 100 / Number(columnPerRow) : item.fields.widthPercentage}%` }}>
                        <div key={section.sys.id}>
                            {item.sys.contentType?.sys.id === "templateMultiColumn" ? (
                                <MultiColumnSection section={item} />
                            ) : (
                                <div >
                                    <ColumnSection section={item} />
                                </div>
                            )}
                        </div>
                    </div>)
                }
            </div>
        </div>
    </section>

}

export default MultiColumnSection

