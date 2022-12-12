import * as Contentful from 'contentful';

interface Theme {
    color: Contentful.EntryFields.Symbol;
    backgroundColor: Contentful.EntryFields.Symbol;
}


export type Type_Theme = Contentful.Entry<Theme>;
