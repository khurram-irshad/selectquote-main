import * as Contentful from "contentful";
import Device from "./Type_Device";

interface StaticReviews {
  title: Contentful.EntryFields.Symbol;
  items: Contentful.Entry<any>[];
  devices: Contentful.Entry<Device>[];
}

export type Type_Reviews = Contentful.Entry<StaticReviews>;
