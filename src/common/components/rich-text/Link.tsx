import React from "react";
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

  return <Link href={href || "/"}>
    <a style={{ color: "#07aec7", textDecoration: "none", fontWeight: 700 }}>
      {props.content[0].value}
    </a>
  </Link>
};
