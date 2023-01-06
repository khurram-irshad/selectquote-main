import React from 'react'
import _ from 'lodash';
import CTASection from './CTA';
import { ComponentContentTypes } from '@constants/app.constant';
import RichTextSection from './RichText';
import RichTextContentSection from '@components/sections/RichTextCustom';
import ImageSection from './Image';
import Hyperlink from './Hyperlink';
import MarginSection from './Style';
import FAQSection from './FAQ';
import ButtonSection from './Button';

const ColumnSection = ({ section }: { section: any }) => {

  const contentTypeId = _.get(section?.fields?.content, 'sys.contentType.sys.id');
  const Component = ContentTypeMap[contentTypeId];

  if (!Component) {
    console.warn(`${contentTypeId} can not be handled`);
    return null;
  }

  const { id } = section.sys;
  const componentProps = {
    section: section?.fields?.content,
  };
  return <Component key={`${contentTypeId}-${id}`} {...componentProps} />;
}

export default ColumnSection

const ContentTypeMap = {
  [ComponentContentTypes.CTA]: CTASection,
  [ComponentContentTypes.Hyperlink]: Hyperlink,
  [ComponentContentTypes.RichText]: RichTextSection,
  [ComponentContentTypes.Image]: ImageSection,
  [ComponentContentTypes.RichTextContent]: RichTextContentSection,
  [ComponentContentTypes.Style]: MarginSection,
  [ComponentContentTypes.FAQ]: FAQSection,
  [ComponentContentTypes.Button]: ButtonSection,
};