import * as Contentful from "contentful";
import { Image } from "./Type_Image";

interface RocketLayerHeader {
  appLogo: Contentful.Entry<Image>;
  rocketLawyerHeader: Contentful.Entry<Image>;
  primaryNumber:  Contentful.EntryFields.Symbol;
  secondayNumber:  Contentful.EntryFields.Symbol;
}

export type Type_RocketLayerHeader = Contentful.Entry<RocketLayerHeader>;
