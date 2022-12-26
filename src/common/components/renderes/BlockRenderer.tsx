import React from "react";
import _ from "lodash";
import { ComponentContentTypes } from "@constants/app.constant";
import HeroSection from "@components/sections/Hero";
import CTASection from "@components/sections/CTA";
import CarrierStripsSection from "@components/sections/CarrierStrips";
import FAQSection from "@components/sections/FAQ";
import MultiColumnSection from "@components/sections/MultiColumn";
import RichTextSection from "@components/sections/RichText";
import CustomerReview from "@components/sections/CustomerReviews";
import { Type_Page } from "@common/types";
import AgentReviewSection from "@components/sections/AgentReview";
import Hyperlink from "@components/sections/Hyperlink";
import ImageSection from "@components/sections/Image";
import RichTextContentSection from "@components/sections/RichTextCustom";
import ProductReviews from "@components/sections/Cards";

type BlockRendererProps = {
  page?: Type_Page;
  section: any;
};

const BlockRenderer = ({ page, section }: BlockRendererProps) => {
  if (Array.isArray(section)) {
    return (
      <>
        {section.map((b, index) => (
          <BlockRenderer key={index} page={page} section={b} />
        ))}
      </>
    );
  }
  const contentTypeId = _.get(section, "sys.contentType.sys.id");
  const Component = ContentTypeMap[contentTypeId];
  if (!Component) {
    console.warn(`${contentTypeId} can not be handled`);
    return null;
  }

  const { id } = section.sys;

  const componentProps = {
    section: section,
    page: page,
  };

  return <Component key={`${contentTypeId}-${id}`} {...componentProps} />;
};

const ContentTypeMap = {
  [ComponentContentTypes.Hero]: HeroSection,
  [ComponentContentTypes.AgentReview]: AgentReviewSection,
  [ComponentContentTypes.CTA]: CTASection,
  [ComponentContentTypes.CarrierStrips]: CarrierStripsSection,
  [ComponentContentTypes.FAQ]: FAQSection,
  [ComponentContentTypes.MultiColumn]: MultiColumnSection,
  [ComponentContentTypes.RichText]: RichTextSection,
  [ComponentContentTypes.CustomerReview]: CustomerReview,
  [ComponentContentTypes.Hyperlink]: Hyperlink,
  [ComponentContentTypes.Image]: ImageSection,
  [ComponentContentTypes.RichTextContent]: RichTextContentSection,
  [ComponentContentTypes.Cards]: ProductReviews,
};

export { BlockRenderer };
