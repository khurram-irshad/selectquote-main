import "../scss/app.scss";

import { AppProps } from "next/app";
import React, { useEffect } from "react";
import {
  SessionStorageService, StorageService,
} from "@common/services/storage";
import { useRouter } from "next/router";
import { appService } from "@common/services/app.service";
import { ComponentContentTypes } from "@constants/app.constant";
import { GlobalContextProvider } from "src/context/globalContext";

export default function Apps({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const generateSessionId = () => {
    var d = new Date().getTime();
    var sessionID = "xxxxxx-xxxx-xxxxxx".replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return sessionID;
  };
  if (typeof window !== "undefined") {
    var pageUrl = window.location.href;
    var baseUrl = window.location.hostname;
  }
  const queryParams: any = router.query;

  const storeSessionData = (data) => {
    SessionStorageService.setItem(ComponentContentTypes.SiteSession, data);
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (router.isReady) {
        const queryParams = router.query;
        localStorage.setItem('lastQueryParams', JSON.stringify(queryParams.campaignKey));
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);
  useEffect(() => {
    const getData = async () => {
      let sCode = null;
      let lastParams=(localStorage.getItem('lastQueryParams'))
      if (lastParams!= 'undefined') {
        lastParams = JSON.parse(lastParams)
      }
      if (lastParams && !queryParams.campaignKey) {
        sCode = await appService.getScode(lastParams);
      }
      else if (queryParams && queryParams.campaignKey)
      {
        sCode = await appService.getScode(queryParams.campaignKey);
      }
      setStorage(sCode);
    };

    const setStorage = (sCode) => {
      const storageSiteData = SessionStorageService.getItem(ComponentContentTypes.SiteSession);
      const site_session_id = storageSiteData ? storageSiteData.site_session_id : generateSessionId();
      let site_data_model = {
        site_session_id,
        site_campaign_phone: ComponentContentTypes.PhoneNumber,
      };

      if (sCode) {
        site_data_model = {
          ...site_data_model,
          site_campaign_phone: sCode["Phone Number"],
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

    getData();
  }, [queryParams]);
  useEffect(() => {
    const storageSiteData = SessionStorageService.getItem(ComponentContentTypes.SiteSession);
  }, []);
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  )

}

