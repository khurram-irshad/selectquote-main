import { Type_HyperLink } from "@common/types/Type_HyperLink";
import React from "react";
import Link from "next/link";
import { NULL } from "sass";
import { DeviceType } from "@common/types/Type_Device";

const Hyperlink = ({ section }: { section: Type_HyperLink }) => {

  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);
  
  const isValidHttpUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };
  return isValidHttpUrl(section.fields.linkUrl) ? (
    <a
      href={section.fields.linkUrl || "/"}
      style={{
        textDecoration: "none",
        color: section.fields.color,
        fontWeight: 700,
      }}
    >
      {section.fields.title}
    </a>
  ) : (
    <Link href={section.fields.linkUrl || "/"}>
      <a style={{color: section.fields?.color,
      textDecoration: "none",
      fontSize: section.fields.fontSize ,
      fontWeight: section.fields.fontWeight}}>{section.fields.title}</a>
    </Link>
  );
};

export default Hyperlink;
