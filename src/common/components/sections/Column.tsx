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
import { DeviceType } from '@common/types/Type_Device';
import SectionTrustPilot from './TrustPilot';
import { isDesktop, isMobile } from '@common/helpers/helper';
import { useGlobalContext } from 'src/context';
import InlineContentSection from './InlineContent';
import SliderSection from './Slider';

const ColumnSection = ({ section }: { section: any }) => {
  const desktop = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  const mobile = section?.fields?.devices?.find(item => item?.fields?.type === DeviceType.Mobile);
  const { screenMode } = useGlobalContext();

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
  return <>
    {isDesktop(screenMode) && (
      <div style={{
        width: '100%',
        padding: desktop?.fields?.padding,
        margin: desktop?.fields?.margin,
        display: desktop?.fields?.display ? desktop?.fields?.display : 'flex',
        justifyContent: `${desktop?.fields?.justifyContent}`,
        alignItems: desktop?.fields?.alignItems,
        backgroundColor: `${desktop?.fields?.backgroundColor}`,
        borderRadius: desktop?.fields?.borderRadius,
        float: desktop?.fields?.float,
      }}>
        <Component key={`${contentTypeId}-${id}`} {...componentProps} />
      </div>
    )}
    {isMobile(screenMode) && (
      <div style={{
        display: mobile?.fields?.display ? mobile?.fields?.display : 'flex',
        width: '100%', padding: mobile?.fields?.padding, margin: mobile?.fields?.margin,
        justifyContent: `${mobile?.fields?.justifyContent}`,
        alignItems: mobile?.fields?.alignItems,
        backgroundColor: `${mobile?.fields?.backgroundColor}`,
        borderRadius: mobile?.fields?.borderRadius,
        float: mobile?.fields?.float,
      }}>
        <Component key={`${contentTypeId}-${id}`} {...componentProps} />
      </div>
    )}
  </>;
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
  [ComponentContentTypes.TrustPilot]: SectionTrustPilot,
  [ComponentContentTypes.InlineContent]: InlineContentSection,
  [ComponentContentTypes.SliderSection]: SliderSection,
};