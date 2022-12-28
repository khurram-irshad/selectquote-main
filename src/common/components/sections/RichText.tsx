import {  Type_RichText } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";

const RichTextSection = ({
  section,
}: {
  section: Type_RichText;
}) => {
  const { content } = section.fields;

  return (
    <section>
      <RichTextRenderer text={content} />
    </section>
  );
};

export default RichTextSection;
