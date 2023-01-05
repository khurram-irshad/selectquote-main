import { Type_CustomerReviews } from "@common/types/Type_CustomerReviews";
import React from "react";

const CustomerReview = ({ section }: { section: Type_CustomerReviews }) => {
  const { title, backgroundColor, fullWidth } = section.fields;
  return (
    <section className="review-section" style={{ backgroundColor }}>
      <div className={fullWidth ? "container-fluid px-0" : ""}>
        <h2>{title}</h2>
        <div
          id="trustbox"
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id="54ad5defc6454f065c28af8b"
          data-businessunit-id="5400958400006400057a03de"
          data-style-height="240px"
          data-style-width="100%"
          data-theme="light"
          data-stars="4,5"
          data-review-languages="en"
        >
          <a
            href="https://www.trustpilot.com/review/selectquote.com?utm_medium=trustbox&utm_source=Slider"
            target="_blank"
            rel="noopener"
          >
            Trustpilot
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;
