import React from "react";

const review = {
  category: "Medicare Review",
  title: "The very best way to compare Medicare plans!",
  body: "I’ve been a Medicare recipient since 1993. This was the most easily understandable way I have yet discovered to compare Medicare plans. Their support doesn’t end when you enroll in the new plan either. This really surprised me. Thanks for this opportunity to make my voice heard!",
  author: "Michael, SelectQuote Medicare",
  color: "#00aec7",
};

const ReviewCard = () => (
  <div className="review-card container">
    <div className="col-xs-12 col-sm-12 col-md-4 border-end">
      <div
        className="card-header px-5 py-2"
        style={{ backgroundColor: review.color }}
      >
        <h2 className="text-center fs-3 fw-bolder">{review.category}</h2>
      </div>
      <div className="card-body d-grid gap-4 py-3 px-4">
        <div className="card-review-rating d-flex align-items-center justify-content-center">
          <img
            src="https://www.selectquote.com/wp-content/uploads/blue-five-stars-300x40.png"
            alt="5 start rating"
          />
        </div>
        <p className="text-center fw-bold">{review.title}</p>
        <p className="text-center">{review.body}</p>
        <p className="text-center fw-bold">{`- ${review.author}`}</p>
      </div>
    </div>
  </div>
);

export default ReviewCard;
