import * as Contentful from "contentful";
import * as CFRichTextTypes from "@contentful/rich-text-types";
import Device from "./Type_Device";

export type RichText = CFRichTextTypes.Block | CFRichTextTypes.Inline;

type CustomRichText = {
  content?: Contentful.Entry<RichText>;
  textColor: Contentful.EntryFields.Symbol;
  backgroundColor: Contentful.EntryFields.Symbol;
  fullWidth: Contentful.EntryFields.Symbol;
  textAlign: Contentful.EntryFields.Symbol;
  width: Contentful.EntryFields.Symbol;
  padding: Contentful.EntryFields.Symbol;
  fontSize: Contentful.EntryFields.Symbol;
  fontWeight: Contentful.EntryFields.Symbol;
  lineHeight: Contentful.EntryFields.Symbol;
  letterSpacing: Contentful.EntryFields.Symbol;
  fontFamily: Contentful.EntryFields.Symbol;
  devices: Contentful.Entry<Device>[];
};

export type Type_RichText = Contentful.Entry<RichText>;
export type Type_RichTextCustom = Contentful.Entry<CustomRichText>;
