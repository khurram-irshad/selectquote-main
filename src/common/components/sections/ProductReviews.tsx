import { Type_ProductReview, Type_ProductReviews } from "@common/types/Type_ProductReviews";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";

const ReviewCard = ({ review }: { review: any }) => {
  const { color, category, title, author, content } = review.fields;
  console.log(review, '----------rev')
  return <div className="review-card container">
    <div className="col-xs-12 col-sm-12 col-md-4 border-end">
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
        <p className="text-center"> <RichTextRenderer text={content.fields.content} /></p>
        <p className="text-center fw-bold">{author}</p>
      </div>
    </div>
  </div>
}

const ProductReviews = ({ section }: { section: Type_ProductReviews }) => {
  const { reviews } = section.fields;
  return (
    <div className="d-flex flex-row">
      {reviews.map(item => (
        <ReviewCard review={item} />
      ))}
    </div>
  )
}


export default ProductReviews;
