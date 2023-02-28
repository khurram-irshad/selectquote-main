import * as Contentful from 'contentful';
import Device from './Type_Device';

interface HyperLink {
    title: Contentful.EntryFields.Symbol;
    type: Contentful.EntryFields.Symbol;
    linkUrl: Contentful.EntryFields.Symbol;
    devices: Contentful.Entry<Device>[];
    scrollToId: Contentful.EntryFields.Symbol;
    color: Contentful.EntryFields.Symbol;
    fontSize: Contentful.EntryFields.Symbol;
    fontWeight: Contentful.EntryFields.Symbol;
    hoverBackground: Contentful.EntryFields.Symbol;
    hoverColor: Contentful.EntryFields.Symbol;
}

export type Type_HyperLink = Contentful.Entry<HyperLink>;
