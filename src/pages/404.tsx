import { PageContentTypes } from '@common/constants/app.constant';
import { getEntry } from '@common/services/api';
import { Type_Page } from '@common/types';
import Layout from '@components/layout';
import { BlockRenderer } from '@components/renderes/BlockRenderer';
import React from 'react'

export default ({ page }: { page: Type_Page }) => {
    const { header, sections } = page?.fields;

    return (
        <Layout page={page} header={header}>
            <BlockRenderer section={sections} page={page} />
        </Layout>
    );
};

export const getStaticProps = async (context) => {
    const page = await getEntry(
        {
            slug: '404',
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
