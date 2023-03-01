import * as Contentful from "contentful";
import { Type_RichTextCustom } from "./Type_RichText";

interface Form {
  title: Type_RichTextCustom;
  step:  Contentful.EntryFields.Symbol;
}

export type Type_Form = Contentful.Entry<Form>;
