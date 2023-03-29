import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Hyperlink } from "./Link";
import { EmbeddedAsset } from "./EmbeddedAsset";
import Device from "@common/types/Type_Device";

const PlainHyperlink = (props: any) => <Hyperlink {...props} type="PlainLink" /> as any;
const AssetHyperlink = (props: any) => <Hyperlink {...props} type="AssetLink" /> as any;

const RichTextRenderer = ({
  text,
  device
}: {
  text: any;
  device?: Device
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
            return (
              <span
                style={{
                  fontWeight: `${device?.fontWeight}`,
                  color: `${device?.textColor}`,
                  fontSize: `${device?.fontSize}`,
                  lineHeight: `${device?.lineHeight}`,
                  letterSpacing: `${device?.letterSpacing}`,
                  fontFamily: `${device?.fontFamily}`,
                  overflowWrap: `${device?.overflowWrap}`,
                  background: device?.backgroundColor,
                
                }}
              >
                {children}
              </span>
            );
          },
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
