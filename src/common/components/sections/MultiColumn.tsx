import RichTextRenderer from '@components/rich-text/RichTextRenderer'
import React from 'react'
import _ from 'lodash';
import ColumnSection from './Column';
import { Type_MultiColumn, } from '@common/types';
import { ComponentContentTypes } from '@common/constants/app.constant';

const MultiColumnSection = ({ section }: { section: Type_MultiColumn }) => {
    const { title, columns, direction, justifyContent, columnPerRow, fullWidth, padding, backgroundColor } = section.fields;
    return <section className='multi-column'>
        <div className={`d-flex flex-column ${fullWidth ? "container-fluid px-0" : "container wp-container"} `} style={{ justifyContent: `${justifyContent}`, backgroundColor: `${backgroundColor}` }}
        >
            {
                section?.fields?.title
                && <div style={{marginBottom:'20px'}}><RichTextRenderer text={title} /></div>
            }

            <div className={`d-flex flex-wrap ${direction == "Horizontal" ? "flex-row" : 'flex-column'} `}>
                {
                    columns.map(item => <div key={item.sys.id} className={`d-flex`} style={{ padding: `${padding}`, justifyContent: `${justifyContent}`, width: `${item.sys.contentType?.sys.id === ComponentContentTypes.MultiColumn ? 100 / Number(columnPerRow) : item.fields.widthPercentage}%` }}>
                        <div key={section.sys.id}>
                            {item.sys.contentType?.sys.id === ComponentContentTypes.MultiColumn ? (
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

