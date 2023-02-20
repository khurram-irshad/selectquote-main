import * as Contentful from "contentful";

interface Video {
  video: Contentful.Asset
  title: Contentful.EntryFields.Symbol;
  body: Contentful.EntryFields.Symbol;
  footer?: Contentful.EntryFields.Symbol;
}

export type Type_Video = Contentful.Entry<Video>;
