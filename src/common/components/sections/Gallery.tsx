import { Type_Gallery } from '@common/types'
import React, { useCallback, useState } from 'react'
import ImageViewer from 'react-simple-image-viewer';


const GallerySection = ({ section }: { section: Type_Gallery }) => {
  const { images } = section.fields;

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  function imageArray(arr) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i].fields?.imageFile?.fields?.file?.url;
        let imageName= arr[i].fields?.imageFile?.fields?.file?.fileName;
        newArray.push(value);
    }
    return newArray;
  }
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <div>
      <div className="d-flex flex-row">
        <div className="gallery d-flex">
          <div></div>
          {images.map((src, index) => (
            <img
              src={ src.fields?.imageFile?.fields?.file?.url }
              onClick={ () => openImageViewer(index) }
              width="250"
              key={ index }
              style={{ margin: '30px' }}
            />
          ))}
          {isViewerOpen && (
            <ImageViewer
              src={ imageArray(images)}
              currentIndex={ currentImage }
              disableScroll={ false }
              closeOnClickOutside={ true }
              onClose={ closeImageViewer }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default GallerySection