import * as Contentful from "contentful";
import Device from "./Type_Device";


type InlineContent = {
  content?: Contentful.Entry<any>[];
  devices: Contentful.Entry<Device>[];
};

export type Type_InlineContent = Contentful.Entry<InlineContent>;
