import * as Contentful from 'contentful';
import { Type_RichText } from './Type_RichText';

interface FAQ {
    title?: Contentful.EntryFields.Symbol;
    list: Contentful.Entry<FAQ_ITEM>[];
    fullWidth: Contentful.EntryFields.Symbol;
}

interface FAQ_ITEM {
    question?: Type_RichText;
    answer?: Type_RichText;
}

export type Type_FAQ = Contentful.Entry<FAQ>;
