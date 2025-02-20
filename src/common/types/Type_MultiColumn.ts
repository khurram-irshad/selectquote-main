import * as Contentful from 'contentful';
import Device from './Type_Device';
import { Image } from "./Type_Image";

interface MultiColumn {
    columns: Contentful.Entry<any>[];
    columnPerRow: Contentful.EntryFields.Symbol;
    fullBackgroundColor: Contentful.EntryFields.Symbol;
    backgroundImage: Contentful.Entry<Image>;
    devices: Contentful.Entry<Device>[];
    tabletMode: Contentful.EntryFields.Boolean;
}

export type Type_MultiColumn = Contentful.Entry<MultiColumn>;
