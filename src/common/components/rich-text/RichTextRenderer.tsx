import React, { ReactNode } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Hyperlink } from "./Link";
import { EmbeddedAsset } from "./EmbeddedAsset";

const PlainHyperlink = (props) => <Hyperlink {...props} type="PlainLink" />;
const AssetHyperlink = (props) => <Hyperlink {...props} type="AssetLink" />;

const Text = ({
  color,
  children,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  fontFamily,
  overflowWrap
}: {
  color?: string;
  children: ReactNode;
  lineHeight?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  fontFamily?: string;
  overflowWrap?: 'break-word' | 'normal' | 'initial' | 'inherit';
}) => {
  return (
    <p
      style={{
        fontWeight: `${fontWeight}`,
        color:`${color}`,
        fontSize: `${fontSize}`,
        lineHeight: `${lineHeight}`,
        letterSpacing: `${letterSpacing}`,
        fontFamily: `${fontFamily}`,
        overflowWrap: `${overflowWrap}`
      }}
    >
      {children}
    </p>
  );
};
const RichTextRenderer = ({
  text,
  color,
  lineHeight,
  fontSize,
  fontWeight,
  letterSpacing,
  fontFamily,
  overflowWrap
}: {
  text: any;
  color?: string;
  lineHeight?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  fontFamily?: string;
  overflowWrap?: 'break-word' | 'normal' | 'initial' | 'inherit'
}) => {
  return (
    <>
      {documentToReactComponents(text, {
        renderNode: {
          [INLINES.HYPERLINK]: PlainHyperlink,
          [INLINES.ASSET_HYPERLINK]: AssetHyperlink,
          [INLINES.ENTRY_HYPERLINK]: () => null, // Ignore entry hyperlink
          [BLOCKS.EMBEDDED_ASSET]: EmbeddedAsset,
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <Text
              color={color}
              fontWeight={fontWeight}
              fontSize={fontSize}
              lineHeight={lineHeight}
              letterSpacing={letterSpacing}
              fontFamily={fontFamily}
              overflowWrap ={overflowWrap}
            >
              {children}
            </Text>
          ),
        },
        renderText: (text) =>
          text
            .split("\n")
            .flatMap((text, i) => [
              i > 0 && (
                <div key={i.toString()} style={{ paddingBottom: "10px" }}></div>
              ),
              text,
            ]),
      })}
    </>
  );
};

export default RichTextRenderer;
