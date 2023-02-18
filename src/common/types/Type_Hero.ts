import * as Contentful from "contentful";
import { Image } from "./Type_Image";

interface Hero {
  backgroundImage?: Contentful.Entry<Image>;
  backgroundImageMobile?: Contentful.Entry<Image>;
  gradientEndColor: Contentful.EntryFields.Symbol;
  gradientStartingColor: Contentful.EntryFields.Symbol;
  topSection?: Contentful.EntryFields.Boolean;
  content: Contentful.Entry<any>[];
  backgroundPosition?: Contentful.EntryFields.Symbol;
  gradientStartingPercentage?: Contentful.EntryFields.Symbol;
  gradientEndPercentage?: Contentful.EntryFields.Symbol;
  backgroundSize?: Contentful.EntryFields.Symbol;
  mobileContentPaddingTop?: Contentful.EntryFields.Symbol;
  mobileGradientStartingPercent?: Contentful.EntryFields.Symbol;
  mobileGradientEndPercent?: Contentful.EntryFields.Symbol;
  mobileBackgroundSize?: Contentful.EntryFields.Symbol;
  reverseImagePosition?: Contentful.EntryFields.Boolean;
  mobileImageHeight?: Contentful.EntryFields.Symbol;
  mobileImageWidth?: Contentful.EntryFields.Symbol;
}

export type Type_Hero = Contentful.Entry<Hero>;
