import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Hyperlink } from "./Link";
import { EmbeddedAsset } from "./EmbeddedAsset";
import { addColour } from '.'

const PlainHyperlink = (props: any) => <Hyperlink {...props} type="PlainLink" /> as any;
const AssetHyperlink = (props: any) => <Hyperlink {...props} type="AssetLink" /> as any;

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
    < >
      {documentToReactComponents(text, {
        renderNode: {
          [INLINES.HYPERLINK]: PlainHyperlink,
          [INLINES.ASSET_HYPERLINK]: AssetHyperlink,
          [INLINES.ENTRY_HYPERLINK]: () => null, // Ignore entry hyperlink
          [BLOCKS.EMBEDDED_ASSET]: EmbeddedAsset,
          [BLOCKS.PARAGRAPH]: (node, children) => {
            if ((node.content[0] as {value:string}).value === "") {
              return <br />;
            } else {
              return (
                <p
                  style={{
                    fontWeight: `${fontWeight}`,
                    color: `${color}`,
                    fontSize: `${fontSize}`,
                    lineHeight: `${lineHeight}`,
                    letterSpacing: `${letterSpacing}`,
                    fontFamily: `${fontFamily}`,
                    overflowWrap: `${overflowWrap}`
                  }}
                >
                  {addColour(children as any)}
                </p>
              );
            }
        },
          },
        // renderText: (text) =>
        //   text
        //     .split("\n")
        //     .flatMap((text, i) => [
        //       i > 0 && (
        //         <div key={i.toString()} style={{ paddingBottom: "10px" }}></div>
        //       ),
        //       text,
        //     ]),
      })}
    </>
  );
};

export default RichTextRenderer;
