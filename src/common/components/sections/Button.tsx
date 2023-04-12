import { STATIC_SCODE } from "@common/constants/app.constant";
import { isDesktop, isMobile } from "@common/helpers/helper";
import { Type_Button } from "@common/types/Type_Button";
import { DeviceType } from "@common/types/Type_Device";
import useWindowDimensions from "@components/WindowDimension";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useGlobalContext } from "src/context";

const ButtonSection = ({ section }: { section: Type_Button }) => {
  const {
    title,
    linkUrl,
    rounded = true,
    devices,
    hoverBackground,
    hoverColor,
    externalLink,
    scrollToId,
    altText
  } = section.fields;
  const [isFocused, setFocus] = useState(false);
  const { screenMode } = useGlobalContext();
  const router = useRouter();

  const desktop = devices?.find(
    (item) => item.fields.type === DeviceType.Desktop
  );
  const mobile = devices?.find(
    (item) => item.fields.type === DeviceType.Mobile
  );

  let pathname,
    hrefUrl = linkUrl;
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }

  const isRocketLawyer = () => {
    return pathname?.includes("rocket-lawyer");
  };
  if (isRocketLawyer()) {
    hrefUrl = `${hrefUrl}?sCode=${STATIC_SCODE.LIFE}`;
  }

  if (hrefUrl?.includes("scroll-to-view#")) {
    hrefUrl = "#";
  }

  const scrollIntoId = () => {
    setTimeout(() => {
      const el = document.getElementById(scrollToId);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 500);
  };

  return (
    <>
      {isDesktop(screenMode) && (
        <div className="button-container">
          <a
          title={altText}
            className={`pointer action-btn ${rounded ? "btn-border" : ""
              } text-${mobile?.fields?.textAlign}`}
            onMouseEnter={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            style={{
              fontSize: desktop?.fields?.fontSize,
              padding: desktop?.fields?.padding ? desktop?.fields?.padding : "",
              borderRadius: desktop?.fields?.borderRadius,
              border: desktop?.fields?.border,
              backgroundColor: isFocused
                ? hoverBackground
                : desktop?.fields?.backgroundColor,
              color: isFocused ? hoverColor : desktop?.fields?.textColor,
              borderColor: isFocused ? hoverColor : desktop?.fields?.textColor,
              boxShadow: desktop?.fields?.boxShadow
                ? desktop?.fields?.boxShadow
                : "0px 2px 4px 0px rgba(0, 0, 0, 30%)",
            }}
            href={hrefUrl}
            onClick={() => scrollIntoId()}
            target={externalLink ? "_blank" : ""}
            rel={externalLink ? "noopener noreferrer" : ""}
          >
            {title}
          </a>
        </div>
      )}

      {isMobile(screenMode) && (
        <div className="button-container">
          <a
            title={altText}
            onMouseEnter={() => setFocus(true)}
            onMouseLeave={() => setFocus(false)}
            className={`pointer action-btn ${rounded ? "btn-border" : ""
              } text-${mobile?.fields?.textAlign}`}
            style={{
              fontSize: mobile?.fields?.fontSize,
              padding: mobile?.fields?.padding ? mobile?.fields?.padding : "",
              borderRadius: mobile?.fields?.borderRadius,
              border: mobile?.fields?.border,
              backgroundColor: isFocused
                ? hoverBackground
                : mobile?.fields?.backgroundColor,
              color: isFocused ? hoverColor : mobile?.fields?.textColor,
              borderColor: isFocused ? hoverColor : mobile?.fields?.textColor,
              boxShadow: mobile?.fields?.boxShadow
                ? mobile?.fields?.boxShadow
                : "0px 2px 4px 0px rgba(0, 0, 0, 30%)",
            }}
            href={hrefUrl}
            onClick={() => scrollIntoId()}
            target={externalLink ? "_blank" : ""}
            rel={externalLink ? "noopener noreferrer" : ""}
          >
            {title}
          </a>
        </div>
      )}
    </>
  );
};

export default ButtonSection;
