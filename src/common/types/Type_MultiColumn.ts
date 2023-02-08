import * as Contentful from 'contentful';
import { Image } from "./Type_Image";

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
    borderLeft: Contentful.EntryFields.Boolean;
    borderRight: Contentful.EntryFields.Boolean;
    backgroundImage: Contentful.Entry<Image>;
}

export type Type_MultiColumn = Contentful.Entry<MultiColumn>;
