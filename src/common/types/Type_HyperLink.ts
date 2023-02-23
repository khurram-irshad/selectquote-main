import * as Contentful from 'contentful';
import Device from './Type_Device';

interface HyperLink {
    title: Contentful.EntryFields.Symbol;
    linkUrl: Contentful.EntryFields.Symbol;
    devices: Contentful.Entry<Device>[];
    scrollToId: Contentful.EntryFields.Symbol;
}

export type Type_HyperLink = Contentful.Entry<HyperLink>;
