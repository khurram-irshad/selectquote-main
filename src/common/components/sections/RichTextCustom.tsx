import { Type_RichTextCustom } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";

const RichTextCustomSection = ({
  section,
}: {
  section: Type_RichTextCustom;
}) => {
  const { content, backgroundColor, padding, fullWidth, width, textAlign = 'left' } = section.fields;
  return (
    <section
      className={`richtext-render text-${textAlign}`}
      style={{ background: backgroundColor }}
    >
      <div
        style={{ width: `${width}`, padding: `${padding}` }}
        className={
          fullWidth ? "container-fluid px-0" : "container wp-container"
        }
      >
        <RichTextRenderer text={content} />
      </div>
    </section>
  );
};

export default RichTextCustomSection;
