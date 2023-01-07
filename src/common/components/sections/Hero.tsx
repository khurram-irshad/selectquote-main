import React from "react";
import { Type_Hero } from "@common/types";
import ColumnSection from "./Column";
import { ComponentContentTypes } from "@common/constants/app.constant";
import MultiColumnSection from "./MultiColumn";

const HeroSection = ({ section }: { section: Type_Hero }) => {
  const {
    gradientEndColor,
    gradientStartingColor,
    backgroundImage,
    topSection,
    content
  } = section.fields;

  return (
    <section
      className={`hero-section ${topSection ? " hero-section-border hero-section-shadow" : ""} `}
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
            {content?.map((item) => (
              <div
                key={item.sys.id}
                className={`d-flex`}
              >
                <div key={section.sys.id} style={{ width: "100%" }}>
                  {item.sys.contentType?.sys.id ===
                    ComponentContentTypes.MultiColumn ? (
                    <MultiColumnSection section={item} child={true} />
                  ) : (
                    <div style={{ padding: item?.fields.padding }}>
                      <ColumnSection section={item} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
