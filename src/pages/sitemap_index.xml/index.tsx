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
    let fields: ISitemapField[] = pages.filter(page => (page.fields?.includeInSitemap && !matcheSlug(page.fields.slug))).map((page) => ({
        loc: `${Environment.SITE_URL}/${page.fields.slug == 'home' ? '' : page.fields.slug}`,
        lastmod: new Date(page?.sys.updatedAt).toString()
    }));
    const getPage = (slug: string) => {
        return pages.find(page => (page?.fields?.slug === slug && page.fields?.includeInSitemap));
    }

    fields = [...fields, ...[
        ...(getPage('car-insurance') ? [{ loc: `${Environment.SITE_URL}/auto-and-home-insurance/car-insurance/`, lastmod: new Date().toString() }] : []),
        ...(getPage('home-insurance') ? [{ loc: `${Environment.SITE_URL}/auto-and-home-insurance/home-insurance/`, lastmod: new Date().toString() }] : []),
        ...(getPage('ccpa') ? [{ loc: `${Environment.SITE_URL}/privacy/ccpa/`, lastmod: new Date().toString() }] : []),
        ...(getPage('tv') ? [{ loc: `${Environment.SITE_URL}/commercials/tv/`, lastmod: new Date().toString() }] : []),
        ...(getPage('radio') ? [{ loc: `${Environment.SITE_URL}/commercials/radio/`, lastmod: new Date().toString() }] : []),
        ...(getPage('radio-ad') ? [{ loc: `${Environment.SITE_URL}/newsroom/radio-ad/`, lastmod: new Date().toString() }] : []),
        ...(getPage('tv-commercial') ? [{ loc: `${Environment.SITE_URL}/newsroom/tv-commercial/`, lastmod: new Date().toString() }] : []),
    ]]
    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function SitemapIndex() { }