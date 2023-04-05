import React from "react";
import Image from "next/image";
import { Type_Image } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";
import { useGlobalContext } from "src/context";
import { isDesktop, isMobile } from "@common/helpers/helper";
import { Tooltip } from "react-tooltip";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";

const ImageSection = ({ section }: { section: Type_Image }) => {
  const { imageFile, imageName, externalLink, fill, quality, link, tooltip } =
    section.fields;
  const desktop = section?.fields?.devices?.find(
    (item) => item?.fields?.type === DeviceType.Desktop
  );
  const mobile = section?.fields?.devices?.find(
    (item) => item?.fields?.type === DeviceType.Mobile
  );

  const { screenMode } = useGlobalContext();
  const widthDesktop: any = desktop?.fields?.width
    ? desktop.fields.width.replace("px", "")
    : imageFile?.fields?.file?.details?.image?.width;
  const heightDesktop: any = desktop?.fields?.height
    ? desktop.fields.height.replace("px", "")
    : imageFile?.fields?.file?.details?.image?.height;

  const widthMobile: any = mobile?.fields?.width
    ? mobile.fields.width.replace("px", "")
    : imageFile?.fields?.file?.details?.image?.width;
  const heightMobile: any = mobile?.fields?.height
    ? mobile.fields.height.replace("px", "")
    : imageFile?.fields?.file?.details?.image?.height;

  const renderImage = () => {
    return (
      <>
        {isDesktop(screenMode) && (
          <span className={"image-container"}>
            {fill ? (
              <a data-tooltip-id="tooltip-content">
                <Image
                  quality={100}
                  style={{ borderRadius: desktop?.fields?.borderRadius }}
                  src={`https:${imageFile?.fields?.file?.url}`}
                  fill
                  className={"image h-unset"}
                  alt={imageName || imageFile?.fields?.title}
                />
              </a>
            ) : (
              <a data-tooltip-id="tooltip-content">
                <Image
                  quality={100}
                  style={{ borderRadius: desktop?.fields?.borderRadius }}
                  src={`https:${imageFile?.fields?.file?.url}`}
                  width={Number(widthDesktop)}
                  height={Number(heightDesktop)}
                  className={"image "}
                  alt={imageName || imageFile?.fields?.title}
                />
              </a>
            )}
          </span>
        )}
        {isMobile(screenMode) && (
          <span
            className={"image-container"}
            style={{ width: mobile?.fields.widthPercentage + "%" }}
          >
            {fill ? (
              <Image
                quality={100}
                style={{ borderRadius: mobile?.fields?.borderRadius }}
                src={`https:${imageFile?.fields?.file?.url}`}
                fill
                className={"image h-unset"}
                alt={imageName || imageFile?.fields?.title}
              />
            ) : (
              <Image
                quality={100}
                style={{ borderRadius: mobile?.fields?.borderRadius }}
                src={`https:${imageFile?.fields?.file?.url}`}
                width={Number(widthMobile)}
                height={Number(heightMobile)}
                className={"image "}
                alt={imageName || imageFile?.fields?.title}
              />
            )}
          </span>
        )}
        {tooltip && (
          <Tooltip id="tooltip-content" className="tooltip" openOnClick>
            <RichTextRenderer text={tooltip} />
          </Tooltip>
        )}
      </>
    );
  };

  return (
    <>
      {link ? (
        <a
          rel={externalLink ? "noopener noreferrer" : ""}
          target={externalLink ? "_blank" : ""}
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
