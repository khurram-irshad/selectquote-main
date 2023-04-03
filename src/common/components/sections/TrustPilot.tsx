import { BUSINESS_TYPE } from "@common/constants/app.constant";
import { TrustPilotType } from "@common/enums/TrustPilotType";
import { Type_TrustPilot } from "@common/types/Type_TrustPilot";
import React, { useEffect } from "react";

const SectionTrustPilot = ({ section }: { section: Type_TrustPilot }) => {
  const { type, businessType } = section.fields;

  useEffect(() => {
    setTimeout(() => {
      var trustbox = document.getElementById("trustbox");
      if (trustbox && window["Trustpilot"]) {
        window["Trustpilot"].loadFromElement(trustbox, true);
      }
    }, 2000);

  }, [])

  const getSectionByType = () => {
    if (type === TrustPilotType.Carousel && businessType === BUSINESS_TYPE.LIFE) {
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
    }
    else if (type === TrustPilotType.Carousel && businessType === BUSINESS_TYPE.AUTO_REVIEWS) {
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
          href="https://widget.trustpilot.com/trustboxes/54ad5defc6454f065c28af8b/index.html?templateId=54ad5defc6454f065c28af8b&businessunitId=5519c5390000ff00057e6498#locale=en-US&styleHeight=240px&styleWidth=100%25&theme=light&stars=1%2C2%2C3%2C4%2C5&reviewLanguages=en"
          target="_blank"
          rel="noopener"
        >
          Loading Trustpilot...
        </a>
      </div>
    }
    else if (type === TrustPilotType.Grid) {
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
