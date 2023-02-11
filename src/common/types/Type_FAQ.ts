import * as Contentful from 'contentful';
import Device from './Type_Device';
import { Type_RichText } from './Type_RichText';

interface FAQ {
    title?: Contentful.EntryFields.Symbol;
    list: Contentful.Entry<FAQ_ITEM>[];
    fullWidth: Contentful.EntryFields.Symbol;
    color: Contentful.EntryFields.Symbol;
    devices: Contentful.Entry<Device>[];
}

interface FAQ_ITEM {
    question?: Type_RichText;
    answer?: Type_RichText;
}

export type Type_FAQ = Contentful.Entry<FAQ>;
