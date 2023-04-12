import { isDesktop, isMobile } from "@common/helpers/helper";
import { Type_RichTextCustom } from "@common/types";
import { DeviceType } from "@common/types/Type_Device";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { useGlobalContext } from "src/context";

type TextAlign = 'start' | 'end' | 'left' | 'right' | 'center';
export type WordBreak = "break-all" | "break-word" | "keep-all" | "normal";

const RichTextSection = ({ section }: { section: Type_RichTextCustom }) => {
  const { content, devices, contentId, scrollTopMargin } = section.fields;
  const { screenMode } = useGlobalContext();
  const desktop = devices?.find(
    (item) => item.fields?.type === DeviceType.Desktop
  );
  const mobile = devices?.find(
    (item) => item.fields?.type === DeviceType.Mobile
  );


  return (
    <>
      {isDesktop(screenMode) && (
        <span
          id={contentId}
          style={{
            padding: `${desktop?.fields?.padding}`,
            margin: `${desktop?.fields?.margin}`,
            width: `${desktop?.fields?.width}`,
            textAlign: `${desktop?.fields?.textAlign as TextAlign}`,
            display: desktop?.fields?.display ? desktop?.fields?.display : 'inline-block',
            scrollMarginTop: `${scrollTopMargin}`,
            maxWidth: desktop?.fields?.maxWidth,
            wordBreak: `${desktop?.fields?.wordBreak as WordBreak}`
          }}>
          <RichTextRenderer
            text={content}
            device={desktop?.fields}
          />
        </span>
      )}

      {isMobile(screenMode) && (
        <span
          id={contentId} style={{
            padding: `${mobile?.fields?.padding}`,
            margin: `${mobile?.fields?.margin}`,
            textAlign: `${mobile?.fields?.textAlign as TextAlign}`,
            width: `${mobile?.fields?.width}`,
            display: mobile?.fields?.display ? mobile?.fields?.display : 'inline-block',
            scrollMarginTop: `${scrollTopMargin}`,
            maxWidth: mobile?.fields?.maxWidth,
            wordBreak: mobile?.fields?.wordBreak as WordBreak
          }}>
          <RichTextRenderer
            text={content}
            device={mobile?.fields}
          />
        </span>
      )}
    </>
  );
};

export default RichTextSection;
