import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { Type_CarrierStrips } from "@common/types";

const settings = {
  dots: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

const CarrierStripsSection = ({ section }: { section: Type_CarrierStrips }) => {
  const {
    title,
    images,
    titleBackgroundColor,
    contentBackgroundColor,
    fullWidth,
  } = section.fields;
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className={`company-section ${fullWidth ? "container-fluid px-0" : ""}`}
    >
      <div
        className="top d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: titleBackgroundColor,
        }}
      >
        <RichTextRenderer text={title} />
        <div
          className="arrow"
          style={{ borderTopColor: titleBackgroundColor }}
        ></div>
      </div>
      <div
        className="bottom"
        style={{ backgroundColor: contentBackgroundColor }}
      >
        {screenWidth > 0 && screenWidth < 1024 && (
          <Slider className="companies-slider" {...settings}>
            {images.map((image) => (
              <div className="company position-relative" key={image.sys.id}>
                <img
                  src={`https:${image.fields.imageFile.fields.file.url}`}
                  width={
                    image?.fields?.imageFile?.fields?.file?.details?.image
                      ?.width
                  }
                  height={
                    image?.fields?.imageFile?.fields?.file?.details?.image
                      ?.height
                  }
                  alt={image.fields.imageName}
                />
              </div>
            ))}
          </Slider>
        )}
        {screenWidth > 0 && screenWidth > 1023 && (
          <div className="companies d-flex align-items-center justify-content-between">
            {images.map((image) => (
              <div
                className="company d-flex align-items-center justify-content-center"
                key={image.sys.id}
              >
                <img
                  src={`https:${image.fields.imageFile.fields.file.url}`}
                  width={
                    image?.fields?.imageFile?.fields?.file?.details?.image
                      ?.width
                  }
                  height={
                    image?.fields?.imageFile?.fields?.file?.details?.image
                      ?.height
                  }
                  alt={image.fields.imageName}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CarrierStripsSection;
