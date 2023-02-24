import { Type_Cards } from "@common/types/Type_Cards";
import _ from "lodash";
import React from "react";
import ProductReviewCard from "./ProductReviewCard";
import Card from "./Card";
import { ComponentContentTypes } from "@common/constants/app.constant";
import { DeviceType } from "@common/types/Type_Device";
const CardsSection = ({ section }: { section: Type_Cards }) => {
  const { items, itemsMargin, devices } = section.fields;

  const desktop = devices?.find(item => item.fields.type === DeviceType.Desktop);
  const mobile = devices?.find(item => item.fields.type === DeviceType.Mobile);

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
    <>
      <div className="cards-container" >
        <div className="row d-flex review-cards-desktop" style={{ margin: desktop?.fields?.margin, padding: desktop?.fields?.padding }}>
          {items.map((item, index) => (
            <>{getComponent(item, index, itemsMargin)}</>
          ))}
        </div>
        <div className="row d-flex review-cards-mobile w-100 m-0" style={{ margin: mobile?.fields?.margin, padding: mobile?.fields?.padding }}>
          {items.map((item, index) => (
            <>{getComponent(item, index, itemsMargin)}</>
          ))}
        </div>
      </div>
    </>
  );
};

const ContentTypeMap = {
  [ComponentContentTypes.ProductReview]: ProductReviewCard,
  [ComponentContentTypes.Card]: Card,
};

export default CardsSection;
