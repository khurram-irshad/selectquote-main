import { Type_RocketLayerHeader } from '@common/types/Type_RocketLayerHeader'
import React from 'react'

const RocketLawyerHeader = ({ header }: { header: Type_RocketLayerHeader }) => {
  console.log(header)
  console.log(header?.fields?.appLogo?.fields?.imageFile?.fields?.file?.url)
  console.log(header?.fields?.rocketLawyerHeader?.fields.imageFile?.fields?.file?.url)
  
  return (
    <div>Rocket Lawyer Header</div>
  )
}

export default RocketLawyerHeader