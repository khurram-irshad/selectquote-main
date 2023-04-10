import React, { useEffect } from "react";
import Layout from "@components/layout";
import _ from "lodash";
import {
  PageContentTypes,
} from "@constants/app.constant";
import { getEntry } from "src/common/services/api";
import { Type_Page } from "@common/types/Type_Page";
import { BlockRenderer } from "@components/renderes/BlockRenderer";

export default ({ page }: { page: Type_Page }) => {
  const { header, sections } = page?.fields;

  return (
    <Layout page={page} header={header}>
      <BlockRenderer section={sections} page={page} />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {

  const slug = context.params.slug;
  const page = await getEntry(
    {
      slug,
      pageContentType: PageContentTypes.Page,
    },
    context
  );

  if (!page) {
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }

  return {
    props: { page: page },
  };
};
