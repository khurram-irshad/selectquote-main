import React from "react";
import Image from "next/image";
import { Type_Image } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";

const ImageSection = ({ section }: { section: Type_Image }) => {
  const { imageFile, imageName } = section.fields;
  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);

  console.log(imageFile?.fields)
  console.log(imageFile?.fields?.file?.url)
  return (
    <>

      <div className="wp-container-desktop " >
        {section.fields?.link ? (
          <a
            href={`${section.fields?.link}`}
          >
            <Image
              style={{ borderRadius: desktop?.fields?.borderRadius }}
              src={`https:${imageFile?.fields?.file?.url}`}
              width={desktop?.fields?.width ? desktop.fields.width : imageFile?.fields?.file?.details?.image?.width}
              height={desktop?.fields?.height ? desktop.fields.height : imageFile?.fields?.file?.details?.image?.height}
              alt={imageName || imageFile?.fields?.title}
            />
          </a>
        ) : (
          <Image
            style={{ borderRadius: desktop?.fields?.borderRadius }}
            src={`https:${imageFile?.fields?.file?.url}`}
            width={desktop?.fields.width ? desktop?.fields.width : imageFile?.fields?.file?.details?.image?.width}
            height={desktop?.fields.height ? desktop?.fields.height : imageFile?.fields?.file?.details?.image?.height}
            alt={imageName || imageFile?.fields?.title}
          />
        )}

      </div>
      <div className="wp-container-mobile " style={{ justifyContent: mobile?.fields?.justifyContent, alignItems: mobile?.fields?.alignItems }}>
        {section.fields?.link ? (
          <a
            href={`${section.fields?.link}`}
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
            style={{ borderRadius: mobile?.fields?.borderRadius }}
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
