import * as Contentful from "contentful";

export interface TypeImage {
  imageName: Contentful.EntryFields.Symbol;
  imageFile: Contentful.Asset;
  link?: Contentful.EntryFields.Symbol;
}
export interface TypeHeroImage {
  fields: TypeImage;
}

export type Type_Image = Contentful.Entry<TypeImage>;
