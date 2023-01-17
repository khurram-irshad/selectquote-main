import * as Contentful from "contentful";
import { Image } from "./Type_Image";

interface Carrier_Strips {
  title?: Contentful.EntryFields.Symbol;
  images: Contentful.Entry<Image>[];
  titleBackgroundColor: Contentful.EntryFields.Symbol;
  contentBackgroundColor: Contentful.EntryFields.Symbol;
  fullWidth: Contentful.EntryFields.Symbol;
}

export type Type_CarrierStrips = Contentful.Entry<Carrier_Strips>;
