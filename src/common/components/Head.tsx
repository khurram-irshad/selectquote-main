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


      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
     
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
