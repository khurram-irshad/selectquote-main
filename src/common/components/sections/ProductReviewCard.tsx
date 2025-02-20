import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MultiColumnSection from "./MultiColumn";

interface CardProps {
  item: any; // Type_ProductReview;
  child: number;
  itemsMargin: string;
}
const ProductReviewCard = ({ item, child, itemsMargin }: CardProps) => {
  const { color, title, content, showRating } = item.fields;
  const [screenWidth, setScreenWidth] = useState(0);
  const path = useRouter().asPath;
  const withBackground = [3, 4, 5, 9, 10, 11];

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`col-lg-4 col-md-12 review-card px-0
    ${child % 3 < 2 && screenWidth >= 1024
          ? "border-end"
          : screenWidth > 0 && screenWidth < 1024
            ? " border-right-0"
            : ""
        }
    ${path.includes("contact-us") ? " border-bottom" : ""}`}
      style={{
        backgroundColor:
          withBackground.includes(child) && screenWidth >= 1024
            ? "#efefef"
            : "",
      }}
    >
      <div>
        <div
          className="card-header px-4 py-4 review-card-header"
          style={{ backgroundColor: color}}
        >
          <h2 className="text-center fs-3 fw-bolder">{title}</h2>
        </div>
        <div
          className={`card-body d-flex flex-column justify-content-start d-grid gap-4 pb-4 px-4
          ${path.includes("customer-reviews") ? " card-body-p-override" : ""}`}
          style={{
            color: `${content.fields?.textColor} !important`,
            height:
              path.includes("customer-reviews") && screenWidth >= 1024
                ? "775px"
                : "",
          }}
        >
          {showRating && (
            <div className="card-review-rating d-flex align-items-center justify-content-center pt-4">
              <img
                src={`/images/content/${color?.substring(1)}.png`}
                alt="5 start rating"
              />
            </div>
          )}
          <span className="text-center">
            <MultiColumnSection section={content} />
            {/* <RichTextRenderer text={content?.fields?.content} /> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
