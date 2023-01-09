import { Type_PartnershipForm } from '@common/types/Type_PartnershipForm'
import RichTextRenderer from '@components/rich-text/RichTextRenderer';
import React from 'react'

const PartnershipFormSection = ({ section }: { section: Type_PartnershipForm }) => {
  const { title } = section.fields;

  return (
    <div><RichTextRenderer text={title} />
      <h1>
        Form would go here...
      </h1>
    </div>
  )
}

export default PartnershipFormSection