import * as Contentful from "contentful";
import { Type_RichText } from "./Type_RichText";

interface Footer {
  slug?: Contentful.EntryFields.Symbol;
  footerColumns?: Contentful.Entry<FooterColumn>[];
  footerLinks?: Contentful.Entry<any>[];
  footerContent?: Contentful.Entry<Type_RichText>;
}

interface FooterColumn {
  title: Contentful.EntryFields.Symbol;
  sections?: Contentful.Entry<any>[];
  direction?: Contentful.EntryFields.Symbol;
}

export type Type_Footer = Contentful.Entry<Footer>;
