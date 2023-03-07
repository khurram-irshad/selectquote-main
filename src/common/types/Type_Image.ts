import * as Contentful from "contentful";
import Device from "./Type_Device";

export interface Image {
  imageName: Contentful.EntryFields.Symbol;
  imageFile: Contentful.Asset;
  link?: Contentful.EntryFields.Symbol;
  externalLink: Contentful.EntryFields.Symbol;
  devices: Contentful.Entry<Device>[];
}

export type Type_Image = Contentful.Entry<Image>;
