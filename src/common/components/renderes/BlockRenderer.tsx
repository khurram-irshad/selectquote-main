import React from "react";
import _ from "lodash";
import { ComponentContentTypes } from "@constants/app.constant";
import HeroSection from "@components/sections/Hero";
import CarrierStripsSection from "@components/sections/CarrierStrips";
import FAQSection from "@components/sections/FAQ";
import MultiColumnSection from "@components/sections/MultiColumn";
import CustomerReview from "@components/sections/CustomerReviews";
import { Type_Page } from "@common/types";
import AgentReviewSection from "@components/sections/AgentReview";
import Hyperlink from "@components/sections/Hyperlink";
import ImageSection from "@components/sections/Image";
import RichTextContentSection from "@components/sections/RichText";
import ProductReviews from "@components/sections/Cards";
import StyleSection from "@components/sections/Style";
import ButtonSection from "@components/sections/Button";
import PartnershipFormSection from "@components/sections/PartnershipForm";
import TabsSection from "@components/sections/Tabs";

type BlockRendererProps = {
  page?: Type_Page;
  section: any;
};

const BlockRenderer = ({ page, section }: BlockRendererProps) => {
  if (Array.isArray(section)) {
    return (
      <>
        {section.map((b, index) => {
          const fullWidth = b?.fields?.fullWidth;
          // wp-container class to be added here
          return (
            <div
              className={
                fullWidth ? "container-fluid px-0" : "container wp-container"
              }
              key={index}
            >
              <BlockRenderer key={index} page={page} section={b} />
            </div>
          );
        })}
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
  [ComponentContentTypes.CarrierStrips]: CarrierStripsSection,
  [ComponentContentTypes.FAQ]: FAQSection,
  [ComponentContentTypes.MultiColumn]: MultiColumnSection,
  [ComponentContentTypes.CustomerReview]: CustomerReview,
  [ComponentContentTypes.Hyperlink]: Hyperlink,
  [ComponentContentTypes.Image]: ImageSection,
  [ComponentContentTypes.RichTextContent]: RichTextContentSection,
  [ComponentContentTypes.Cards]: ProductReviews,
  [ComponentContentTypes.Style]: StyleSection,
  [ComponentContentTypes.Button]: ButtonSection,
  [ComponentContentTypes.PartnershipForm]: PartnershipFormSection,
  [ComponentContentTypes.Tabs]: TabsSection,
};

export { BlockRenderer };
