import { Type_Table } from '@common/types/Type_Table';
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React from 'react'

type TextAlign = 'center';

const TableSection = ({ section }: { section: Type_Table }) => {
    const { rows } = section.fields;
    const header = rows.find(x => x.fields.header);
    const body = rows.filter(x => !x.fields.header);
    return (
        <>
            <table>
                {header && (<>
                    <tr style={{ backgroundColor: header.fields.backgroundColor }}>
                        {header?.fields?.columns?.map(item => (
                            <th style={{ textAlign: item.fields.textAlign as TextAlign }}>{<RichTextRenderer text={item?.fields?.content} />}</th>
                        ))}
                    </tr>
                </>)}
                {body && (<>
                    {body.map(row => (
                        <>
                            <tr style={{ backgroundColor: row.fields.backgroundColor }}>
                                {row?.fields?.columns?.map(item => (
                                    <td style={{ textAlign: item.fields.textAlign as TextAlign }}>{<RichTextRenderer text={item?.fields?.content} />}</td>
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