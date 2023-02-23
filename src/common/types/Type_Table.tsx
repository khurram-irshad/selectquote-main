import * as Contentful from 'contentful';
import Device from './Type_Device';
import { RichText } from './Type_RichText';

interface Table {
    rows: Contentful.Entry<Row>[];
    devices: Contentful.Entry<Device>[];
}
interface Row {
    columns: Contentful.Entry<Column>[];
    header: Contentful.EntryFields.Boolean;
    backgroundColor: Contentful.EntryFields.Symbol;
}
interface Column {
    content?: RichText;
    textAlign: Contentful.EntryFields.Symbol;

}

export type Type_Table = Contentful.Entry<Table>;
