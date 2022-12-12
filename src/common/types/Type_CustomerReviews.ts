import * as Contentful from 'contentful';

interface CustomerReviews {
    title: Contentful.EntryFields.Symbol;
    backgroundColor: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Symbol;
}

export type Type_CustomerReviews = Contentful.Entry<CustomerReviews>;
