import { RichText, Type_RichText } from "./Type_RichText";
import * as Contentful from "contentful";
import Device from "./Type_Device";

export interface Image {
  imageName: Contentful.EntryFields.Symbol;
  imageFile: Contentful.Asset;
  link?: Contentful.EntryFields.Symbol;
  externalLink: Contentful.EntryFields.Symbol;
  quality: Contentful.EntryFields.Symbol;
  fill: Contentful.EntryFields.Boolean;
  devices: Contentful.Entry<Device>[];
  tooltip?: Contentful.Entry<Type_RichText>;
  tooltipId?: Contentful.EntryFields.Symbol;
}

export type Type_Image = Contentful.Entry<Image>;
