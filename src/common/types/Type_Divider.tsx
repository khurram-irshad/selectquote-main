import * as Contentful from 'contentful';

interface Divider {
    horizontal: Contentful.EntryFields.Boolean;
    vertical: Contentful.EntryFields.Boolean;
    margin: Contentful.EntryFields.Symbol;
}



export type Type_Divider = Contentful.Entry<Divider>;
