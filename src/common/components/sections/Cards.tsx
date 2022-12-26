import {
  Type_Cards, Type_ProductReview,
} from "@common/types/Type_Cards";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";
import { useMediaQuery } from "react-responsive";

interface CardProps {
  item: any, // Type_ProductReview;
  child: number;
}

const Card = ({ item, child }: CardProps) => {
  const { color, title, content, showRating } = item.fields;
  const isDesktop = useMediaQuery({
    minWidth: 1024,
  });

  return (
    <div
      className={`review-card container-lg px-0 ${child % 3 < 2 || isDesktop ? "border-end" : ""
        }`}
    >
      <div className="col-xs-12 col-sm-12 col-md-12">
        <div
          className="card-header px-5 py-2"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-center fs-3 fw-bolder">{title}</h2>
        </div>
        <div className="card-body d-grid gap-4 py-3 px-4">
          <div className="card-review-rating d-flex align-items-center justify-content-center">
            <img
              src={`/images/content/${color.substring(1)}.png`}
              alt="5 start rating"
            />
          </div>
          <span className="text-center">
            <RichTextRenderer text={content.fields.content} />
          </span>
        </div>
      </div>
    </div>
  );
};

const CardsSection = ({ section }: { section: Type_Cards }) => {
  const { items, itemsMarginInPixel, itemsPerRow } = section.fields;

  return (
    <div className="d-flex flex-column flex-xs-column flex-sm-column flex-md-column flex-lg-row container-lg my-5 review-cards">
      {items.map((item, index) => (
        <Card key={index} item={item} child={index} />
      ))}
    </div>
  );
};

export default CardsSection;
