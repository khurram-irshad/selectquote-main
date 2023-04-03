import * as Contentful from 'contentful';
import Device from './Type_Device';

interface TrustPilot {
    type: Contentful.EntryFields.Symbol;
    businessType: Contentful.EntryFields.Symbol;
}

export type Type_TrustPilot = Contentful.Entry<TrustPilot>;
