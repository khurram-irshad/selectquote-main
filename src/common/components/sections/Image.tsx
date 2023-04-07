import React from "react";
import Image from "next/image";
import { Type_Image } from "@common/types";
import Device, { DeviceType } from "@common/types/Type_Device";
import { useGlobalContext } from "src/context";
import { isDesktop, isMobile } from "@common/helpers/helper";
import { Tooltip } from "react-tooltip";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";

const ImageSection = ({ section }: { section: Type_Image }) => {
  const {
    externalLink,
    link,
    tooltip,
    tooltipId,
  } = section.fields;
  const desktop = section?.fields?.devices?.find(
    (item) => item?.fields?.type === DeviceType.Desktop
  );
  const mobile = section?.fields?.devices?.find(
    (item) => item?.fields?.type === DeviceType.Mobile
  );

  const { screenMode } = useGlobalContext();
  const renderImage = () => {
    return (
      <>
        {isDesktop(screenMode) &&
          (tooltipId ? (
            <a data-tooltip-id={tooltipId}>
              <GetImage device={desktop?.fields} section={section} />
            </a>
          ) : (
            <GetImage device={desktop?.fields} section={section} />
          ))}
        {isMobile(screenMode) && (
          (tooltipId ? (
            <a data-tooltip-id={tooltipId}>
              <GetImage device={mobile?.fields} section={section} />
            </a>
          ) : (
            <GetImage device={mobile?.fields} section={section} />
          ))

        )}
        {tooltipId && (
          <Tooltip id={tooltipId} className="tooltip" openOnClick clickable>
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

const GetImage = ({ section, device }: { section: Type_Image, device: Device }) => {
  const {
    imageFile,
    imageName,
    fill,
  } = section.fields;

  const width: any = device?.width
    ? device?.width.replace("px", "")
    : imageFile?.fields?.file?.details?.image?.width;
  const height: any = device?.height
    ? device?.height.replace("px", "")
    : imageFile?.fields?.file?.details?.image?.height;

  return <span
    className={"image-container"}
    style={{ width: device?.widthPercentage + "%" }}
  >
    {fill ? (
      <Image
        quality={100}
        style={{ borderRadius: device?.borderRadius }}
        src={`https:${imageFile?.fields?.file?.url}`}
        fill
        className={"image h-unset"}
        alt={imageName || imageFile?.fields?.title}
      />
    ) : (
      <Image
        quality={100}
        style={{ borderRadius: device?.borderRadius }}
        src={`https:${imageFile?.fields?.file?.url}`}
        width={Number(width)}
        height={Number(height)}
        className={"image "}
        alt={imageName || imageFile?.fields?.title}
      />
    )}
  </span>
}
export default ImageSection;
