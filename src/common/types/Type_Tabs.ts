import * as Contentful from "contentful";
import { Type_Table } from "./Type_Table";

interface Tabs {
  items: Contentful.Entry<Tab>[];
}

interface Tab {
  title: Contentful.EntryFields.Symbol;
  header: Contentful.EntryFields.Symbol;
  content: Type_Table;
}

export type Type_Tabs = Contentful.Entry<Tabs>;
