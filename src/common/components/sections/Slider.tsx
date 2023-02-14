import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { DeviceType } from "@common/types/Type_Device";
import { Type_Slider } from "@common/types/Type_Slider";

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

const SliderSection = ({ section }: { section: Type_Slider }) => {
  const {
    images,
    devices
  } = section.fields;
  const [screenWidth, setScreenWidth] = useState(0);

  const desktop = devices?.find(item => item.fields?.type === DeviceType.Desktop);
  const mobile = devices?.find(item => item.fields?.type === DeviceType.Mobile);


  useEffect(() => {
    setScreenWidth(window.innerWidth);
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section
        className={`company-section ${desktop?.fields?.fullWidth ? "container-fluid px-0" : ""}`}
        style={{ margin: desktop?.fields?.margin }}
      >
        <div
          className="bottom wp-container-desktop"
          style={{ backgroundColor: desktop?.fields?.backgroundColor, padding: desktop?.fields?.padding }}
        >
          {screenWidth > 0 && screenWidth > 1024 && (
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

      <section
       style={{ margin: mobile?.fields?.margin }}
        className={`company-section ${mobile?.fields?.fullWidth ? "container-fluid px-0" : ""}`}
      >
        <div
          className="bottom wp-container-mobile"
          style={{ backgroundColor: mobile?.fields?.backgroundColor, padding: mobile?.fields?.padding }}
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
        </div>
      </section>
    </>
  );
};

export default SliderSection;
