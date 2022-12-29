import { Type_Cards } from "@common/types/Type_Cards";
import _ from "lodash";
import React from "react";
import ProductReviewCard from "./ProductReviewCard";
import Card from "./Card";
import { ComponentContentTypes } from "@common/constants/app.constant";
const CardsSection = ({ section }: { section: Type_Cards }) => {
  const { items, itemsMargin, itemsPerRow } = section.fields;

  const getComponent = (item, index, itemsMargin) => {
    const contentTypeId = _.get(item, "sys.contentType.sys.id");

    const Component = ContentTypeMap[contentTypeId];
    if (!Component) {
      console.warn(`Component: Cards -${contentTypeId} can not be handled`);
      return null;
    }
    const { id } = item.sys;
    const componentProps = {
      item: item,
      child: index,
      itemsMargin,
    };
    return <Component key={`${contentTypeId}-${id}`} {...componentProps} />;
  };

  return (
    <div className="container">
      <div className="row d-flex my-5 review-cards">
        {items.map((item, index) => (
          <>{getComponent(item, index, itemsMargin)}</>
        ))}
      </div>
    </div>
  );
};

const ContentTypeMap = {
  [ComponentContentTypes.ProductReview]: ProductReviewCard,
  [ComponentContentTypes.Card]: Card,
};

export default CardsSection;
