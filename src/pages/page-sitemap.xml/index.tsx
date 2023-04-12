import { PageContentTypes } from '@common/constants/app.constant';
import { matcheSlug } from '@common/helpers/helper';
import { getEntries } from '@common/services/api';
import { Environment } from 'environments/environment';
import { GetServerSideProps } from 'next'

import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const pages = await getEntries({
        pageContentType: PageContentTypes.Page,
    }, ctx);
    let fields: ISitemapField[] = pages.filter(page => (page.fields?.seo?.fields.includeInSitemap && !matcheSlug(page.fields.slug))).map((page) => ({
        loc: `${Environment.SITE_URL}/${page.fields.slug == 'home' ? '' : page.fields.slug}`
    }));
    const getPage = (slug: string) => {
        return pages.find(page => (page?.fields?.slug === slug && page.fields?.seo?.fields.includeInSitemap));
    }

    fields = [...fields, ...[
        ...(getPage('car-insurance') ? [{ loc: `${Environment.SITE_URL}/auto-and-home-insurance/car-insurance/` }] : []),
        ...(getPage('home-insurance') ? [{ loc: `${Environment.SITE_URL}/auto-and-home-insurance/home-insurance/` }] : []),
        ...(getPage('ccpa') ? [{ loc: `${Environment.SITE_URL}/privacy/ccpa/` }] : []),
        ...(getPage('tv') ? [{ loc: `${Environment.SITE_URL}/commercials/tv/` }] : []),
        ...(getPage('radio') ? [{ loc: `${Environment.SITE_URL}/commercials/radio/` }] : []),
        ...(getPage('radio-ad') ? [{ loc: `${Environment.SITE_URL}/newsroom/radio-ad/` }] : []),
        ...(getPage('tv-commercial') ? [{ loc: `${Environment.SITE_URL}/newsroom/tv-commercial/` }] : []),
    ]]
    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function PagesitemapIndex() { }