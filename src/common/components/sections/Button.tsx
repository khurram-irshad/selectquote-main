import { Type_Button } from "@common/types/Type_Button";
import React from "react";

const ButtonSection = ({ section }: { section: Type_Button }) => {
  const {
    title,
    backgroundColor,
    linkUrl,
    rounded = true,
    textColor,
    fontSize = "16px",
  } = section.fields;
  return (
    <div className="button-container">
      <a
        className={`action-btn ${rounded ? "btn-border" : ""}`}
        style={{
          color: textColor,
          backgroundColor: backgroundColor,
          fontSize: fontSize,
        }}
        href={linkUrl}
      >
        {title}
      </a>
    </div>
  );
};

export default ButtonSection;
