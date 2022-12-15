import * as Contentful from 'contentful';
import { Type_RichText } from './Type_RichText';

interface ProductReviews {
    reviews: Contentful.Entry<ProductReview>[];
}
interface ProductReview {
    category: Contentful.EntryFields.Symbol;
    title: Contentful.EntryFields.Symbol;
    content: Contentful.Entry<Type_RichText>;
    author: Contentful.EntryFields.Symbol;
    color: Contentful.EntryFields.Symbol;
}
export type Type_ProductReviews = Contentful.Entry<ProductReviews>;
export type Type_ProductReview = Contentful.Entry<ProductReview>;
