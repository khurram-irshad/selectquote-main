import React from "react";
import Layout from "@components/layout";
import { Type_Page } from "@common/types/Type_Page";
import {
  PageContentTypes,
} from "@common/constants/app.constant";
import _ from "lodash";

import { BlockRenderer } from "@components/renderes/BlockRenderer";
import { getEntry } from "@common/services/api";

export default ({ page }: { page: Type_Page }) => {
  const { header, sections } = page?.fields;

  return (
    <Layout page={page} header={header} >
      <BlockRenderer section={sections} page={page} />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const page = await getEntry({
    slug: "home",
    pageContentType: PageContentTypes.Page,
  }, context);

  return {
    props: { page: page },
  };
};
