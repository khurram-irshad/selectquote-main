import React, { useEffect } from "react";
import Head from "next/head";
import { Type_Page } from "@common/types";

const PageHead = ({ page }: { page: Type_Page }) => {
  const { title, seo } = page.fields;
  let baseUrl;
  if (typeof window !== "undefined") {
    baseUrl = window?.location?.origin
  }

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

  const injectedScript = [

    {
      element: 'script',
      type: 'text/javascript',
      source: "https://cdn.jsdelivr.net/npm/addsearch-js-client@0.4/dist/addsearch-js-client.min.js",
      async: true,
    },
    {
      element: 'script',
      type: 'text/javascript',
      source: "https://cdn.jsdelivr.net/npm/addsearch-search-ui@0.4.8/dist/addsearch-search-ui.min.js",
      async: true,
    }
  ]

  const injectScript = (item) => {
    let createdElement: any = document.createElement(item.element);
    createdElement.type = item.type;
    createdElement.src = item.source;
    createdElement.async = item.async;
    document.head.appendChild(createdElement)
  }


  useEffect(() => {
    injectedScript.forEach(inject => {
      injectScript(inject)
    })

    var aLink = document.createElement("link");
    aLink.rel = "stylesheet";
    aLink.href =
      "https://cdn.jsdelivr.net/npm/addsearch-search-ui@0.4/dist/addsearch-search-ui.min.css";
    document.head.appendChild(aLink);
  }, [])


  useEffect(() => {
    setTimeout(() => {
      var aScript = document.createElement("script");
      aScript.type = "text/javascript";
      aScript.src =
        "/addsearch/js/ui.js";
      document.body.appendChild(aScript);
    }, 800);
  }, []);

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
      <meta property="og:url" content={`${baseUrl}${pageUrl}`} />
      <meta property="og:site_name" content="SelectQuote Life" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:label1" content="Est. reading time" />
      <meta name="twitter:data1" content="9 minutes" />

      <meta name="keywords" content={pageKeywords} />
      {pageCanonicalUrl !== "" && (
        <link rel="canonical" href={`${baseUrl}${pageCanonicalUrl}`} />
      )}
      {pageNoIndex && pageNoFollow ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <>
          {pageNoIndex && <meta name="robots" content="noindex" />}
          {pageNoFollow && <meta name="robots" content="nofollow" />}
        </>
      )}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>

    </Head>
  );
};

export default PageHead;
