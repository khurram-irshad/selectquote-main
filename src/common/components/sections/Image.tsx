import React from "react";
import Image from "next/image";
import { Type_Image } from "@common/types";

const ImageSection = ({ section }: { section: Type_Image }) => {
  const { imageFile, imageName } = section.fields;

  const socialMedia = [
    "Facebook",
    "Linkedin",
    "Twitter",
    "Youtube",
    "Business Profile Image",
  ];

  return (
    <>
      {socialMedia.includes(imageName) ? (
        <a
          href={`https:${section.fields?.link}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            src={`https:${imageFile?.fields?.file?.url}`}
            width={imageFile?.fields?.file?.details?.image?.width}
            height={imageFile?.fields?.file?.details?.image?.height}
            alt={imageName || imageFile?.fields?.title}
          />
        </a>
      ) : (
        <Image
          src={`https:${imageFile?.fields?.file?.url}`}
          width={imageFile?.fields?.file?.details?.image?.width}
          height={imageFile?.fields?.file?.details?.image?.height}
          alt={imageName || imageFile?.fields?.title}
        />
      )}
    </>
  );
};

export default ImageSection;
