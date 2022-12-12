import * as Contentful from "contentful";
import { TypeImage } from "./Type_Image";

interface Header {
  title: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  logo: Contentful.Entry<TypeImage>;
  logoWithTag: Contentful.Entry<TypeImage>;
  contactNumber: Contentful.EntryFields.Symbol;
  bannerText: Contentful.EntryFields.Symbol;
  primaryButtonText: Contentful.EntryFields.Symbol;
  menuItems: Contentful.Entry<MenuItems>[];
}

interface MenuItems {
  linkText: Contentful.EntryFields.Symbol;
  linkUrl: Contentful.EntryFields.Symbol;
  parent: Contentful.EntryFields.Symbol;
  hyperlink: Contentful.EntryFields.Symbol;
  childItems: Contentful.Entry<MenuItems>[];
}

export type Type_Header = Contentful.Entry<Header>;
