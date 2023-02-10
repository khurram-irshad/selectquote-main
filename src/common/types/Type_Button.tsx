import * as Contentful from 'contentful';
import Device from './Type_Device';

interface Button {
    title: Contentful.EntryFields.Symbol;
    backgroundColor: Contentful.EntryFields.Symbol;
    textColor: Contentful.EntryFields.Symbol;
    linkUrl: Contentful.EntryFields.Symbol;
    rounded: Contentful.EntryFields.Boolean;
    devices: Contentful.Entry<Device>[];
    fontSize: Contentful.EntryFields.Symbol;
}

export type Type_Button = Contentful.Entry<Button>;
