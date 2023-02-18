import React from "react";
import Image from "next/image";
import { Type_Image } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";

const ImageSection = ({ section }: { section: Type_Image }) => {
  const { imageFile, imageName } = section.fields;
  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);


  const socialMedia = [
    "Facebook",
    "Linkedin",
    "Twitter",
    "Youtube",
    "Business Profile Image",
  ];
  if (!desktop) return (<></>);

  return (
    <>

      <div className="wp-container-desktop ">
        {section.fields?.link ? (
          <a
            href={`https:${section.fields?.link}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              src={`https:${imageFile?.fields?.file?.url}`}
              width={desktop.fields.width ? desktop.fields.width : imageFile?.fields?.file?.details?.image?.width}
              height={desktop.fields.height ? desktop.fields.height : imageFile?.fields?.file?.details?.image?.height}
              alt={imageName || imageFile?.fields?.title}
            />
          </a>
        ) : (
          <Image
            src={`https:${imageFile?.fields?.file?.url}`}
            width={desktop.fields.width ? desktop.fields.width : imageFile?.fields?.file?.details?.image?.width}
            height={desktop.fields.height ? desktop.fields.height : imageFile?.fields?.file?.details?.image?.height}
            alt={imageName || imageFile?.fields?.title}
          />
        )}

      </div>
      <div className="wp-container-mobile ">
        {section.fields?.link ? (
          <a
            href={`https:${section.fields?.link}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              src={`https:${imageFile?.fields?.file?.url}`}
              width={mobile?.fields?.width ? mobile?.fields?.width : imageFile?.fields?.file?.details?.image?.width}
              height={mobile?.fields?.height ? mobile?.fields?.height : imageFile?.fields?.file?.details?.image?.height}
              alt={imageName || imageFile?.fields?.title}
            />
          </a>
        ) : (
          <Image
            src={`https:${imageFile?.fields?.file?.url}`}
            width={mobile?.fields?.width ? mobile?.fields?.width : imageFile?.fields?.file?.details?.image?.width}
            height={mobile?.fields?.height ? mobile?.fields?.height : imageFile?.fields?.file?.details?.image?.height}
            alt={imageName || imageFile?.fields?.title}
          />
        )}

      </div>
    </>
  );
};

export default ImageSection;
