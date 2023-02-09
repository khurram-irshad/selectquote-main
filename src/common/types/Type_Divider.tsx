import * as Contentful from 'contentful';

interface Divider {
    margin: Contentful.EntryFields.Symbol;
    thickBorder: Contentful.EntryFields.Symbol;
    color: Contentful.EntryFields.Symbol;
    height: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Boolean;
}

export type Type_Divider = Contentful.Entry<Divider>;
