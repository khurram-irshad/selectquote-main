import * as Contentful from "contentful";
import { PageCopy } from "./Type_PageCopy";
import { Type_SEO } from "./Type_SEO";
import { Type_Header } from "./Type_Header";

interface Page {
  title: Contentful.EntryFields.Symbol;
  navigationOnly?: Contentful.EntryFields.Symbol;
  smallNavbarOnly?: Contentful.EntryFields.Symbol;
  largeNavbarOnly?: Contentful.EntryFields.Symbol;
  slug?: Contentful.EntryFields.Symbol;
  gtmContainerId: Contentful.EntryFields.Symbol;
  sections: Contentful.Entry<any>[];
  seo: Type_SEO;
  header: Contentful.Entry<Type_Header>;
}

export type Type_Page = Contentful.Entry<Page>;
