import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import MultiColumnSection from "./MultiColumn";

interface CardProps {
  item: any;
  itemsMargin: string;
}

const Card = ({ item, itemsMargin }: CardProps) => {
  const { headerImage, content, imageMaxWidth, link } = item.fields;

  return (
    <div className="col-lg-3 col-xs-12 newsroom-card px-0">
      <a href={link} target="_blank">
        <div className="card-header">
          <img
            src={headerImage?.fields?.imageFile?.fields?.file?.url ?? ""}
          style={{maxWidth: imageMaxWidth}}
            alt="newsroom image header"
          />
        </div>
        <div className="card-content">
          {/* <span className="text-start">
            <RichTextRenderer
              text={content?.fields?.content}
            />
          </span> */}
          <MultiColumnSection section={content} />
        </div>
      </a>
    </div>
  );
};

export default Card;
