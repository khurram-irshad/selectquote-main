import React from "react";
import Slider from "react-slick";
import { DeviceType } from "@common/types/Type_Device";
import { Type_Slider } from "@common/types/Type_Slider";
import { isDesktop, isMobile } from "@common/helpers/helper";
import { useGlobalContext } from "src/context";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 4000,
  autoplaySpeed: 1000,
  cssEase: "linear",
  arrows: false,
  responsive: [
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

const SliderSection = ({ section }: { section: Type_Slider }) => {
  const {
    images,
    devices,
    dots,
    infinite, speed, slideToShow, autoplay
  } = section.fields;
  const { screenMode } = useGlobalContext();
  console.log(section.fields, '-------section.fields')
  const desktop = devices?.find(item => item.fields?.type === DeviceType.Desktop);
  const mobile = devices?.find(item => item.fields?.type === DeviceType.Mobile);

  const renderImage = (image) => {
    const desktop = image?.fields?.devices?.find(item => item.fields?.type === DeviceType.Desktop);
    const mobile = image?.fields?.devices?.find(item => item.fields?.type === DeviceType.Mobile);
    return <>
      {isDesktop(screenMode) && (<img
        src={`https:${image.fields.imageFile.fields.file.url}`}
        width={desktop?.fields?.width ? desktop.fields.width : image?.fields?.imageFile?.fields?.file?.details?.image
          ?.width}
        height={desktop?.fields?.height ? desktop.fields.height : image?.fields?.imageFile?.fields?.file?.details?.image
          ?.height}
        alt={image.fields.imageName}
      />
      )}
      {isMobile(screenMode) && (
        <img
          src={`https:${image.fields.imageFile.fields.file.url}`}
          width={mobile?.fields?.width ? mobile.fields.width : image?.fields?.imageFile?.fields?.file?.details?.image
            ?.width}
          height={mobile?.fields?.height ? mobile.fields.height : image?.fields?.imageFile?.fields?.file?.details?.image
            ?.height}
          alt={image.fields.imageName}
        />
      )}
    </>
  }

  return (
    <>
      {isDesktop(screenMode) && (<section
        style={{ margin: desktop?.fields?.margin }}
        className={`company-section `}
      >
        <div
          style={{ backgroundColor: desktop?.fields?.backgroundColor, padding: desktop?.fields?.padding }}
        >
          <Slider className="companies-slider" {...settings} dots={dots} slidesToShow={slideToShow} infinite={infinite} speed={speed} autoplay={autoplay}>
            {images.map((image) => (
              <div className="company position-relative" key={image.sys.id}>
                {renderImage(image)}
              </div>
            ))}
          </Slider>
        </div>
      </section>
      )}
      {isMobile(screenMode) && (
        <section
          style={{ margin: mobile?.fields?.margin }}
          className={`company-section `}
        >
          <div
            style={{ backgroundColor: mobile?.fields?.backgroundColor, padding: mobile?.fields?.padding }}
          >
            <Slider className="companies-slider" {...settings} dots={dots} slidesToShow={slideToShow} infinite={infinite} speed={speed} autoplay={autoplay}>
              {images.map((image) => (
                <div className="company position-relative" key={image.sys.id}>
                  {renderImage(image)}
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}
    </>
  );
};

export default SliderSection;
