import RichTextRenderer from '@components/rich-text/RichTextRenderer'
import React from 'react'
import _ from 'lodash';
import ColumnSection from './Column';
import { Type_MultiColumn, } from '@common/types';

const MultiColumnSection = ({ section }: { section: Type_MultiColumn }) => {
    const { title, columns, numberOfColumns,direction, fullWidth } = section.fields;

    return <section className='multi-column'>
        <div className={`d-flex flex-column ${fullWidth ? "container-fluid px-0" : "container wp-container"}`}
        >
            {
                section?.fields?.title
                && <RichTextRenderer text={title} />
            }

            <div className='column-container d-flex flex-wrap'>
                {
                    columns.map(item => <div key={item.sys.id} style={{ width: `${100 / Number(numberOfColumns)}%` }}>
                        <ColumnSection section={item} />
                    </div>)
                }
            </div>
        </div>
    </section>

}

export default MultiColumnSection

