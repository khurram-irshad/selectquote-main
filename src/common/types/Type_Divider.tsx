import * as Contentful from 'contentful';

interface Divider {
    margin: Contentful.EntryFields.Symbol;
    thickBorder: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Boolean;
}

export type Type_Divider = Contentful.Entry<Divider>;
