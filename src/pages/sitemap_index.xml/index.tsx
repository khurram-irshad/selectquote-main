import { PageContentTypes } from '@common/constants/app.constant';
import { matcheSlug } from '@common/helpers/helper';
import { getEntries } from '@common/services/api';
import { Environment } from 'environments/environment';
import { GetServerSideProps } from 'next'

import { getServerSideSitemap, ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let fields = [
        {
            "loc": `${Environment.SITE_URL + '/page-sitemap.xml'}`
        },
        {
            "loc": "https://life.selectquote.com/page-sitemap.xml",
        },
        {
            "loc": "https://life.selectquote.com/post-sitemap.xml"
        },
        {
            "loc": "https://homeandauto.selectquote.com/page-sitemap.xml"
        },
        {
            "loc": "https://homeandauto.selectquote.com/post-sitemap.xml"
        },
        {
            "loc": "https://medicare.selectquote.com/page-sitemap.xml"
        },
        {
            "loc": "https://medicare.selectquote.com/post-sitemap.xml"
        }
    ]
    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function SitemapIndex() { }