import * as Contentful from 'contentful';
import { RichText, Type_RichTextCustom } from './Type_RichText';

interface ColorText {
    title: Type_RichTextCustom;
    items: Type_RichTextCustom[];
}


export type Type_ColorText = Contentful.Entry<ColorText>;
