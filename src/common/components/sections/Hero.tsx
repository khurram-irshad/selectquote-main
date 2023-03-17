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
    padding = '0',
  } = section.fields;
  const path = useRouter().asPath;
  const [screenWidth, setScreenWidth] = useState(0);

  
  // let bgPosition = path.includes('/newsroom') ? `50% 50%` : `right 0px ${backgroundPosition}`;
  // bgPosition = path.includes('customer-reviews') && screenWidth >= 1024 && screenWidth <= 1280 ? `right -150px ${backgroundPosition}` : backgroundPosition;
  // bgPosition = path.includes('leadership') && screenWidth >= 1024 && screenWidth <= 1280 ? `70% 0px !important` : bgPosition;
  // bgPosition = path.includes('/faqs') && screenWidth >= 1024 && screenWidth <= 1280 ? `70% 0px !important` : bgPosition;
  // bgPosition = path.includes('leadership') && screenWidth >= 580 && screenWidth <= 980 ? `center` : bgPosition;

  let bgPosition = ``
    //path === "/newsroom" ? `50% 50%` : `right 0px ${backgroundPosition}`;
  
  if (path === "/newsroom") {
    bgPosition = `50% 50%`
    console.log('news')
  } else if (path.includes('customer-reviews') && screenWidth >= 1024 && screenWidth <= 1280) {
    bgPosition = `right -150px ${backgroundPosition}`
    console.log('customer')
  } else if ((path.includes('faqs') || path.includes('leadership')) && screenWidth >= 1024 && screenWidth <= 1280) {
    bgPosition = `70% 0px`
    console.log('faqs')
  } else if (path.includes('/leadership') && screenWidth >= 580 && screenWidth <= 980) {
    bgPosition = `center`
    console.log('leader')
  } else { 
    console.log('default')
    bgPosition = `right 0px  ${backgroundPosition}`
  }

  
  // console.log(bgPosition)
  // bgPosition = path.includes('customer-reviews') && screenWidth >= 1024 && screenWidth <= 1280 ? `right -150px ${backgroundPosition}` : bgPosition;
  // bgPosition = path.includes('/faqs') && screenWidth >= 1024 && screenWidth <= 1280 ? `70% 0px !important` : bgPosition;

  const bgSize = path.includes('leadership') && screenWidth >= 580 && screenWidth <= 980 ? `cover` : mobileBackgroundSize;
  const bgImage = path.includes('customer-reviews') && screenWidth >= 1024 && screenWidth <= 1280 ? `linear-gradient(90deg,${gradientStartingColor} 33%,${gradientEndColor} 36%), url(https:${backgroundImage.fields.imageFile.fields.file.url})` : `linear-gradient(90deg,${gradientStartingColor} ${gradientStartingPercentage},${gradientEndColor} ${gradientEndPercentage}), url(https:${backgroundImage.fields.imageFile.fields.file.url})`
  
  
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
          className={`hero-section ${topSection ? "  hero-section-shadow" : ""
            } ${!topSection ? 'container' : ''}`}
          style={{
            backgroundSize: `${backgroundSize}`,
            backgroundPosition: `${bgPosition}`,
            backgroundImage: backgroundImage
              ? `${bgImage}`
              : "",
            //padding,
          }}
        >
          <div
            className={
              `hero-content d-flex align-items-center  wp-container ${topSection ? 'container' : ''}`
            }
          >
            <div className="w-50 position-relative">
              <div className="content-left">
                {content?.map((item) => (
                  <div key={item.sys.id} className={`d-flex`}>
                    <div key={section.sys.id} style={{ width: "100%" }}>
                      {item.sys.contentType?.sys.id ===
                        ComponentContentTypes.MultiColumn ? (
                        <MultiColumnSection section={item}  />
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
            className={`hero-section ${path.includes('/faqs') ? ' spacing-top' : ''}`}
            style={{
              // backgroundColor: "#f8f8f8",
              backgroundSize: `${bgSize}`,
              backgroundPosition: `center top`,
              backgroundImage:
                backgroundImageMobile && topSection
                  ? `linear-gradient(0deg,${gradientStartingColor} ${mobileGradientStartingPercent},${gradientEndColor} ${mobileGradientEndPercent}), url(https:${backgroundImageMobile.fields.imageFile.fields.file.url})`
                  : "",
            }}
          >
            <div
              className={"hero-content d-flex align-items-center"}
              style={{
                paddingTop:
                  topSection && backgroundImageMobile
                    ? mobileContentPaddingTop
                    : "0",
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
