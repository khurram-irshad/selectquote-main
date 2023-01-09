import { Type_Tabs } from '@common/types/Type_Tabs'
import React from 'react'

const TabsSection = ({ section }: { section: Type_Tabs }) => {
    const { items } = section.fields;

    return (
        <div>********************************** Tab section here **********************************</div>
    )
}

export default TabsSection