import React from "react";
import SmallHeader from "./layout/smallHeader";
import MainHeader from "./layout/mainHeader";
import PageFooter from "./layout/pageFooter";
import { Type_Page } from "../types/Type_Page";
import PageHead from "./Head";
import LargeHeader from "./layout/largeHeader";
import { SSRProvider } from "react-bootstrap";

export default function Layout({
  page,
  header,
  children,
  footer,
}: {
  page?: Type_Page;
  header?: any;
  footer?: any;
  children;
}) {
  const { navigationOnly, smallNavbarOnly, largeNavbarOnly } = page?.fields;
  return (
    <SSRProvider>
      <PageHead page={page} />
      {navigationOnly && <MainHeader header={header} />}
      {smallNavbarOnly && <SmallHeader header={header} />}
      {largeNavbarOnly && <LargeHeader header={header} />}

      {children}

      <PageFooter footer={footer} />
    </SSRProvider>
  );
}
