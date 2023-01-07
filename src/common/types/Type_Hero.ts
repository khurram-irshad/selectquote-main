import * as Contentful from "contentful";
import { TypeHeroImage } from "./Type_Image";

interface Hero {
  backgroundImage?: TypeHeroImage;
  gradientEndColor: Contentful.EntryFields.Symbol;
  gradientStartingColor: Contentful.EntryFields.Symbol;
  topSection?: Contentful.EntryFields.Boolean;
  content: Contentful.Entry<any>[];
}

export type Type_Hero = Contentful.Entry<Hero>;
