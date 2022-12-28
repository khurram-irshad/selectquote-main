export const PageContentTypes = {
    Page: 'page',
    QuoteForm: 'quoteForm',
    QuoteFormStep: 'quoteFormStep',
    Header: 'header',
};

export const QUOTE_FORM = {
    QUESTIONS_SECTION: 'QUESTIONS_SECTION',
    ACTIONS_SECTION: 'ACTIONS_SECTION',
}

export const ComponentContentTypes = {
    Hero: 'templateHeroSection',
    AgentReview: 'templateAgentReview',
    CTA: 'templateCta',
    FAQ: 'faqItem',
    CarrierStrips: 'templateCarrierStrips',
    MultiColumn: 'templateMultiColumn',
    RichTextContent: 'richTextContent',
    RichText: 'richText',
    Image: 'image',
    CustomerReview: 'templateCustomerReviews',
    Hyperlink: 'hyperLink',
    Cards: 'templateCards',
    ProductReview: 'templateProductReview',
    Card: 'templateCard',
};

export const QUOTE_FORM_FIELDS = ['fields.title', 'fields.copy', 'fields.header', 'fields.sections',
    'fields.footer', 'fields.largeNavbarOnly', 'fields.navigationOnly', 'fields.smallNavbarOnly'].join(',')


export const MONTH_ARRY: { id: string, label: string }[] = [
    { id: '01', label: 'January' },
    { id: '02', label: 'February' },
    { id: '03', label: 'March' },
    { id: '04', label: 'April' },
    { id: '05', label: 'May' },
    { id: '06', label: 'June' },
    { id: '07', label: 'July' },
    { id: '08', label: 'August' },
    { id: '09', label: 'September' },
    { id: '10', label: 'October' },
    { id: '11', label: 'November' },
    { id: '12', label: 'December' },
]

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

