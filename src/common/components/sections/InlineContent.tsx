import { Type_InlineContent } from "@common/types/Type_InlineContent";
import _ from 'lodash';
import { ComponentContentTypes } from "@common/constants/app.constant";
import RichTextSection from "./RichText";
import Hyperlink from "./Hyperlink";
import { DeviceType } from "@common/types/Type_Device";
import { isDesktop, isMobile } from "@common/helpers/helper";
import { useGlobalContext } from "src/context";

const InlineContentSection = ({ section }: { section: Type_InlineContent }) => {
    const { content, devices } = section.fields;
    const { screenMode } = useGlobalContext();
    const desktop = devices?.find(
        (item) => item.fields?.type === DeviceType.Desktop
    );
    const mobile = devices?.find(
        (item) => item.fields?.type === DeviceType.Mobile
    );

    if (Array.isArray(content)) {
        return (
            <>
                {isDesktop(screenMode) && (
                    <div
                        className={`${desktop?.fields?.flexWrap ? desktop?.fields?.flexWrap : 'flex-wrap'}`}
                        style={{
                            display: desktop?.fields?.display ? desktop?.fields?.display : 'flex',
                            justifyContent: `${desktop?.fields?.justifyContent}`,
                            alignItems: desktop?.fields?.alignItems,
                            width: desktop?.fields?.width
                        }} >
                        {content.map((item, index) => {
                            const contentTypeId = _.get(item, 'sys.contentType.sys.id');
                            const Component = ContentTypeMap[contentTypeId];

                            if (!Component) {
                                console.warn(`${contentTypeId} can not be handled`);
                                return null;
                            }

                            const { id } = section.sys;
                            const componentProps = {
                                section: item,
                            };

                            return <Component key={`${contentTypeId}-${id}`} {...componentProps} />
                        })}
                    </div>
                )}
                {isMobile(screenMode) && (
                    <div
                        className={`${mobile?.fields?.flexWrap ? mobile?.fields?.flexWrap : 'flex-wrap'}`}
                        style={{
                            display: mobile?.fields?.display ? mobile?.fields?.display : 'flex',
                            justifyContent: `${mobile?.fields?.justifyContent}`,
                            alignItems: mobile?.fields?.alignItems
                        }} >
                        {content.map((item, index) => {
                            const contentTypeId = _.get(item, 'sys.contentType.sys.id');
                            const Component = ContentTypeMap[contentTypeId];

                            if (!Component) {
                                console.warn(`${contentTypeId} can not be handled`);
                                return null;
                            }

                            const { id } = section.sys;
                            const componentProps = {
                                section: item,
                            };

                            return <Component key={`${contentTypeId}-${id}`} {...componentProps} />
                        })}
                    </div>
                )}
            </>
        );
    }
};

export default InlineContentSection;

const ContentTypeMap = {
    [ComponentContentTypes.Hyperlink]: Hyperlink,
    [ComponentContentTypes.RichTextContent]: RichTextSection,
};

