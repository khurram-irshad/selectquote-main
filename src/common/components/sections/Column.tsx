import React from 'react'
import _ from 'lodash';
import { ComponentContentTypes } from '@constants/app.constant';
import RichTextSection from '@components/sections/RichText';
import ImageSection from './Image';
import Hyperlink from './Hyperlink';
import MarginSection from './Style';
import FAQSection from './FAQ';
import ButtonSection from './Button';
import DividerSection from './Divider';
import MultiColumnSection from './MultiColumn';
import VideoSection from './Video';
import TableSection from './Table';
import CustomerReview from './CustomerReviews';

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
  [ComponentContentTypes.Hyperlink]: Hyperlink,
  [ComponentContentTypes.Image]: ImageSection,
  [ComponentContentTypes.RichTextContent]: RichTextSection,
  [ComponentContentTypes.Style]: MarginSection,
  [ComponentContentTypes.FAQ]: FAQSection,
  [ComponentContentTypes.Button]: ButtonSection,
  [ComponentContentTypes.Divider]: DividerSection,
  [ComponentContentTypes.MultiColumn]: MultiColumnSection,
  [ComponentContentTypes.Video]: VideoSection,
  [ComponentContentTypes.Table]: TableSection,
  [ComponentContentTypes.CustomerReview]: CustomerReview,
};