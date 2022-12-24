import * as Contentful from "contentful";
import { TypeHeroImage, TypeImage } from "./Type_Image";
import { Type_RichText } from "./Type_RichText";


interface Hero {
  title: Contentful.EntryFields.Symbol;
  content?: Contentful.Entry<Type_RichText>;
  backgroundImage?: TypeHeroImage;
  buttonText: Contentful.EntryFields.Symbol;
  fullWidth: Contentful.EntryFields.Boolean;
  gradientEndColor: Contentful.EntryFields.Symbol;
  gradientStartingColor: Contentful.EntryFields.Symbol;
  textColor: Contentful.EntryFields.Symbol;
  actionImage?: TypeImage;
}

export type Type_Hero = Contentful.Entry<Hero>;
