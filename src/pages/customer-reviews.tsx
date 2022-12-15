import React from "react";
import Layout from "@components/layout";
import { Type_Page } from "@common/types/Type_Page";
import { PageContentTypes } from "@common/constants/app.constant";
import { getEntry } from "@common/services/api";
import ReviewCard from "@components/sections/ReviewCard";

export default ({ page }: { page: Type_Page }) => {
  const { header, footer } = page?.fields;

  return (
    <Layout page={page} header={header} footer={footer}>
      <ReviewCard />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const page = await getEntry(
    {
      slug: "home",
      pageContentType: PageContentTypes.Page,
    },
    context
  );

  return {
    props: { page: page },
  };
};
