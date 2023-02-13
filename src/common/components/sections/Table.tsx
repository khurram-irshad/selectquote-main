import { DeviceType } from '@common/types/Type_Device';
import { Type_Table } from '@common/types/Type_Table';
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React from 'react'

type TextAlign = 'center';

const TableSection = ({ section }: { section: Type_Table }) => {
    const { rows, devices } = section.fields;
    const header = rows.find(x => x.fields.header);
    const body = rows.filter(x => !x.fields.header);
    const desktop = devices?.find(item => item.fields?.type === DeviceType.Desktop);
    const mobile = devices?.find(item => item.fields?.type === DeviceType.Mobile);

    return (
        <>
            <div className="wp-container-desktop w-full" style={{ padding: desktop?.fields?.padding, margin: desktop?.fields?.margin }}>
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
            </div>
            <div className="wp-container-mobile w-full" style={{ padding: mobile?.fields?.padding, margin: mobile?.fields?.margin }}>
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
            </div>

        </ >
    )
}

export default TableSection