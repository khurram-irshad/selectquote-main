export const PageContentTypes = {
  Page: "page",
  Header: "header",
};

export const ComponentContentTypes = {
  Hero: "templateHeroSection",
  AgentReview: "templateAgentReview",
  FAQ: "faqItem",
  SliderSection: "templateSlider",
  MultiColumn: "templateMultiColumn",
  RichTextContent: "richTextContent",
  RichText: "richText",
  Image: "image",
  TrustPilot: "templateTrustPilot",
  Hyperlink: "hyperLink",
  Cards: "templateCards",
  Style: "templateStyle",
  Button: "templateButton",
  ProductReview: "templateProductReview",
  Card: "templateCard",
  PartnershipForm: "templatePartnershipForm",
  FundingForm: "templateFundingForm",
  Divider: "templateDivider",
  Tabs: "templateTabs",
  Gallery: "templateGallery",
  Video: "templateVideo",
  Table: "templateTable",
  ColorText: "templateColorText",
  StaticReviews: "templateStaticReviews",
  RocketLawyer: "templateRocketLawyer",
  RocketLawyerHeader: "rocketLawyerHeader",
  MainHeader: "header",
  InlineContent: "templateInlineContent",
};

export const STATIC_SCODE = {
  LIFE: 'CLMM',
  MEDICARE: 'RLMED',
  AUTO_HOME: 'RLSQAH'
}

export const MAIN_SCODE = {
  BSQ: 'BSQ',
  LSQ: 'LSQ'
}

export const DEFAULT_PHONE_NUMBER = "1-855-653-6700";

export const STORAGE = {
  SITE_SESSION_DATA: 'site_session_data'
}

export const REGEX = {
  YEAR: /^(19|20)\d{2}$/,
  PHONE: /[^\d]/g,
  POSITIVE_NUMBER: /^[1-9][0-9]*$/,
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const MOBILE_MASK = "(999) 999-9999";

export const FILE_TYPES = ["PNG", "JFIF", "JPEG", "PJP", "JPG", "PPT", "PPTX", "PDF", "JPE", "POT", "PPS"]
