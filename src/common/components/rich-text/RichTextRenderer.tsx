import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Hyperlink } from "./Link";
import { EmbeddedAsset } from "./EmbeddedAsset";

const PlainHyperlink = (props) => <Hyperlink {...props} type="PlainLink" />;
const AssetHyperlink = (props) => <Hyperlink {...props} type="AssetLink" />;

const RichTextRenderer = ({
  text,
  color,
}: {
  text: any;
  color?: string;
}) => {

  return (
    <>
      {documentToReactComponents(text, {
        renderNode: {
          [INLINES.HYPERLINK]: PlainHyperlink,
          [INLINES.ASSET_HYPERLINK]: AssetHyperlink,
          [INLINES.ENTRY_HYPERLINK]: () => null, // Ignore entry hyperlink
          [BLOCKS.EMBEDDED_ASSET]: EmbeddedAsset,
          [BLOCKS.PARAGRAPH]: (node, children) => <Text color={color}>{children}</Text>
        },
        renderText: text =>
          text.split("\n").flatMap((text, i) => [i > 0 && <div style={{ paddingBottom: '10px' }}></div>, text])
      })}
    </>
  );
};
const Text = ({ color, children }) => <p>{children}</p>;
export default RichTextRenderer;
