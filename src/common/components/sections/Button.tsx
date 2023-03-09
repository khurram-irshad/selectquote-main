import { isDesktop, isMobile } from "@common/helpers/helper";
import { Type_Button } from "@common/types/Type_Button";
import { DeviceType } from "@common/types/Type_Device";
import useWindowDimensions from "@components/WindowDimension";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "src/context";

const ButtonSection = ({ section }: { section: Type_Button }) => {
  const {
    title,
    linkUrl,
    rounded = true,
    devices,
    scrollToId,
    hoverBackground,
    hoverColor
  } = section.fields;
  const [isFocused, setFocus] = useState(false);
  const { screenMode } = useGlobalContext();

  const desktop = devices?.find(item => item.fields.type === DeviceType.Desktop);
  const mobile = devices?.find(item => item.fields.type === DeviceType.Mobile);
  return (
    <>
      {isDesktop(screenMode) && (
        <div className="button-container">  
          <a
            className={`action-btn ${rounded ? "btn-border" : ""}`}
            onMouseEnter={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            style={{
              fontSize: desktop?.fields?.fontSize,
              padding: desktop?.fields?.padding ? desktop?.fields?.padding : '',
              borderRadius: desktop?.fields?.borderRadius,
              border: desktop?.fields?.border,
              backgroundColor: isFocused ? hoverBackground : desktop?.fields?.backgroundColor,
              color: isFocused ? hoverColor : desktop?.fields?.textColor,
              borderColor: isFocused ? hoverColor : desktop?.fields?.textColor,
              boxShadow: desktop?.fields?.boxShadow? desktop?.fields?.boxShadow:'0px 2px 4px 0px rgba(0, 0, 0, 30%)'
            }}
            href={linkUrl}
          >
            {title}
          </a>
        </div>
      )}

      {isMobile(screenMode) && (
        <div className="button-container">
          <a
            onMouseEnter={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            className={`action-btn ${rounded ? "btn-border" : ""}`}
            style={{
              fontSize: mobile?.fields?.fontSize,
              padding: mobile?.fields?.padding ? mobile?.fields?.padding : '',
              borderRadius: mobile?.fields?.borderRadius,
              border: mobile?.fields?.border,
              backgroundColor: isFocused ? hoverBackground : mobile?.fields?.backgroundColor,
              color: isFocused ? hoverColor : mobile?.fields?.textColor,
              borderColor: isFocused ? hoverColor : mobile?.fields?.textColor,
              boxShadow: mobile?.fields?.boxShadow? mobile?.fields?.boxShadow:'0px 2px 4px 0px rgba(0, 0, 0, 30%)'
            }}
            href={linkUrl}
          >
            {title}
          </a>
        </div>
      )}
    </>
  );
};

export default ButtonSection;
