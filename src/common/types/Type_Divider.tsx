import * as Contentful from 'contentful';

interface Divider {
    horizontal: Contentful.EntryFields.Boolean;
    vertical: Contentful.EntryFields.Boolean;
}



export type Type_Divider = Contentful.Entry<Divider>;
