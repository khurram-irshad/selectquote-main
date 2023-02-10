import { Type_RichTextCustom } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";

const RichTextSection = ({ section }: { section: Type_RichTextCustom }) => {
  const {
    content,
    devices
  } = section.fields;

  const desktop = devices?.find(item => item.fields?.type === DeviceType.Desktop);
  const mobile = devices?.find(item => item.fields?.type === DeviceType.Mobile);

  return (
    <>
      <section
        className={`richtext-render `}

      >
        <div className={`wp-container-desktop text-${desktop?.fields?.textAlign}`} style={{ background: desktop?.fields?.backgroundColor }}>
          <div
            className={desktop?.fields?.fullWidth ? "container wp-container" : ""}
            style={{
              width: `${desktop?.fields?.width}`,
              padding: `${desktop?.fields?.padding}`,
              fontWeight: `${desktop?.fields?.fontWeight}`,
              lineHeight: `${desktop?.fields?.lineHeight}`,
              fontSize: `${desktop?.fields?.fontSize}`,
              color: `${desktop?.fields?.textColor} !important`,
              letterSpacing: `${desktop?.fields?.letterSpacing} !important`,
              fontFamily: `${desktop?.fields?.fontFamily}`
            }}
          >
            <RichTextRenderer
              text={content}
              color={desktop?.fields?.textColor}
            />
          </div>
        </div>
        <div className={`wp-container-mobile text-${mobile?.fields?.textAlign}`} style={{ background: mobile?.fields?.backgroundColor }}>
          <div
            className={mobile?.fields?.fullWidth ? "container wp-container" : ""}
            style={{
              width: `${mobile?.fields?.width}`,
              padding: `${mobile?.fields?.padding}`,
              fontWeight: `${mobile?.fields?.fontWeight}`,
              lineHeight: `${mobile?.fields?.lineHeight}`,
              fontSize: `${mobile?.fields?.fontSize}`,
              color: `${mobile?.fields?.textColor} !important`,
              letterSpacing: `${mobile?.fields?.letterSpacing} !important`,
              fontFamily: `${mobile?.fields?.fontFamily}`
            }}
          >
            <RichTextRenderer text={content} color={mobile?.fields?.textColor} />
          </div>
        </div>
      </section>
    </>
  );
};

export default RichTextSection;
