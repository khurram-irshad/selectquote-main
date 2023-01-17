import * as Contentful from "contentful";
import { Image } from "./Type_Image";

export interface Gallery {
    images: Contentful.Entry<Image>[];
}

export type Type_Gallery = Contentful.Entry<Gallery>;
