import * as Contentful from 'contentful';

interface HyperLink {
    title: Contentful.EntryFields.Symbol;
    url: Contentful.EntryFields.Symbol;
    color: Contentful.EntryFields.Symbol;
    fontSize: Contentful.EntryFields.Symbol;
    fontWeight: Contentful.EntryFields.Symbol;
}

export type Type_HyperLink = Contentful.Entry<HyperLink>;
