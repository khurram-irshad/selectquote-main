import * as Contentful from 'contentful';
import { Type_RichText } from './Type_RichText';


interface CTA {
    title?: Contentful.EntryFields.Symbol;
    content?: Contentful.Entry<Type_RichText>;
    buttonText: Contentful.EntryFields.Symbol;
    requiredZipCode: Contentful.EntryFields.Symbol;
    backgroundColor: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Symbol;
    direction: Contentful.EntryFields.Symbol;
    color: Contentful.EntryFields.Symbol;
    padding: Contentful.EntryFields.Symbol;
}

export type Type_CTA = Contentful.Entry<CTA>;
