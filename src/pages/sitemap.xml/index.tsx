import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        redirect: {
            permanent: false,
            destination: "/sitemap_index.xml"
        }
    }
}

// Default export to prevent next.js errors
export default function SitemapIndex() { }