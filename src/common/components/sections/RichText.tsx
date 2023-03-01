import { isDesktop, isMobile } from "@common/helpers/helper";
import { Type_RichTextCustom } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";
import { useGlobalContext } from "src/context";

const RichTextSection = ({ section }: { section: Type_RichTextCustom }) => {
  const { content, devices, contentId } = section.fields;
  const { screenMode } = useGlobalContext();
  const desktop = devices?.find(
    (item) => item.fields?.type === DeviceType.Desktop
  );
  const mobile = devices?.find(
    (item) => item.fields?.type === DeviceType.Mobile
  );

  return (
    <>
      {isDesktop(screenMode) && (
        <div
          className={`text-${desktop?.fields?.textAlign}`}
          style={{ background: desktop?.fields?.backgroundColor, width: desktop?.fields?.width }}
        >
          <div
            id={contentId}
            style={{
              width: `${desktop?.fields?.widthPercentage ?? desktop?.fields?.width
                }`,
              padding: `${desktop?.fields?.padding}`,
              fontWeight: `${desktop?.fields?.fontWeight}`,
              lineHeight: `${desktop?.fields?.lineHeight}`,
              fontSize: `${desktop?.fields?.fontSize}`,
              color: `${desktop?.fields?.textColor} !important`,
              letterSpacing: `${desktop?.fields?.letterSpacing} !important`,
              fontFamily: `${desktop?.fields?.fontFamily}`,
              margin: desktop?.fields?.margin,
            }}
          >
            <RichTextRenderer
              text={content}
              color={desktop?.fields?.textColor}
            />
          </div>
        </div>
      )}

      {isMobile(screenMode) && (
        <div
          className={`text-${mobile?.fields?.textAlign}`}
          style={{ background: mobile?.fields?.backgroundColor, width: mobile?.fields?.width }}
        >
          <div
            id={contentId}
            style={{
              width: `${mobile?.fields?.width}`,
              padding: `${mobile?.fields?.padding}`,
              fontWeight: `${mobile?.fields?.fontWeight}`,
              lineHeight: `${mobile?.fields?.lineHeight}`,
              fontSize: `${mobile?.fields?.fontSize}`,
              color: `${mobile?.fields?.textColor} !important`,
              letterSpacing: `${mobile?.fields?.letterSpacing} !important`,
              fontFamily: `${mobile?.fields?.fontFamily}`,
              margin: mobile?.fields?.margin,

            }}
          >
            <RichTextRenderer
              text={content}
              color={mobile?.fields?.textColor}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RichTextSection;
