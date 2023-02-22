export const PageContentTypes = {
    Page: 'page',
    Header: 'header',
};


export const ComponentContentTypes = {
    Hero: 'templateHeroSection',
    AgentReview: 'templateAgentReview',
    FAQ: 'faqItem',
    SliderSection: 'templateSlider',
    MultiColumn: 'templateMultiColumn',
    RichTextContent: 'richTextContent',
    RichText: 'richText',
    Image: 'image',
    TrustPilot: 'templateTrustPilot',
    Hyperlink: 'hyperLink',
    Cards: 'templateCards',
    Style: 'templateStyle',
    Button: 'templateButton',
    ProductReview: 'templateProductReview',
    Card: 'templateCard',
    PartnershipForm: 'templatePartnershipForm',
    FundingForm: 'templateFundingForm',
    Divider: 'templateDivider',
    Tabs: 'templateTabs',
    Gallery: 'templateGallery',
    Video: 'templateVideo',
    Table: 'templateTable',
    ColorText: 'templateColorText',
};


export const DAYS_ARRAY = Array.from(Array(31).keys(), n => {
    return n < 10 ? String(n + 1).padStart(2, '0') : String(n + 1)
});

export const COVERAGE_RANGE = [
]

export const REGEX = {
    YEAR: /^(19|20)\d{2}$/,
    PHONE: /[^\d]/g,
    POSITIVE_NUMBER: /^[1-9][0-9]*$/,
    EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const MOBILE_MASK = "(999) 999-9999"

