import * as Contentful from 'contentful';
import { RichText, Type_RichText } from './Type_RichText';

interface ProductReview {
    title: Contentful.EntryFields.Symbol;
    content: Contentful.Entry<Type_RichText>;
    color: Contentful.EntryFields.Symbol;
    showRating: Contentful.EntryFields.Symbol;
}

interface Cards {
    items: Contentful.Entry<ProductReview>[];
    itemsPerRow: Contentful.EntryFields.Symbol;
    itemsMargin: Contentful.EntryFields.Symbol;
}

export type Type_Cards = Contentful.Entry<Cards>;
export type Type_ProductReview = Contentful.Entry<ProductReview>;
