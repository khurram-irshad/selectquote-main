import * as Contentful from 'contentful';
import Device from './Type_Device';

interface HyperLink {
    title: Contentful.EntryFields.Symbol;
    url: Contentful.EntryFields.Symbol;
    linkUrl: Contentful.EntryFields.Symbol;
    color: Contentful.EntryFields.Symbol;
    fontSize: Contentful.EntryFields.Symbol;
    fontWeight: Contentful.EntryFields.Symbol;
    devices: Contentful.Entry<Device>[];
}

export type Type_HyperLink = Contentful.Entry<HyperLink>;
