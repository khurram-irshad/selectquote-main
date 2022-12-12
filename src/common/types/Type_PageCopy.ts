import * as Contentful from 'contentful';
import { Type_RichText } from './Type_RichText';

type SingleCopy = {
    id: Contentful.EntryFields.Symbol;
    copy: Contentful.Entry<Type_RichText>;
}

type SectionCopy = {
    sectionName: Contentful.EntryFields.Symbol;
    copies: Contentful.Entry<SingleCopy>[];
}

export type PageCopy = {
    id: Contentful.EntryFields.Symbol;
    sectionsCopy: Contentful.Entry<SectionCopy>[];
}