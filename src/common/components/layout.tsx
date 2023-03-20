import React from "react";
import MainHeader from "./layout/mainHeader";
import { Type_Page } from "../types/Type_Page";
import PageHead from "./Head";
import { SSRProvider } from "react-bootstrap";
import { ComponentContentTypes } from "@common/constants/app.constant";
import RocketLawyerHeader from "./layout/RocketLawyerHeader";
import _ from "lodash";

export default function Layout({
  page,
  header,
  children,
}: {
  page?: Type_Page;
  header?: any;
  children;
}) {

  const contentTypeId = _.get(header, "sys.contentType.sys.id");
  const Component = ContentTypeMap[contentTypeId];

  if (!Component) {
    console.warn(`${contentTypeId} can not be handled`);
    return null;
  }

  const { id } = header.sys;

  const componentProps = {
    header: header,
  };

  return (
    <SSRProvider>
      <PageHead page={page} />
      {header && (<Component key={`${contentTypeId}-${id}`} {...componentProps} />)}
      {children}
    </SSRProvider>
  );
}


const ContentTypeMap = {
  [ComponentContentTypes.MainHeader]: MainHeader,
  [ComponentContentTypes.RocketLawyerHeader]: RocketLawyerHeader,
};