import * as Contentful from "contentful";

export enum DeviceType {
    Desktop = 'Desktop',
    Mobile = 'Mobile',
    Tablet = 'Tablet',
}
interface Device {
    type: Contentful.EntryFields.Symbol;
    textColor: Contentful.EntryFields.Symbol;
    backgroundColor: Contentful.EntryFields.Symbol;
    fullWidth: Contentful.EntryFields.Symbol;
    textAlign: Contentful.EntryFields.Symbol;
    width: Contentful.EntryFields.Symbol;
    height: Contentful.EntryFields.Symbol;
    padding: Contentful.EntryFields.Symbol;
    margin: Contentful.EntryFields.Symbol;
    fontSize: Contentful.EntryFields.Symbol;
    fontWeight: Contentful.EntryFields.Symbol;
    lineHeight: Contentful.EntryFields.Symbol;
    letterSpacing: Contentful.EntryFields.Symbol;
    fontFamily: Contentful.EntryFields.Symbol;
    widthPercentage: Contentful.EntryFields.Symbol;
    hidden: Contentful.EntryFields.Boolean;
    separater: Contentful.EntryFields.Boolean;
    justifyContent: Contentful.EntryFields.Symbol;
    direction?: Contentful.EntryFields.Symbol;
    alignItems: Contentful.EntryFields.Symbol;
    borderRadius: Contentful.EntryFields.Symbol;
    border: Contentful.EntryFields.Symbol;
    boxShadow: Contentful.EntryFields.Symbol;
    display: Contentful.EntryFields.Symbol;
};

export default Device;