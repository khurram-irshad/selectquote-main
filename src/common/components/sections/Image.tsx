import React from "react";
import Image from "next/image";
import { Type_Image } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";
import { useGlobalContext } from "src/context";
import { isDesktop, isMobile } from "@common/helpers/helper";

const ImageSection = ({ section }: { section: Type_Image }) => {
  const { imageFile, imageName, externalLink } = section.fields;
  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);

  const { screenMode } = useGlobalContext();

  const renderImage = () => {
    return <>
      {isDesktop(screenMode) && (
        <Image
          style={{ borderRadius: desktop?.fields?.borderRadius }}
          src={`https:${imageFile?.fields?.file?.url}`}
          width={desktop?.fields?.width ? desktop.fields.width : imageFile?.fields?.file?.details?.image?.width}
          height={desktop?.fields?.height ? desktop.fields.height : imageFile?.fields?.file?.details?.image?.height}
          alt={imageName || imageFile?.fields?.title}
        />
      )}
      {isMobile(screenMode) && (
        <div style={{ justifyContent: mobile?.fields?.justifyContent, alignItems: mobile?.fields?.alignItems }}>
          <Image
            src={`https:${imageFile?.fields?.file?.url}`}
            width={mobile?.fields?.width ? mobile?.fields?.width : imageFile?.fields?.file?.details?.image?.width}
            height={mobile?.fields?.height ? mobile?.fields?.height : imageFile?.fields?.file?.details?.image?.height}
            alt={imageName || imageFile?.fields?.title}
          />
        </div>
      )}
    </>
  }

  return (
    <>
      {section.fields?.link ? (
        <a
          rel={section.fields?.externalLink ? "noopener noreferrer" : ''}
          target={section.fields?.externalLink ? "_blank" : ''}
          href={`${section.fields?.link}`}
        >
          {renderImage()}
        </a>
      ) : (
        renderImage()
      )}
    </>
  );
};

export default ImageSection;
