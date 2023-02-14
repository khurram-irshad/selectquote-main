import * as Contentful from "contentful";
import Device from "./Type_Device";
import { Image } from "./Type_Image";

interface Slider {
  images: Contentful.Entry<Image>[];
  devices: Contentful.Entry<Device>[];
}

export type Type_Slider = Contentful.Entry<Slider>;
