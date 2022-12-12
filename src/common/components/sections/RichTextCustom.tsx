import { Type_RichTextCustom } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";
import { useRouter } from "next/router";

const RichTextCustomSection = ({
  section,
}: {
  section: Type_RichTextCustom;
}) => {
  const { title, content, backgroundColor, fullWidth } = section.fields;
  const router = useRouter();

  const path = router.asPath;

  return (
    <section
      className="richtext-render"
      style={{ background: backgroundColor }}
    >
      <div
        className={
          fullWidth ? "container-fluid px-0" : "container wp-container"
        }
      >
        {title && (
          <h1
            className={
              ["/legal", "/privacy", "/privacy/ccpa"].includes(path)
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
