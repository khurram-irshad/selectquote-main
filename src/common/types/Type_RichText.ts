import * as Contentful from 'contentful';
import * as CFRichTextTypes from '@contentful/rich-text-types';

export type RichText = CFRichTextTypes.Block | CFRichTextTypes.Inline;

type CustomRichText= {
    content?: Contentful.Entry<RichText>;
    backgroundColor: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Symbol;
    textAlign: Contentful.EntryFields.Symbol;
    width: Contentful.EntryFields.Symbol;
    padding: Contentful.EntryFields.Symbol;
}

export type Type_RichText = Contentful.Entry<RichText>;
export type Type_RichTextCustom = Contentful.Entry<CustomRichText>;



