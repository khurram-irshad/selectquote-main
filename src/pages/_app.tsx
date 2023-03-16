import "../scss/app.scss";

import { AppProps } from "next/app";
import React, { useEffect } from "react";
import {
  SessionStorageService
} from "@common/services/storage";
import { useRouter } from "next/router";
import { appService } from "@common/services/app.service";
import { DEFAULT_PHONE_NUMBER, STORAGE } from "@constants/app.constant";
import { GlobalContextProvider } from "src/context/globalContext";
import { generateSessionId } from "@common/helpers/helper";

export default function Apps({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const queryParams: any = router.query;

  const storeSessionData = (data) => {
    SessionStorageService.setItem(STORAGE.SITE_SESSION_DATA, data);
    window.dispatchEvent(new Event("storage"));
  };

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (router.isReady) {
  //       debugger
  //       const queryParams = router.query;
  //       let sCode = queryParams?.campaignKey || queryParams?.sCode;
  //       SessionStorageService.setItem('sCode', sCode);
  //     }
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [router]);

  const getData = async () => {
    let response, sCode = queryParams?.campaignKey || queryParams?.sCode;
    let storageSCode = SessionStorageService.getItem('sCode')
    if (storageSCode && !sCode) {
      response = await appService.getScode(storageSCode);
    } else if (queryParams && sCode) {
      response = await appService.getScode(sCode);
    }
    const storageSiteData = SessionStorageService.getItem(STORAGE.SITE_SESSION_DATA);
    const site_session_id = storageSiteData ? storageSiteData.site_session_id : generateSessionId();

    let site_data_model: any = {
      site_session_id,
      site_campaign_phone: DEFAULT_PHONE_NUMBER,
    };

    if (response) {
      site_data_model = {
        ...site_data_model,
        site_campaign_phone: response["Phone Number"],
        campaign_key: response['Campaign Key'],
        campaign_id: response['Campaign ID'],
        campaign_category: response['Category'],
        campaign_partner: null,
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

  };
  useEffect(() => {
    getData();
  }, [queryParams]);

  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )
}

