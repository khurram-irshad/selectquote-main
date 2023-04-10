import * as Contentful from 'contentful';
import Device from './Type_Device';

interface Button {
    title: Contentful.EntryFields.Symbol;
    linkUrl: Contentful.EntryFields.Symbol;
    scrollToId: Contentful.EntryFields.Symbol;
    rounded: Contentful.EntryFields.Boolean;
    devices: Contentful.Entry<Device>[];
    hoverBackground: Contentful.EntryFields.Symbol;
    hoverColor: Contentful.EntryFields.Symbol;
    externalLink: Contentful.EntryFields.Boolean;
    titleText: Contentful.EntryFields.Symbol;
}

export type Type_Button = Contentful.Entry<Button>;
