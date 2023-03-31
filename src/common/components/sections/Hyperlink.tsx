import { Type_HyperLink } from "@common/types/Type_HyperLink";
import React from "react";
import Link from "next/link";
import { DeviceType } from "@common/types/Type_Device";

const Hyperlink = ({ section }: { section: Type_HyperLink }) => {
  const { type, underline } = section.fields;
  const desktop = section?.fields?.devices?.find(
    (item) => item?.fields?.type === DeviceType.Desktop
  );
  const mobile = section?.fields?.devices?.find(
    (item) => item?.fields?.type === DeviceType.Mobile
  );

  const isValidHttpUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };
  return isValidHttpUrl(
    section.fields.linkUrl && !section.fields.scrollToId
  ) ? (
    <a
      href={section.fields.linkUrl || "/"}
      className={type === 'Button' ? 'link-button hyperlink' : 'hyperlink'}
      style={{
        textDecoration: !underline ? "none" : 'underline',
        color: section.fields.color,
        fontSize: section.fields.fontSize,
        fontWeight: section.fields.fontWeight,

      }}
    >
      {section.fields.title}
    </a>
  ) : (
    <Link href={section.fields.scrollToId ?? (section.fields.linkUrl || "/")}>
      <a
        className={type === 'Button' ? 'link-button hyperlink' : 'hyperlink'}
        style={{
          color: section.fields?.color,
          textDecoration: !underline ? "none" : 'underline',
          fontSize: section.fields.fontSize,
          fontWeight: section.fields.fontWeight,
        }}
      >
        {section.fields.title}
      </a>
    </Link>
  );
};

export default Hyperlink;
