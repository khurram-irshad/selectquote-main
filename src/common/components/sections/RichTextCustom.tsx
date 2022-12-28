import { Type_RichTextCustom } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";
import { useRouter } from "next/router";

const RichTextCustomSection = ({
  section,
}: {
  section: Type_RichTextCustom;
}) => {
  const { title, content, backgroundColor,padding, fullWidth, width, textAlign = 'left' } = section.fields;
  const router = useRouter();

  const path = router.asPath;

  return (
    <section
      className={`richtext-render text-${textAlign}`}
      style={{ background: backgroundColor }}
    >
      <div
      style={{width:`${width}`, padding: `${padding}`}}
        className={
          fullWidth ? "container-fluid px-0" : "container wp-container"
        }
      >
        {title && (
          <h1
            className={
              ["/legal", "/privacy", "/privacy/ccpa", "/accessibility-statement"].includes(path)
                ? "text-center"
                : ""
            }
          >
            {title}
          </h1>
        )}
        <RichTextRenderer text={content} />
      </div>
    </section>
  );
};

export default RichTextCustomSection;
