import React from "react";
import Slider from "react-slick";
import { DeviceType } from "@common/types/Type_Device";
import { Type_Slider } from "@common/types/Type_Slider";
import { isDesktop, isMobile } from "@common/helpers/helper";
import { useGlobalContext } from "src/context";

const settings = {
  dots: false,
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
  const { screenMode } = useGlobalContext();

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
        className={`company-section }`}
        style={{ margin: desktop?.fields?.margin }}
      >
        <div
          style={{ backgroundColor: desktop?.fields?.backgroundColor, padding: desktop?.fields?.padding }}
        >
            <div className="companies d-flex align-items-center justify-content-between">
              {images.map((image) => (
                <div
                  className="company d-flex align-items-center justify-content-center"
                  key={image.sys.id}
                >
                  {image.fields?.link ? (
                    <a href={`${image.fields?.link}`}
                    > {renderImage(image)}</a>

                  ) : (
                    renderImage(image)
                  )}
                </div>
              ))}
            </div>
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
            <Slider className="companies-slider" {...settings}>
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
