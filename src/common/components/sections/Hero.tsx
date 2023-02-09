import React from "react";
import { Type_Hero } from "@common/types";
import ColumnSection from "./Column";
import { ComponentContentTypes } from "@common/constants/app.constant";
import MultiColumnSection from "./MultiColumn";
import { useRouter } from "next/router";

const HeroSection = ({ section }: { section: Type_Hero }) => {
  const {
    gradientEndColor,
    gradientStartingColor,
    backgroundImage,
    topSection,
    content,
    backgroundPosition = "center",
    gradientStartingPercentage = "48%",
    gradientEndPercentage = "55%",
    backgroundSize = "cover",
  } = section.fields;
  const path = useRouter().asPath;

  const bgPosition =
    path === "/newsroom" ? `50% 50%` : `right 0px ${backgroundPosition}`;

  return (
    <div className="hero-block">
      <div className="hero-section-desktop">
        <section
          className={`hero-section ${
            topSection ? "  hero-section-shadow" : ""
          } `}
          style={{
            backgroundSize: `${backgroundSize}`,
            backgroundPosition: `${bgPosition}`,
            backgroundImage: backgroundImage
              ? `linear-gradient(90deg,${gradientStartingColor} ${gradientStartingPercentage},${gradientEndColor} ${gradientEndPercentage}), url(https:${backgroundImage.fields.imageFile.fields.file.url})`
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
                  <div key={item.sys.id} className={`d-flex`}>
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
      </div>
      <div className="hero-section-mobile">
        <section
          className={`hero-section ${
            topSection ? " hero-section-border hero-section-shadow" : ""
          } `}
          style={{
            backgroundPosition: "right 0px center",
            backgroundImage: backgroundImage
              ? `linear-gradient(90deg,${gradientStartingColor} 1%,${gradientEndColor} 55%), url(https:${backgroundImage.fields.imageFile.fields.file.url})`
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
                  <div key={item.sys.id} className={`d-flex`}>
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
      </div>
    </div>
  );
};

export default HeroSection;
