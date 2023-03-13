import { Type_TrustPilot } from '@common/types/Type_TrustPilot'
import React from 'react'
import SectionTrustPilot from './TrustPilot'

export const RocketLawyerSection = () => {
    const section = { fields: { type: "Carousel" } } as Type_TrustPilot;

    return (
        <div>
            <h1>----------------------Rocket Lawyer Section--------------------</h1>
            <SectionTrustPilot section={section} />
        </div>
    )
}
