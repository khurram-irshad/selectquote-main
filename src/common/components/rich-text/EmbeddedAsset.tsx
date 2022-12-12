import React from 'react';
import Image from "next/image";

export const EmbeddedAsset = ({ data }) => {

  const isImage = data?.target?.fields?.file.contentType.includes('image');
  if (isImage) {
    return (
      <Image
        src={`https:${data?.target?.fields?.file?.url}`}
        width={data?.target?.fields?.file?.details?.image?.width}
        height={data?.target?.fields?.file?.details?.image?.height}
        alt={data?.target?.fields?.title}
      />
    );
  }

  // Ignore all other asset types, e.g. PDFs, other docs etc.
  return null;
};
