import { Type_HyperLink } from "@common/types/Type_HyperLink";
import Link from "next/link";
import React from "react";

const Hyperlink = ({ section }: { section: Type_HyperLink }) => {
  const { type, underline, externalLink } = section.fields;
  const title = section.fields.title;
  let titleWithSuperscript = "";
  let currentIndex = 0;
  while (true) {
    const superscriptIndex = title.indexOf("®", currentIndex);
    if (superscriptIndex === -1) {
      titleWithSuperscript += title.substring(currentIndex);
      break;
    }
    titleWithSuperscript += title.substring(currentIndex, superscriptIndex);
    titleWithSuperscript += `<sup>®</sup>`;
    currentIndex = superscriptIndex + 1;
  }

  return (
    <a
      href={section.fields.scrollToId ?? (section.fields.linkUrl || "/")}
      className={type === "Button" ? "link-button hyperlink" : "hyperlink"}
      target={externalLink ? "_blank" : ""}
      rel={externalLink ? "noopener noreferrer" : ""}
      title={titleWithSuperscript}
      style={{
        color: section.fields?.color,
        textDecoration: !underline ? "none" : "underline",
        fontSize: section.fields.fontSize,
        fontWeight: section.fields.fontWeight,
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: titleWithSuperscript }} />
    </a>
  );
};

export default Hyperlink;
