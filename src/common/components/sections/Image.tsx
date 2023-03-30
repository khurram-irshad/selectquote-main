import React from "react";
import Image from "next/image";
import { Type_Image } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";
import { useGlobalContext } from "src/context";
import { isDesktop, isMobile } from "@common/helpers/helper";

const ImageSection = ({ section }: { section: Type_Image }) => {
  const { imageFile, imageName, externalLink, fill, quality, link } = section.fields;
  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);

  const { screenMode } = useGlobalContext();
  const width: any = desktop?.fields?.width ? desktop.fields.width.replace('px', '') : imageFile?.fields?.file?.details?.image?.width;
  const height: any = desktop?.fields?.height ? desktop.fields.height.replace('px', '') : imageFile?.fields?.file?.details?.image?.height;
  const renderImage = () => {
    return <>
      {isDesktop(screenMode) && (
        <span className={'image-container'}>
          {fill ? (<Image
            quality={100}
            style={{ borderRadius: desktop?.fields?.borderRadius }}
            src={`https:${imageFile?.fields?.file?.url}`}
            fill
            className={'image h-unset'}
            alt={imageName || imageFile?.fields?.title}
          />) : (<Image
            quality={100}
            style={{ borderRadius: desktop?.fields?.borderRadius }}
            src={`https:${imageFile?.fields?.file?.url}`}
            width={Number(width)}
            height={Number(height)}
            className={'image '}
            alt={imageName || imageFile?.fields?.title}
          />)}
        </span>
      )}
      {isMobile(screenMode) && (
        <span className={'image-container'} style={{ width: mobile?.fields?.width }}>
          {fill ? (<Image
            quality={100}
            style={{ borderRadius: mobile?.fields?.borderRadius }}
            src={`https:${imageFile?.fields?.file?.url}`}
            fill
            className={'image h-unset'}
            alt={imageName || imageFile?.fields?.title}
          />) : (<Image
            quality={100}
            style={{ borderRadius: mobile?.fields?.borderRadius }}
            src={`https:${imageFile?.fields?.file?.url}`}
            width={Number(width)}
            height={Number(height)}
            className={'image '}
            alt={imageName || imageFile?.fields?.title}
          />)}
        </span>
      )}
    </>
  }

  return (
    <>
      {link ? (
        <a
          rel={externalLink ? "noopener noreferrer" : ''}
          target={externalLink ? "_blank" : ''}
          href={`${link}`}
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
