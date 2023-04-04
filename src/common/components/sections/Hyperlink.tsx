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
    <Link
      href={section.fields.scrollToId ?? (section.fields.linkUrl || "/")}
      legacyBehavior
      scroll={false}
    >
      <a
        className={type === "Button" ? "link-button hyperlink" : "hyperlink"}
        target={externalLink ? "_blank" : ""}
        rel={externalLink ? "noopener noreferrer" : ""}
        style={{
          color: section.fields?.color,
          textDecoration: !underline ? "none" : "underline",
          fontSize: section.fields.fontSize,
          fontWeight: section.fields.fontWeight,
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: titleWithSuperscript }} />
      </a>
    </Link>
  );
};

export default Hyperlink;
