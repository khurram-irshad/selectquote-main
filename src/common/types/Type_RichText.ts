import * as Contentful from "contentful";
import * as CFRichTextTypes from "@contentful/rich-text-types";
import Device from "./Type_Device";

export type RichText = CFRichTextTypes.Block | CFRichTextTypes.Inline;

type CustomRichText = {
  content?: Contentful.Entry<RichText>;
  devices: Contentful.Entry<Device>[];
  contentId: Contentful.EntryFields.Symbol;
  scrollTopMargin?: Contentful.EntryFields.Symbol;
};

export type Type_RichText = Contentful.Entry<RichText>;
export type Type_RichTextCustom = Contentful.Entry<CustomRichText>;
