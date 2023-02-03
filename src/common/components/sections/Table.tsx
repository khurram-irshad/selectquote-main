import { Type_Table } from '@common/types/Type_Table';
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React from 'react'

const TableSection = ({ section }: { section: Type_Table }) => {
    const { rows } = section.fields;
    const header = rows.find(x => x.fields.header);
    const body = rows.filter(x => !x.fields.header);
    return (
        <>
            <table>
                {header && (<>
                    <tr>
                        {header?.fields?.columns?.map(item => (
                            <th style={{ textAlign: `left` }}>{<RichTextRenderer text={item?.fields?.content} />}</th>
                        ))}
                    </tr>
                </>)}
                {body && (<>
                    {body.map(row => (
                        <>
                            <tr style={{ backgroundColor: row.fields.backgroundColor }}>
                                {row?.fields?.columns?.map(item => (
                                    <td >{<RichTextRenderer text={item?.fields?.content} />}</td>
                                ))}
                            </tr>
                        </>
                    ))}
                </>)}
            </table>
        </ >
    )
}

export default TableSection