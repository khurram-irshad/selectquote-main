import * as Contentful from "contentful";
import Device from "./Type_Device";
import { Image } from "./Type_Image";

interface Slider {
  images: Contentful.Entry<Image>[];
  devices: Contentful.Entry<Device>[];
  dots: Contentful.EntryFields.Symbol;
  infinite: Contentful.EntryFields.Boolean;
  speed: Contentful.EntryFields.Number;
  slideToShow: Contentful.EntryFields.Number;
  autoplay: Contentful.EntryFields.Boolean;
}

export type Type_Slider = Contentful.Entry<Slider>;
