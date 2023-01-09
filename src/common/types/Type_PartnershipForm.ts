import * as Contentful from "contentful";

interface PartnershipForm {
    title: Contentful.EntryFields.Symbol;
  }
  
  export type Type_PartnershipForm = Contentful.Entry<PartnershipForm>;
  