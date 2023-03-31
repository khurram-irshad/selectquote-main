import { Type_HyperLink } from "@common/types/Type_HyperLink";
import React from "react";
import Link from "next/link";

const Hyperlink = ({ section }: { section: Type_HyperLink }) => {
  const { type, underline, externalLink } = section.fields;

  return <Link href={section.fields.scrollToId ?? (section.fields.linkUrl || "/")} >
    <a
      className={type === 'Button' ? 'link-button hyperlink' : 'hyperlink'}
      target={externalLink ? '_blank' : ''}
      rel={externalLink ? 'noopener noreferrer' : ''}
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
};

export default Hyperlink;
