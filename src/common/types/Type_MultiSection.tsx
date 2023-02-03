import * as Contentful from 'contentful';
import { RichText } from './Type_RichText';
import { Image } from "./Type_Image";

interface MultiSection {
    sections: Contentful.Entry<any>[];
    title: RichText;
    backgroundImage?: Contentful.Entry<Image>;
}


export type Type_MultiSection = Contentful.Entry<MultiSection>;
