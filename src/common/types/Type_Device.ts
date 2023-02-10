import * as Contentful from "contentful";

export enum DeviceType {
    Desktop = 'Desktop',
    Mobile = 'Mobile',
}
interface Device {
    type: Contentful.EntryFields.Symbol;
    textColor: Contentful.EntryFields.Symbol;
    backgroundColor: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Symbol;
    textAlign: Contentful.EntryFields.Symbol;
    width: Contentful.EntryFields.Symbol;
    height: Contentful.EntryFields.Boolean;
    padding: Contentful.EntryFields.Symbol;
    margin: Contentful.EntryFields.Symbol;
    fontSize: Contentful.EntryFields.Symbol;
    fontWeight: Contentful.EntryFields.Symbol;
    lineHeight: Contentful.EntryFields.Symbol;
    letterSpacing: Contentful.EntryFields.Symbol;
    fontFamily: Contentful.EntryFields.Symbol;
    hidden: Contentful.EntryFields.Boolean;
};

export default Device;