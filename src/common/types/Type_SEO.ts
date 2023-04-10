import * as Contentful from "contentful";
import { Image } from "./Type_Image";

interface SEO {
  description: Contentful.EntryFields.Symbol;
  keywords: Contentful.EntryFields.Symbol;
  noIndex: Contentful.EntryFields.Boolean;
  noFollow: Contentful.EntryFields.Boolean;
  includeInSitemap: Contentful.EntryFields.Symbol;
  shareCardImage: Contentful.Entry<Image>;
  canonicalUrl: Contentful.EntryFields.Symbol;
}

export type Type_SEO = Contentful.Entry<SEO>;
