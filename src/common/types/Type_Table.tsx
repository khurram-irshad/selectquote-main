import * as Contentful from 'contentful';
import { RichText, Type_RichText, Type_RichTextCustom } from './Type_RichText';

interface Table {
    rows: Contentful.Entry<Row>[];
}
interface Row {
    columns: Contentful.Entry<Column>[];
    header: Contentful.EntryFields.Boolean;
    backgroundColor: Contentful.EntryFields.Symbol;
    textColor: Contentful.EntryFields.Symbol;
}
interface Column {
    content?: RichText;
    textAlign: Contentful.EntryFields.Symbol;

}

export type Type_Table = Contentful.Entry<Table>;
