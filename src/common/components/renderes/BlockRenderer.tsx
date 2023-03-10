import React from "react";
import _ from "lodash";
import { ComponentContentTypes } from "@constants/app.constant";
import HeroSection from "@components/sections/Hero";
import SliderSection from "@components/sections/Slider";
import FAQSection from "@components/sections/FAQ";
import MultiColumnSection from "@components/sections/MultiColumn";
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
import GallerySection from "@components/sections/Gallery";
import FundingFormSection from "@components/sections/FundingForm";
import DividerSection from "@components/sections/Divider";
import TableSection from "@components/sections/Table";
import ColorTextSection from "@components/sections/ColorText";
import { DeviceType } from "@common/types/Type_Device";
import SectionTrustPilot from "@components/sections/TrustPilot";
import StaticReviewsSection from "@components/sections/StaticReviews";
import { useGlobalContext } from "src/context";
import { isDesktop, isMobile } from "@common/helpers/helper";

type BlockRendererProps = {
  page?: Type_Page;
  section: any;
};

const BlockRenderer = ({ page, section }: BlockRendererProps) => {

  const { screenMode } = useGlobalContext();


  if (Array.isArray(section)) {
    return (
      <div className="block-render">
        {section.map((item, index) => {
          const desktop = item?.fields?.devices?.find(
            (item) => item.fields?.type === DeviceType.Desktop
          );
          const mobile = item?.fields?.devices?.find(
            (item) => item.fields?.type === DeviceType.Mobile
          );
          const fullBackgroundColor = item?.fields?.fullBackgroundColor;
          const fullBackgroundImage = item?.fields?.fullBackgroundImage;
          const fullWidth = desktop?.fields?.fullWidth;
          const fullWidthMobile = mobile?.fields?.fullWidth;

          console.log(fullBackgroundColor || fullWidth)

          return (
            <>
              {isDesktop(screenMode) && (
                <div
                  className={`desktop-blockrender ${fullBackgroundColor || fullWidth
                    ? "container-fluid px-0"
                    : "container"
                    }`}
                  style={{
                    backgroundColor: fullBackgroundColor
                      ? fullBackgroundColor
                      : "",
                    backgroundImage: `url(https:${fullBackgroundImage?.fields?.imageFile?.fields?.file?.url})`,
                  }}
                  key={`${index}-desktop`}
                >
                  {fullBackgroundColor || fullBackgroundImage ? (
                    <div className="container">
                      <BlockRenderer key={index} page={page} section={item} />
                    </div>
                  ) : (
                    <BlockRenderer key={index} page={page} section={item} />
                  )}
                </div>
              )}
              {isMobile(screenMode) && (
                <div
                  className={`mobile-blockrender ${fullBackgroundColor || fullWidthMobile
                    ? "container-fluid px-0"
                    : "container"
                    }`}
                  style={{
                    backgroundColor: fullBackgroundColor
                      ? fullBackgroundColor
                      : "",
                    backgroundImage: `url(https:${fullBackgroundImage?.fields?.imageFile?.fields?.file?.url})`,
                  }}
                  key={`${index}-mobile`}
                >
                  {fullBackgroundColor || fullBackgroundImage ? (
                    <div className="container">
                      <BlockRenderer key={index} page={page} section={item} />
                    </div>
                  ) : (
                    <BlockRenderer key={index} page={page} section={item} />
                  )}
                </div>
              )}
            </>
          );
        })}
      </div>
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
  [ComponentContentTypes.SliderSection]: SliderSection,
  [ComponentContentTypes.FAQ]: FAQSection,
  [ComponentContentTypes.MultiColumn]: MultiColumnSection,
  [ComponentContentTypes.Hyperlink]: Hyperlink,
  [ComponentContentTypes.Image]: ImageSection,
  [ComponentContentTypes.RichTextContent]: RichTextContentSection,
  [ComponentContentTypes.Cards]: ProductReviews,
  [ComponentContentTypes.Style]: StyleSection,
  [ComponentContentTypes.Button]: ButtonSection,
  [ComponentContentTypes.PartnershipForm]: PartnershipFormSection,
  [ComponentContentTypes.Tabs]: TabsSection,
  [ComponentContentTypes.Gallery]: GallerySection,
  [ComponentContentTypes.FundingForm]: FundingFormSection,
  [ComponentContentTypes.Divider]: DividerSection,
  [ComponentContentTypes.Table]: TableSection,
  [ComponentContentTypes.ColorText]: ColorTextSection,
  [ComponentContentTypes.TrustPilot]: SectionTrustPilot,
  [ComponentContentTypes.StaticReviews]: StaticReviewsSection,
};

export { BlockRenderer };
