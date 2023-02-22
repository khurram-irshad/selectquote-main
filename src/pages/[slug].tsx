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
  useEffect(() => {
    // const reviewSection = sections.find((section) => {
    //   const contentTypeId = _.get(section, "sys.contentType.sys.id");
    //   return contentTypeId === ComponentContentTypes.CustomerReview;
    // });
    // if (reviewSection) {
    // var aScript = document.createElement("script");
    // aScript.type = "text/javascript";
    // aScript.src =
    //   "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    // aScript.async = true;
    // document.head.appendChild(aScript);
    // aScript.onload = function () {
    //   var trustbox = document.getElementById("trustbox");
    //   window["Trustpilot"].loadFromElement(trustbox, true);
    // };
    // }
  }, []);
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
      notFound: true,
    };
  }

  return {
    props: { page: page },
  };
};
