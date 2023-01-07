import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { useMediaQuery } from "react-responsive";

interface CardProps {
  item: any; // Type_ProductReview;
  child: number;
  itemsMargin: string;
}
const ProductReviewCard = ({ item, child, itemsMargin }: CardProps) => {
  const { color, title, content, showRating } = item.fields;
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  });

  const withBackground = [3, 4, 5, 9, 10, 11];

  return (
    <div
      className={`col-lg-4 col-md-12 review-card px-0
    } ${child % 3 < 2 || isDesktop ? "border-end min-vh-100" : ""}`}
      style={{
        backgroundColor:
          withBackground.includes(child) || isDesktop ? "#efefef" : "",
      }}
    >
      <div>
        <div
          className="card-header px-3 py-3"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-center fs-3 fw-bolder">{title}</h2>
        </div>
        <div className="card-body d-grid gap-4 py-3 px-4">
          {showRating && (
            <div className="card-review-rating d-flex align-items-center justify-content-center">
              <img
                src={`/images/content/${color.substring(1)}.png`}
                alt="5 start rating"
              />
            </div>
          )}
          <span className="text-center">
            <RichTextRenderer
              text={content?.fields?.content}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
