import React, { useEffect } from "react";
import Layout from "@components/layout";
import { Type_Page } from "@common/types/Type_Page";
import {
  ComponentContentTypes,
  PageContentTypes,
} from "@common/constants/app.constant";
import _ from "lodash";

import { BlockRenderer } from "@components/renderes/BlockRenderer";
import { getEntry } from "@common/services/api";

export default ({ page }: { page: Type_Page }) => {
  const { header, footer, sections } = page?.fields;

  useEffect(() => {
    const reviewSection = sections.find((section) => {
      const contentTypeId = _.get(section, "sys.contentType.sys.id");
      return contentTypeId === ComponentContentTypes.CustomerReview;
    });
    if (reviewSection) {
      var aScript = document.createElement("script");
      aScript.type = "text/javascript";
      aScript.src =
        "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      aScript.async = true;
      document.head.appendChild(aScript);
      aScript.onload = function () {
        var trustbox = document.getElementById("trustbox");
        window["Trustpilot"].loadFromElement(trustbox, true);
      };
    }
  }, []);

  return (
    <Layout page={page} header={header} footer={footer}>
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
