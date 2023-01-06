import * as Contentful from 'contentful';

interface MultiColumn {
    fullwidth?: Contentful.EntryFields.Symbol;
    direction?: Contentful.EntryFields.Symbol;
    columns: Contentful.Entry<any>[];
    columnPerRow: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Symbol;
    justifyContent: Contentful.EntryFields.Symbol;
    alignItems: Contentful.EntryFields.Symbol;
    backgroundColor: Contentful.EntryFields.Symbol;
    padding: Contentful.EntryFields.Symbol;
}

export type Type_MultiColumn = Contentful.Entry<MultiColumn>;
