import * as Contentful from "contentful";
import { TypeImage } from "./Type_Image";

interface SEO {
  description: Contentful.EntryFields.Symbol;
  keywords: Contentful.EntryFields.Symbol;
  noIndex: Contentful.EntryFields.Boolean;
  noFollow: Contentful.EntryFields.Boolean;
  includeInSitemap: Contentful.EntryFields.Symbol;
  shareCardImage: Contentful.Entry<TypeImage>;
  shareCardUrl: Contentful.EntryFields.Symbol;
  canonicalUrl: Contentful.EntryFields.Symbol;
}

export type Type_SEO = Contentful.Entry<SEO>;
