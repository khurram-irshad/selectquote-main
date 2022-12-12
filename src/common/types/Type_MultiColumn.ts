import * as Contentful from 'contentful';
import { Type_Theme } from './TypeTheme';

interface MultiColumn {
    title?: Contentful.EntryFields.Symbol;
    fullwidth?: Contentful.EntryFields.Symbol;
    theme?: Contentful.Entry<Type_Theme>;
    direction?: Contentful.EntryFields.Symbol;
    columns: Contentful.Entry<any>[];
    numberOfColumns: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Symbol;
}

export type Type_MultiColumn = Contentful.Entry<MultiColumn>;
