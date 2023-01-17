import * as Contentful from "contentful";
import { Image } from "./Type_Image";

interface Hero {
  backgroundImage?: Contentful.Entry<Image>;
  gradientEndColor: Contentful.EntryFields.Symbol;
  gradientStartingColor: Contentful.EntryFields.Symbol;
  topSection?: Contentful.EntryFields.Boolean;
  content: Contentful.Entry<any>[];
}

export type Type_Hero = Contentful.Entry<Hero>;
