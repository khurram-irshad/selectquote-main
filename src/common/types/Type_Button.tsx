import * as Contentful from 'contentful';

interface Button {
    title: Contentful.EntryFields.Symbol;
    backgroundColor: Contentful.EntryFields.Symbol;
    textColor: Contentful.EntryFields.Symbol;
    linkUrl: Contentful.EntryFields.Symbol;
}



export type Type_Button = Contentful.Entry<Button>;
