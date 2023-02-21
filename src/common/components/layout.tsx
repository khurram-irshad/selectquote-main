import React from "react";
import MainHeader from "./layout/mainHeader";
import { Type_Page } from "../types/Type_Page";
import PageHead from "./Head";
import { SSRProvider } from "react-bootstrap";

export default function Layout({
  page,
  header,
  children,
}: {
  page?: Type_Page;
  header?: any;
  children;
}) {
  const { navigationOnly, smallNavbarOnly, largeNavbarOnly } = page?.fields;
  return (
    <SSRProvider>
      <PageHead page={page} />
      {navigationOnly && <MainHeader header={header} />}
      {/* {smallNavbarOnly && <SmallHeader header={header} />}
      {largeNavbarOnly && <LargeHeader header={header} />} */}

      {children}
    </SSRProvider>
  );
}
