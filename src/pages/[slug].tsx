import React, { useEffect } from "react";
import Layout from "@components/layout";
import _ from "lodash";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import {
  PageContentTypes,
  ComponentContentTypes,
} from "@constants/app.constant";
import { getEntry } from "src/common/services/api";
import { Type_Page } from "@common/types/Type_Page";

export default ({ page }: { page: Type_Page }) => {
  const { header, footer, sections, sideSections } = page?.fields;
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
      {!sideSections && <BlockRenderer section={sections} page={page} />}
      {sideSections && (
        <div className="container wp-container">
          <div className="row ">
            <div className="col-md-8 col-sm-12">
              <BlockRenderer section={sections} page={page} />
            </div>
            <div className="col-md-4">
              <BlockRenderer section={sideSections} page={page} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const slug = context.params.slug;
  const childSlugs = [
    "ccpa",
    "10-year",
    "15-year",
    "20-year",
    "25-year",
    "30-year",
    "35-year",
    "40-year",
  ];
  const page = await getEntry(
    {
      slug,
      pageContentType: PageContentTypes.Page,
    },
    context
  );

  if (childSlugs.includes(slug) || !page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page: page },
  };
};
