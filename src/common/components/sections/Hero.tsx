import React, { useEffect, useState } from "react";
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
    backgroundImageMobile,
    topSection,
    content,
    backgroundPosition = "center",
    gradientStartingPercentage = "48%",
    gradientEndPercentage = "55%",
    backgroundSize = "cover",
    mobileContentPaddingTop = "200px",
    mobileGradientStartingPercent = "58%",
    mobileGradientEndPercent = "68%",
    mobileBackgroundSize = "contain",
    reverseImagePosition,
    mobileImageHeight,
    mobileImageWidth,
    padding = "0",
  } = section.fields;
  const path = useRouter().asPath;
  const [screenWidth, setScreenWidth] = useState(0);

  let bgPosition = ``;

  if (path === "/newsroom") {
    bgPosition = `50% 50%`;
  } else if (
    path.includes("customer-reviews") &&
    screenWidth >= 1024 &&
    screenWidth <= 1280
  ) {
    bgPosition = `right -150px ${backgroundPosition}`;
  } else if (
    (path.includes("faqs") || path.includes("leadership")) &&
    screenWidth >= 1024 &&
    screenWidth <= 1280
  ) {
    bgPosition = `70% 0px`;
  } else if (
    path.includes("leadership") &&
    screenWidth >= 580 &&
    screenWidth <= 980
  ) {
    bgPosition = `center`;
  } else if (
    path.includes("tv-commercial") &&
    screenWidth >= 1024 &&
    screenWidth <= 1280
  ) {
    bgPosition = "300%";
  } else if (path === "/" || path.includes("/?")) {
    bgPosition = "right";
  } else {
    bgPosition = `right 0px  ${backgroundPosition}`;
  }

  let bgSize =
    (path.includes("leadership") ||
      path.includes("customer-review") ||
      path.includes("/newsroom") ||
      path.includes("/careers") ||
      path.includes("contact")) &&
    screenWidth >= 580 &&
    screenWidth <= 980
      ? `cover`
      : mobileBackgroundSize;
  bgSize =
    path.includes("leadership") && screenWidth >= 752 && screenWidth <= 767
      ? "contain"
      : bgSize;
  let bgImage =
    path.includes("customer-reviews") &&
    screenWidth >= 1024 &&
    screenWidth <= 1280
      ? `linear-gradient(90deg,${gradientStartingColor} 33%,${gradientEndColor} 36%), url(https:${backgroundImage.fields.imageFile.fields.file.url})`
      : `linear-gradient(90deg,${gradientStartingColor} ${gradientStartingPercentage},${gradientEndColor} ${gradientEndPercentage}), url(https:${backgroundImage.fields.imageFile.fields.file.url})`;
  bgImage =
    path.includes("rocket-lawyer") && screenWidth >= 1750 && screenWidth <= 2000
      ? `linear-gradient(90deg,${gradientStartingColor} 58%,${gradientEndColor} 62%), url(https:${backgroundImage.fields.imageFile.fields.file.url})`
      : `linear-gradient(90deg,${gradientStartingColor} ${gradientStartingPercentage},${gradientEndColor} ${gradientEndPercentage}), url(https:${backgroundImage.fields.imageFile.fields.file.url})`;

  let bgImageMobile =
    backgroundImageMobile &&
    topSection &&
    (path.includes("leadership") && screenWidth >= 768 && screenWidth <= 980
      ? `linear-gradient(0deg,${gradientStartingColor} 37%,${gradientEndColor} 44%), url(https:${backgroundImageMobile.fields.imageFile.fields.file?.url})`
      : `linear-gradient(0deg,${gradientStartingColor} ${mobileGradientStartingPercent},${gradientEndColor} ${mobileGradientEndPercent}), url(https:${backgroundImageMobile.fields.imageFile.fields.file.url})`);
  bgImageMobile =
    backgroundImageMobile &&
    topSection &&
    (path.includes("about") && screenWidth >= 580 && screenWidth <= 980
      ? `linear-gradient(0deg,${gradientStartingColor} 33%,${gradientEndColor} 47%), url(https:${backgroundImageMobile.fields.imageFile.fields.file?.url})`
      : `linear-gradient(0deg,${gradientStartingColor} ${mobileGradientStartingPercent},${gradientEndColor} ${mobileGradientEndPercent}), url(https:${backgroundImageMobile.fields.imageFile.fields.file.url})`);

  let bgPositionMobile =
    path.includes("leadership") && screenWidth >= 768 && screenWidth <= 980
      ? "center"
      : "center top";

  let mobilePaddingContent =
    topSection && backgroundImageMobile
      ? path.includes("about") && screenWidth >= 580 && screenWidth <= 980
        ? "400px"
        : mobileContentPaddingTop
      : 0;

  useEffect(() => {
    const hero = document.getElementById("heroSection");
    const heroContent = document.getElementById("heroContent");
    hero.classList.remove("container");
    heroContent.classList.add("container");
    if (
      screenWidth >= 1620 &&
      (path.includes("auto-and-home-insurance") ||
        path.includes("auto-and-home-insurance/car-insurance") ||
        path === "/" ||
        path.includes("?search="))
    ) {
      hero.classList.add("container");
      hero.classList.remove("hero-section-shadow");
      heroContent.classList.remove("container");
    }
  }, [screenWidth]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="hero-block">
      <div className="hero-section-desktop ">
        <section
          className={`hero-section ${
            topSection ? "  hero-section-shadow" : ""
          } ${!topSection ? "container" : ""}`}
          style={{
            backgroundSize: `${backgroundSize}`,
            backgroundPosition: `${bgPosition}`,
            backgroundImage: backgroundImage ? `${bgImage}` : "",
            //padding,
          }}
          id="heroSection"
        >
          <div
            className={`hero-content d-flex align-items-center  wp-container ${
              topSection ? "container" : ""
            }`}
            id="heroContent"
          >
            <div className="w-50 position-relative">
              <div className="content-left">
                {content?.map((item) => (
                  <div key={item.sys.id} className={`d-flex`}>
                    <div key={section.sys.id} style={{ width: "100%" }}>
                      {item.sys.contentType?.sys.id ===
                      ComponentContentTypes.MultiColumn ? (
                        <MultiColumnSection section={item} />
                      ) : (
                        <ColumnSection section={item} />
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
        {!reverseImagePosition && (
          <section
            className={`hero-section ${
              path.includes("/faqs") ? " spacing-top" : ""
            }`}
            style={{
              // backgroundColor: "#f8f8f8",
              backgroundSize: `${bgSize}`,
              backgroundPosition: bgPositionMobile,
              backgroundImage: bgImageMobile || "",
            }}
          >
            <div
              className={"hero-content d-flex align-items-center"}
              style={{
                paddingTop: mobilePaddingContent,
              }}
            >
              <div style={{ padding: topSection ? "40px 0" : "0 0 40px 0" }}>
                <div>
                  {content?.map((item) => (
                    <div key={item.sys.id} className={`d-flex`}>
                      <div key={section.sys.id} style={{ width: "100%" }}>
                        {item.sys.contentType?.sys.id ===
                        ComponentContentTypes.MultiColumn ? (
                          <MultiColumnSection section={item} />
                        ) : (
                          <div>
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
        )}
        {reverseImagePosition && (
          <section className="hero-section">
            <div
              className={"hero-content d-flex align-items-center"}
              style={{}}
            >
              <div style={{ padding: topSection ? "40px 0" : "0 0 40px 0" }}>
                <div>
                  {content?.map((item) => (
                    <div key={item.sys.id} className={`d-flex`}>
                      <div key={section.sys.id} style={{ width: "100%" }}>
                        {item.sys.contentType?.sys.id ===
                        ComponentContentTypes.MultiColumn ? (
                          <MultiColumnSection section={item} />
                        ) : (
                          <div>
                            <ColumnSection section={item} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {backgroundImageMobile && (
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "100%",
                }}
              >
                <div
                  className="hero-image"
                  style={{
                    backgroundSize: `cover`,
                    backgroundPosition: "center top",
                    backgroundImage: `url(https:${backgroundImageMobile.fields.imageFile.fields.file.url})`,
                    backgroundRepeat: "no-repeat",
                    minHeight: `${mobileImageHeight}`,
                  }}
                />
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
