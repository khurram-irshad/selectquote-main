import * as Contentful from 'contentful';
import Device from './Type_Device';

interface Divider {
    margin: Contentful.EntryFields.Symbol;
    thickBorder: Contentful.EntryFields.Symbol;
    color: Contentful.EntryFields.Symbol;
    height: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Boolean;
    devices: Contentful.Entry<Device>[];
}

export type Type_Divider = Contentful.Entry<Divider>;
