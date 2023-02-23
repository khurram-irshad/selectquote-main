import * as Contentful from "contentful";
import { Image } from "./Type_Image";

interface Reviews {
  title?: Contentful.EntryFields.Symbol;
  content?: Contentful.EntryFields.Symbol;
}

export type Type_Reviews = Contentful.Entry<Reviews>;
