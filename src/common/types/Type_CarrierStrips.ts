import * as Contentful from "contentful";
import Device from "./Type_Device";
import { Image } from "./Type_Image";

interface Carrier_Strips {
  images: Contentful.Entry<Image>[];
  devices: Contentful.Entry<Device>[];
}

export type Type_CarrierStrips = Contentful.Entry<Carrier_Strips>;
