import { Type_Button } from "@common/types/Type_Button";
import { DeviceType } from "@common/types/Type_Device";
import React from "react";

const ButtonSection = ({ section }: { section: Type_Button }) => {
  const {
    title,
    linkUrl,
    rounded = true,
    devices,
  } = section.fields;

  const desktop = devices?.find(item => item.fields.type === DeviceType.Desktop);
  const mobile = devices?.find(item => item.fields.type === DeviceType.Mobile);
  return (
    <>
      <div className="wp-container-desktop">
        <div className="button-container">
          <a
            className={`action-btn ${rounded ? "btn-border" : ""}`}
            style={{
              color: desktop?.fields?.textColor,
              backgroundColor: desktop?.fields?.backgroundColor,
              fontSize: desktop?.fields?.fontSize,
              padding:desktop?.fields?.padding,
              borderRadius:desktop?.fields?.borderRadius,
            }}
            href={linkUrl}
          >
            {title}
          </a>
        </div>
      </div>
      <div className="wp-container-mobile">
        <div className="button-container">
          <a
            className={`action-btn ${rounded ? "btn-border" : ""}`}
            style={{
              color: mobile?.fields?.textColor,
              backgroundColor: mobile?.fields?.backgroundColor,
              fontSize: mobile?.fields?.fontSize,
              padding:mobile?.fields?.padding,
              borderRadius:mobile?.fields?.borderRadius,
            }}
            href={linkUrl}
          >
            {title}
          </a>
        </div>
      </div>
    </>
  );
};

export default ButtonSection;
