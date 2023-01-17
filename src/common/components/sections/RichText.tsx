import { Type_RichTextCustom } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";

const RichTextSection = ({
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
    <>
      <section
        className={`richtext-render text-${textAlign}`}
        style={{ background: backgroundColor }}
      >
        <div className="wp-container-desktop">
          <div
            className={
              fullWidth ? "container wp-container" : ""
            }
            style={{ width: `${width}`, padding: `${padding}`,color:`${textColor} !important` }}
          >
            <RichTextRenderer text={content} color={textColor} />
          </div>
        </div>
        <div className="wp-container-mobile">
          <div
            className={
              fullWidth ? "container wp-container" : ""
            }
            style={{ width: `${width}`, padding: `${padding}`,color:`${textColor} !important` }}
          >
            <RichTextRenderer text={content} color={textColor} />
          </div>
        </div>
      </section>
      
    </>  
  );
};

export default RichTextSection;
