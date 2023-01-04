import React from "react";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { Type_Hero } from "@common/types";

const HeroSection = ({ section }: { section: Type_Hero }) => {
  const {
    title,
    content,
    buttonText,
    gradientEndColor,
    gradientStartingColor,
    backgroundImage,
    textColor,
    actionImage,
    topSection,
    fullWidth,
  } = section.fields;

  return (
    <section
      className={"hero-section" + (topSection ? " hero-section-border" : "")}
      style={{
        backgroundPosition: "right 0px center",
        backgroundImage: backgroundImage
          ? `linear-gradient(90deg,${gradientStartingColor} 48%,${gradientEndColor} 55%), url(https:${backgroundImage.fields.imageFile.fields.file.url})`
          : "",
      }}
    >
      <div
        className={
          "hero-content d-flex align-items-center container wp-container"
        }
      >
        <div className="w-50 position-relative">
          <div className="content-left">
            <h3>{title} </h3>
            <RichTextRenderer text={content} />
            {buttonText && (
              <>
                <a className="free-quote-btn" href="/quote-form">
                  {buttonText}
                </a>
              </>
            )}
            {actionImage && (
              <>
                <a>
                  <img
                    src={`https:${actionImage?.fields.imageFile?.fields.file.url}`}
                  />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
