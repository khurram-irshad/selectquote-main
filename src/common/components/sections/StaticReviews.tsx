import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { DeviceType } from "@common/types/Type_Device";
import { Type_Reviews } from "@common/types/Type_Static_Reviews";
import MultiColumnSection from "./MultiColumn";
import RichTextSection from "./RichText";
import ColumnSection from "./Column";

const StaticReviewsSection = ({ section }: { section: Type_Reviews }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const { items, title, devices } = section.fields;

  const desktop = devices?.find(
    (item) => item.fields?.type === DeviceType.Desktop
  );
  const mobile = devices?.find(
    (item) => item.fields?.type === DeviceType.Mobile
  );


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
  };

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
      <div className="review-container " >
        <div className="wp-container-desktop" style={{ padding: desktop?.fields?.padding, width: desktop?.fields?.width }}>
          <p className="review-title">
            <RichTextRenderer
              text={title}
            />
          </p>
          <Slider className="slider-list" {...settings}>
            {items.map((item, index) => (
              <>
                <RichTextSection key={index} section={item} />
                <div className="trust-pilot">
                  <img src="/images/homepage/trustpilot.png" />
                </div>
              </>
            ))}
          </Slider>

        </div>
        <div className="wp-container-mobile" style={{ padding: mobile?.fields?.padding, width: mobile?.fields?.width }}>
          <p className="review-title">
            <RichTextRenderer
              text={title}
            />
          </p>
          <Slider className="slider-list" {...settings}>
            {items.map((item, index) => (
              <>
                <RichTextSection key={index} section={item} />
                <div className="trust-pilot">
                  <img src="/images/homepage/trustpilot.png" />
                </div>
              </>
            ))}
          </Slider>

        </div>
      </div>
    </>
  );
};

export default StaticReviewsSection;
