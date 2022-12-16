import React, { useRef, useState } from "react";
import { Direction } from "@common/enums/direction";
import { Type_CTA } from "@common/types";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { useRouter } from "next/router";

const CTASection = ({ section }: { section: Type_CTA }) => {
  const autoInsurance = useRef(null)
  const {
    title,
    content,
    buttonText,
    fullWidth,
    requiredZipCode,
    backgroundColor,
    direction,
    color
  } = section.fields;
  const [zipcode, setZipcode] = useState("");

  const router = useRouter();

  const path = router.pathname;

  const renderCallToAction = () => {
    return requiredZipCode ? (
      <div className="form d-flex align-items-center justify-content-flex-start gap-1">
        <label htmlFor="zip">
          <input
            type="text"
            name="zip"
            placeholder="Enter Zip"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </label>
        <button disabled={zipcode === ""}>{buttonText}</button>
      </div>
    ) : (
      <div className="button-container">
        <a className="free-quote-btn" href="/quote-form">
          {buttonText}
        </a>
      </div>
    );
  };

  return (
    <section
      className={`cta-section ${
        fullWidth ? "container-fluid px-0" : "container wp-container"
      } ${path === "/" ? "cta-home" : ""}`}
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        className={`d-flex ${
          direction === Direction.Vertical
            ? "flex-column"
            : "flex-column justify-content-center flex-md-row"
        } gap-2`}
      >
      <div className="container wp-container">
        <h2 style={{color:color}}>{title}</h2>
        <div ref={autoInsurance}>
          <RichTextRenderer color={color} text={content} />
        </div>
        {renderCallToAction()}
      </div>
      </div>
    </section>
  );
};

export default CTASection;
