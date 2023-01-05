import RichTextRenderer from "@components/rich-text/RichTextRenderer";

interface CardProps {
  item: any;
  itemsMargin: string;
}

const Card = ({ item, itemsMargin }: CardProps) => {
  const { headerImage, content } = item.fields;

  return (
    <div className="col-lg-3 col-md-12 newsroom-card px-0">
      <div className="card-header">
        <img
          src={headerImage?.fields?.imageFile?.fields?.file?.url ?? ""}
          alt="newsroom image header"
        />
      </div>
      <div className="card-content">
        <span className="text-start">
          <RichTextRenderer
            text={content?.fields?.content}
          />
        </span>
      </div>
    </div>
  );
};

export default Card;
