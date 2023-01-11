import { Type_Tabs } from '@common/types/Type_Tabs'
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React, { useEffect, useState } from 'react'

const TabsSection = ({ section }: { section: Type_Tabs }) => {
    const { items } = section.fields;
    const [selectedTab, setselectedTab] = useState<any>(items[0])
    const handleClick = (index: number) => {
        const data = items[index]
        setselectedTab(data)
    }
    
    return (
        <>
            <table id="tab">
                <tbody>
                    <tr>
                        {/* <td onClick={() => handleClick("10")} className="active" data-year="10">10 Years</td> */}
                        {items.map((value, index) => (
                            <td onClick={() => handleClick(index)} data-year="30">{value.fields.header}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <div>
                {selectedTab.fields.title}
            </div>
            <RichTextRenderer text={selectedTab.fields.content.fields.content} />
        </>
    )
}

export default TabsSection