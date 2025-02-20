import React, { useEffect } from "react";
import MainHeader from "./layout/mainHeader";
import { Type_Page } from "../types/Type_Page";
import PageHead from "./Head";
import { SSRProvider } from "react-bootstrap";
import { ComponentContentTypes, DEFAULT_GTM_ID } from "@common/constants/app.constant";
import RocketLawyerHeader from "./layout/RocketLawyerHeader";
import _ from "lodash";
import {
  SessionStorageService
} from "@common/services/storage";
import { useRouter } from "next/router";
import { appService } from "@common/services/app.service";
import { DEFAULT_PHONE_NUMBER, MAIN_SCODE, STATIC_SCODE, STORAGE } from "@constants/app.constant";
import { generateSessionId } from "@common/helpers/helper";
import TagManager from "react-gtm-module";


export default function Layout({
  page,
  header,
  children,
}: {
  page?: Type_Page;
  header?: any;
  children;
}) {
  const router = useRouter();
  const { gtmContainerId } = page?.fields;
  const queryParams: any = router.query;

  const storeSessionData = (data) => {
    SessionStorageService.setItem(STORAGE.SITE_SESSION_DATA, data);
    window.dispatchEvent(new Event("storage"));
  };


  const verifySiteId = (siteId: Array<string>) => {
    const response = siteId?.find(x => (x === MAIN_SCODE.BSQ || x === MAIN_SCODE.LSQ))
    return response;
  }

  const getData = async () => {
    let response, sCode = queryParams?.campaignKey || queryParams?.sCode;
    let storageSCode = SessionStorageService.getItem('sCode')
    SessionStorageService.removeItem(STORAGE.SITE_SESSION_DATA)
    if (sCode) {
      SessionStorageService.setItem('sCode', sCode)
      response = await appService.getScode(sCode);
    } else if (storageSCode) {
      response = await appService.getScode(storageSCode);
    } else {
      SessionStorageService.setItem('sCode', MAIN_SCODE.DEFAULT)
      response = await appService.getScode(MAIN_SCODE.DEFAULT);
    }

    const storageSiteData = SessionStorageService.getItem(STORAGE.SITE_SESSION_DATA);
    const site_session_id = storageSiteData ? storageSiteData.site_session_id : generateSessionId();

    let site_data_model: any = {
      site_session_id,
      site_campaign_phone: DEFAULT_PHONE_NUMBER,
    };

    if (response && verifySiteId(response['Site ID'])) {
      site_data_model = {
        ...site_data_model,
        site_campaign_phone: response["Phone Number"],
        campaign_key: response['Campaign Key'],
        campaign_id: response['Campaign ID'],
        campaign_category: response['Category'],
        campaign_partner: response['Partner'] ? response['Partner'] : null,
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_content: null,
        utm_term: null,
      };
    }

    if (!storageSiteData) {
      storeSessionData(site_data_model);
    } else {
      storeSessionData({
        ...storageSiteData,
        ...site_data_model,
      });
    }
    bindContainer(site_data_model)
  };

  const bindContainer = (data) => {
    let pageUrl;
    if (typeof window !== "undefined") {
      pageUrl = window.location.href;
    }
    const tagManagerPageLoad = {
      dataLayer: {
        event: "pageOnload",
        fullURL: pageUrl,
        session_id: data?.site_session_id,
        sCode: data?.campaign_key,
        CampaignID: data?.campaign_id,
        campaignCategory: data.campaign_category,
        campaignPartner: data.campaign_partner,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_content: data.utm_content,
        utm_term: data.utm_term,
      },
    };
    TagManager.dataLayer(tagManagerPageLoad);
  }

  useEffect(() => {
    const tagManagerInit = {
      gtmId: gtmContainerId ? gtmContainerId : DEFAULT_GTM_ID,
    };
    console.log(tagManagerInit, '-----GTM ID------')
    TagManager.initialize(tagManagerInit);
  }, []);

  useEffect(() => {
    getData();
  }, [queryParams]);


  const contentTypeId = _.get(header, "sys.contentType.sys.id");
  const Component = ContentTypeMap[contentTypeId];

  if (!Component) {
    console.warn(`${contentTypeId} can not be handled`);
    return null;
  }

  const { id } = header.sys;

  const componentProps = {
    header: header,
  };

  return (
    <SSRProvider>
      <PageHead page={page} />
      {header && (<Component key={`${contentTypeId}-${id}`} {...componentProps} />)}
      {children}
    </SSRProvider>
  );
}


const ContentTypeMap = {
  [ComponentContentTypes.MainHeader]: MainHeader,
  [ComponentContentTypes.RocketLawyerHeader]: RocketLawyerHeader,
};