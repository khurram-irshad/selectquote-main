import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { DeviceType } from "@common/types/Type_Device";
import { Type_Slider } from "@common/types/Type_Slider";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
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


  const renderImage = (image) => {
    const desktop = image?.fields?.devices?.find(item => item.fields?.type === DeviceType.Desktop);
    const mobile = image?.fields?.devices?.find(item => item.fields?.type === DeviceType.Mobile);
    return <>
      <img
        className="wp-container-desktop"
        src={`https:${image.fields.imageFile.fields.file.url}`}
        width={desktop?.fields?.width ? desktop.fields.width : image?.fields?.imageFile?.fields?.file?.details?.image
          ?.width}
        height={desktop?.fields?.height ? desktop.fields.height : image?.fields?.imageFile?.fields?.file?.details?.image
          ?.height}
        alt={image.fields.imageName}
      />
      <img
        className="wp-container-mobile"
        src={`https:${image.fields.imageFile.fields.file.url}`}
        width={mobile?.fields?.width ? mobile.fields.width : image?.fields?.imageFile?.fields?.file?.details?.image
          ?.width}
        height={mobile?.fields?.height ? mobile.fields.height : image?.fields?.imageFile?.fields?.file?.details?.image
          ?.height}
        alt={image.fields.imageName}
      />
    </>
  }

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
            <div className="companies d-flex align-items-center justify-content-around">
              {images.map((image) => (
                <div
                  className="company d-flex align-items-center justify-content-center"
                  key={image.sys.id}
                >
                  {renderImage(image)}
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
          className="bottom wp-container-mobile-block"
          style={{ backgroundColor: mobile?.fields?.backgroundColor, padding: mobile?.fields?.padding }}
        >
          <Slider className="companies-slider" {...settings}>
            {images.map((image) => (
              <div className="company position-relative" key={image.sys.id}>
                {renderImage(image)}
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default SliderSection;
