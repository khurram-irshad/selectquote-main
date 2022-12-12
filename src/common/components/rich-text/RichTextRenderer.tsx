import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Hyperlink } from './Link';
import { EmbeddedAsset } from './EmbeddedAsset';


const PlainHyperlink = (props) => <Hyperlink {...props} type="PlainLink" />;
const AssetHyperlink = (props) => <Hyperlink {...props} type="AssetLink" />;

const RichTextRenderer = ({ text }: { text: any }) => {
    return <>
        {documentToReactComponents(text, {
            renderNode: {
                [INLINES.HYPERLINK]: PlainHyperlink,
                [INLINES.ASSET_HYPERLINK]: AssetHyperlink,
                [INLINES.ENTRY_HYPERLINK]: () => null, // Ignore entry hyperlink
                [BLOCKS.EMBEDDED_ASSET]: EmbeddedAsset,
            },
        })}
    </>
}

export default RichTextRenderer