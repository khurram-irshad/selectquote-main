import React from "react";
import RichTextRenderer from "./RichTextRenderer";
import Link from "next/link";
import { isValidHttpUrl } from "@common/helpers/helper";

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

  return isValidHttpUrl(href) ? (
    <a
      href={href || "/"}
      style={{  textDecoration: "none",color: "#07aec7", fontWeight: 700 }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* {addColour([props.content[0].value])} */}
      {props.content[0].value}
    </a>
  ) : (
    <Link href={href || "/"}>
      <a style={{ color: "#07aec7", textDecoration: "none", fontWeight: 700 }}>
        {/* {addColour([props.content[0].value])} */}
        {props.content[0].value}
      </a>
    </Link>
  );
};
