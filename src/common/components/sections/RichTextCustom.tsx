import { Type_RichTextCustom } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { useRouter } from "next/router";
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
  } = section.fields;
  return (
    <section
      className={`richtext-render text-${textAlign}`}
      style={{ background: backgroundColor }}
    >
      <div
        className={
<<<<<<< HEAD
          fullWidth ? "container-fluid px-0" : ""
=======
          fullWidth ? "container wp-container" : !title ? "text-alignment" : ""
>>>>>>> 399903c (chore: added prop for child components to append correct class)
        }
        style={{ width: `${width}`, padding: `${padding}` }}
      >
        <RichTextRenderer text={content} />
      </div>
    </section>
  );
};

export default RichTextCustomSection;
