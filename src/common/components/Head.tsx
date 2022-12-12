import React from "react";
import Head from "next/head";
import { Type_Page } from "@common/types";

const PageHead = ({ page }: { page: Type_Page }) => {
  const { title, seo } = page.fields;

  let pageTitle = title,
    pageImage = "/images/form/form-header-logo.png",
    pageUrl = "",
    pageDescription = "",
    pageKeywords = "",
    pageNoIndex = false,
    pageNoFollow = false,
    pageCanonicalUrl = "";

  if (seo) {
    const {
      shareCardImage,
      shareCardUrl,
      description,
      keywords,
      noIndex,
      noFollow,
      canonicalUrl,
    } = seo.fields;

    if (shareCardImage)
      pageImage = shareCardImage
        ? `https:${shareCardImage?.fields.imageFile.fields.file.url}`
        : "";
    if (shareCardUrl) pageUrl = shareCardUrl;
    if (description) pageDescription = description;
    if (keywords) pageKeywords = keywords;
    if (canonicalUrl) pageCanonicalUrl = canonicalUrl;
    pageNoIndex = noIndex;
    pageNoFollow = noFollow;
  }

  return (
    <Head>
      <link rel="icon" href="/favicon.ico"></link>
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle}></meta>
      <meta name="description" content={pageDescription} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta name="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription}></meta>
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="SelectQuote Life" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:label1" content="Est. reading time" />
      <meta name="twitter:data1" content="9 minutes" />
      <meta property="og:image" content={pageImage} />
      <meta name="keywords" content={pageKeywords} />
      {pageCanonicalUrl !== "" && (
        <link rel="canonical" href={pageCanonicalUrl} />
      )}
      {pageNoIndex && pageNoFollow ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <>
          {pageNoIndex && <meta name="robots" content="noindex" />}
          {pageNoFollow && <meta name="robots" content="nofollow" />}
        </>
      )}
    </Head>
  );
};

export default PageHead;
