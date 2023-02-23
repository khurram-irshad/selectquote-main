import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { DeviceType } from "@common/types/Type_Device";
import { Type_Reviews } from "@common/types/Type_Reviews";

const ReviewSliderSection = ({ section }: { section: Type_Reviews }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  //const { title, content } = section.fields;
  const contents = [
    "Everything went well. People were very helpful and no pressure in choosing which insurance was good for me. Everything was explained in detail - I was very satisfied with everything!",
    "Very helpful, and the new plan they found for me will save me a lot of money in the coming years!",
  ];

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
    <div className="review-container">
      <p className="review-title">What our customers say</p>
      <Slider className="slider-list" {...settings}>
        {contents.map((item, index) => (
          <p className="review-content" key={index}>
            {item}
          </p>
        ))}
      </Slider>
      <div className="trust-pilot">
        <img src="/images/homepage/trustpilot.png" />
      </div>
    </div>
  );
};

export default ReviewSliderSection;
