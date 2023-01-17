import { Type_Gallery } from '@common/types'
import React from 'react'

const GallerySection = ({ section }: { section: Type_Gallery }) => {
  const { images } = section.fields;
  return (
    <div>
      <div className="d-flex flex-row">
        {images.map(image => (
          <img width={100} height={100} src={image.fields?.imageFile?.fields?.file?.url} />
        ))}
      </div>
    </div>
  )
}

export default GallerySection