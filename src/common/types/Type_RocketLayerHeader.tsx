import * as Contentful from "contentful";
import { Image } from "./Type_Image";

interface RocketLayerHeader {
  appLogo: Contentful.Entry<Image>;
  rocketLawyerLogo: Contentful.Entry<Image>;
  primaryNumber:  Contentful.EntryFields.Symbol;
  secondaryNumber:  Contentful.EntryFields.Symbol;
}

export type Type_RocketLayerHeader = Contentful.Entry<RocketLayerHeader>;
