import { PageContentTypes } from '@common/constants/app.constant';
import { getEntries } from '@common/services/api';
import { Environment } from 'environments/environment';
import { GetServerSideProps } from 'next'

import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const pages = await getEntries({
        pageContentType: PageContentTypes.Page,
    },ctx);
    let fields: ISitemapField[] = pages.filter(page => page.fields?.seo?.fields.includeInSitemap).map((page) => ({
        loc: `${Environment.SITE_URL}/${page.fields.slug}`,
        lastmod: new Date(page?.sys.updatedAt).toString()
    }));
    fields = [...fields, { loc: `${Environment.SITE_URL}/quote-form`, lastmod: new Date().toString() }]
    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function SitemapIndex() { }