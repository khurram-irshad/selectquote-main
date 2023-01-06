import { Type_RichTextCustom } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";

const RichTextCustomSection = ({
  section,
}: {
  section: Type_RichTextCustom;
}) => {
  const {
    content,
    backgroundColor,
    padding,
    fullWidth,
    width,
    textAlign = "left",
    textColor
  } = section.fields;
  return (
    <section
      className={`richtext-render text-${textAlign}`}
      style={{ background: backgroundColor }}
    >
      <div
        className={
          fullWidth ? "container wp-container" : ""
        }
        style={{ width: `${width}`, padding: `${padding}`,color:`${textColor}` }}
      >
        <RichTextRenderer text={content} color={textColor} />
      </div>
    </section>
  );
};

export default RichTextCustomSection;
