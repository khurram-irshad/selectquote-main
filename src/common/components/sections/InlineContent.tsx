import { Type_InlineContent } from "@common/types/Type_InlineContent";
import _ from 'lodash';
import { ComponentContentTypes } from "@common/constants/app.constant";
import RichTextSection from "./RichText";
import Hyperlink from "./Hyperlink";

const InlineContentSection = ({ section }: { section: Type_InlineContent }) => {
    const { content, devices } = section.fields;

    if (Array.isArray(content)) {
        return (
            <div className="block-render">
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
        );
    }
};

export default InlineContentSection;

const ContentTypeMap = {
    [ComponentContentTypes.Hyperlink]: Hyperlink,
    [ComponentContentTypes.RichTextContent]: RichTextSection,
};