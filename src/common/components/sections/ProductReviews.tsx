import {
  Type_ProductReview,
  Type_ProductReviews,
} from "@common/types/Type_ProductReviews";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";

interface ReviewCardProps {
  review: any;
  child: number;
}

const ReviewCard = ({ review, child }: ReviewCardProps) => {
  const { color, category, title, author, content } = review.fields;
  const defaultClass = "review-card container px-0";

  return (
    <div className={`${defaultClass} ${child % 3 < 2 && "border-end"}`}>
      <div className="col-xs-12 col-sm-12 col-md-12">
        <div
          className="card-header px-5 py-2"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-center fs-3 fw-bolder">{category}</h2>
        </div>
        <div className="card-body d-grid gap-4 py-3 px-4">
          <div className="card-review-rating d-flex align-items-center justify-content-center">
            <img
              src="https://www.selectquote.com/wp-content/uploads/blue-five-stars-300x40.png"
              alt="5 start rating"
            />
          </div>
          <p className="text-center fw-bold">{title}</p>
          <p className="text-center">
            <RichTextRenderer text={content.fields.content} />
          </p>
          <p className="text-center fw-bold">{author}</p>
        </div>
      </div>
    </div>
  );
};

const ProductReviews = ({ section }: { section: Type_ProductReviews }) => {
  const { reviews } = section.fields;
  return (
    <div className="d-flex flex-row container my-5 review-cards">
      {reviews.map((item, index) => (
        <ReviewCard key={index} review={item} child={index} />
      ))}
    </div>
  );
};

export default ProductReviews;
