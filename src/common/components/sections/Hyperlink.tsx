import { Type_HyperLink } from "@common/types/Type_HyperLink";
import React from "react";
import Link from "next/link";
import { NULL } from "sass";

const Hyperlink = ({ section }: { section: Type_HyperLink }) => {
  const isValidHttpUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };
  return isValidHttpUrl(section.fields.url) ? (
    <a
      href={section.fields.url || "/"}
      style={{
        textDecoration: "none",
        color: section.fields.color,
        fontWeight: 700,
      }}
    >
      {section.fields.title}
    </a>
  ) : (
    <Link href={section.fields.url || "/"}>
      <a style={{color: section.fields?.color,
      textDecoration: "none",
      fontSize: section.fields.fontSize ,
      fontWeight: section.fields.fontWeight}}>{section.fields.title}</a>
    </Link>
  );
};

export default Hyperlink;
