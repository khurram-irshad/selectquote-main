import * as Contentful from "contentful";

export interface TypeStyle {
  margin: Contentful.EntryFields.Symbol;
}


export type Type_Style = Contentful.Entry<TypeStyle>;
