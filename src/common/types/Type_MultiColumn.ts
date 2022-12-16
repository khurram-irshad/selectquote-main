import * as Contentful from 'contentful';

interface MultiColumn {
    title?: Contentful.EntryFields.Symbol;
    fullwidth?: Contentful.EntryFields.Symbol;
    direction?: Contentful.EntryFields.Symbol;
    columns: Contentful.Entry<any>[];
    columnPerRow: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Symbol;
}

export type Type_MultiColumn = Contentful.Entry<MultiColumn>;
