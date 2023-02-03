import { Type_Table } from '@common/types/Type_Table';
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React from 'react'

const TableSection = ({ section }: { section: Type_Table }) => {
    const { rows } = section.fields;
    const header = rows.find(x => x.fields.header);
    const body = rows.find(x => !x.fields.header);
    return (
        <>
            <table>
                {header && (<>
                    <tr>
                        {header?.fields?.columns?.map(item => (
                            <th>{<RichTextRenderer color="#646464" text={item?.fields?.content} />}</th>
                        ))}
                    </tr>
                </>)}
                {body && (<>
                    <tr>
                        {body?.fields?.columns?.map(item => (
                            <td >{<RichTextRenderer color="#646464" text={item?.fields?.content} />}</td>
                        ))}
                    </tr>
                </>)}
            </table>
        </ >
    )
}

export default TableSection