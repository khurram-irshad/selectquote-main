module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", disallow: "/quote-form" },
            { userAgent: "*", allow: "/" },
        ],
        exclude: ['/server-sitemap.xml'],
        additionalSitemaps: [
            `${process.env.SITE_URL}/sitemap.xml`,
            `${process.env.SITE_URL}/server-sitemap.xml`,
        ],
    },
}