import React from "react";
import RichTextRenderer from "./RichTextRenderer";
import Link from "next/link";

type Props = {
  data: any;
  content: any;
  type: "AssetLink" | "PlainLink";
};

export const Hyperlink = (props: Props) => {
  const href =
    props.type === "AssetLink"
      ? props.data.target.fields.file.url
      : props.data.uri;
  // Link text has to be rendered itself as rich text
  // to account for various formatting options (e.g. bold text)
  const linkText = RichTextRenderer({
    text: {
      content: props.content,
      data: {},
      nodeType: "document",
    },
  });

  const isValidHttpUrl = (string) => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  return isValidHttpUrl(href) ? (
    <a
      href={href || "/"}
      style={{ color: "#00aec7", textDecoration: "none", fontWeight: 700 }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {linkText}
    </a>
  ) : (
    <Link href={href || "/"}>
      <a style={{ color: "#00aec7", textDecoration: "none", fontWeight: 700 }}>
        {linkText}
      </a>
    </Link>
  );
};
