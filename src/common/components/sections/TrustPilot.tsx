import { TrustPilotType } from "@common/enums/TrustPilotType";
import { DeviceType } from "@common/types/Type_Device";
import { Type_TrustPilot } from "@common/types/Type_TrustPilot";
import React, { useEffect } from "react";

const SectionTrustPilot = ({ section }: { section: Type_TrustPilot }) => {
  const { type, devices } = section.fields;

  // const desktop = devices?.find(item => item?.fields?.type === DeviceType.Desktop);
  // const mobile = devices?.find(item => item?.fields?.type === DeviceType.Mobile);
  useEffect(() => {
    setTimeout(() => {
      var trustbox = document.getElementById("trustbox");
      if (trustbox && window["Trustpilot"]) {
        window["Trustpilot"].loadFromElement(trustbox, true);
      }
    }, 2000);

  }, [])

  const getSectionByType = () => {
    switch (type) {
      case TrustPilotType.Carousel:
        return <div
          id="trustbox"
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id="54ad5defc6454f065c28af8b"
          data-businessunit-id="5400958400006400057a03de"
          data-style-height="240px"
          data-style-width="100%"
          data-theme="light"
          data-stars="4,5"
          data-review-languages="en"
        >
          <a
            href="https://www.trustpilot.com/review/selectquote.com?utm_medium=trustbox&utm_source=Slider"
            target="_blank"
            rel="noopener"
          >
            Loading Trustpilot...
          </a>
        </div>
      case TrustPilotType.Grid:
        return <div id="trustbox" className="trustpilot-widget" data-locale="en-US" data-template-id="539adbd6dec7e10e686debee" data-businessunit-id="5400958400006400057a03de" data-style-height="500px" data-style-width="100%" data-theme="light" data-stars="4,5" data-review-languages="en">
          <a href="https://www.trustpilot.com/review/selectquote.com" target="_blank" rel="noopener">Loading Trustpilot...</a>
        </div>
    }
  }
  return (
    <section className="w-100">
      {getSectionByType()}
    </section>
  );
};

export default SectionTrustPilot;
