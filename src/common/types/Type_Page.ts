import * as Contentful from "contentful";
import { PageCopy } from "./Type_PageCopy";
import { Type_Footer } from "./Type_Footer";
import { Type_SEO } from "./Type_SEO";
import { Type_Header } from "./Type_Header";

interface Page {
  title: Contentful.EntryFields.Symbol;
  navigationOnly?: Contentful.EntryFields.Symbol;
  smallNavbarOnly?: Contentful.EntryFields.Symbol;
  largeNavbarOnly?: Contentful.EntryFields.Symbol;
  slug?: Contentful.EntryFields.Symbol;
  sections: Contentful.Entry<any>[];
  seo: Type_SEO;
  footer: Contentful.Entry<Type_Footer>;
  sideSections: Contentful.Entry<any>[];
  header: Contentful.Entry<Type_Header>;
}

type QuoteForm = Page & {
  header: Contentful.Entry<Type_Footer>;
  copy: Contentful.Entry<PageCopy>;
  steps?: Contentful.Entry<QuoteFormStep>[];
};

type QuoteFormStep = Pick<Page, "title" | "slug" | "sections"> & {
  stepCopy: Contentful.Entry<PageCopy>;
};

export type TypeComponent_Quote_Form = Contentful.Entry<QuoteForm>;
export type TypeComponent_Quote_Form_Step = Contentful.Entry<QuoteFormStep>;

export type Type_Page = Contentful.Entry<Page>;
