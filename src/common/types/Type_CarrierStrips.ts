import * as Contentful from "contentful";
import { TypeImage } from "./Type_Image";

interface Carrier_Strips {
  title?: Contentful.EntryFields.Symbol;
  images: Contentful.Entry<TypeImage>[];
  titleBackgroundColor: Contentful.EntryFields.Symbol;
  contentBackgroundColor: Contentful.EntryFields.Symbol;
  fullWidth: Contentful.EntryFields.Symbol;
}

export type Type_CarrierStrips = Contentful.Entry<Carrier_Strips>;
