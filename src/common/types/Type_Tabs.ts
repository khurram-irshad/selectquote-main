import * as Contentful from "contentful";

interface Tabs {
  items: Contentful.Entry<Tab>[];
}

interface Tab {
  title: Contentful.EntryFields.Symbol;
  header: Contentful.EntryFields.Symbol;
  content: Contentful.EntryFields.Symbol;
}

export type Type_Tabs = Contentful.Entry<Tabs>;
