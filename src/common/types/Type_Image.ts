import * as Contentful from "contentful";

export interface Image {
  imageName: Contentful.EntryFields.Symbol;
  imageFile: Contentful.Asset;
  link?: Contentful.EntryFields.Symbol;
}

export type Type_Image = Contentful.Entry<Image>;
