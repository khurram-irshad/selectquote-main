import * as Contentful from 'contentful';
import Device from './Type_Device';

interface Divider {
    thickBorder: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Boolean;
    devices: Contentful.Entry<Device>[];
}

export type Type_Divider = Contentful.Entry<Divider>;
