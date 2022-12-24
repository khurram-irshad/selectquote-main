import React from "react";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { Type_Hero } from "@common/types";
import { useRouter } from "next/router";

const HeroSection = ({ section }: { section: Type_Hero }) => {
  const {
    title,
    content,
    buttonText,
    fullWidth,
    gradientEndColor,
    gradientStartingColor,
    backgroundImage,
    textColor,
    actionImage
  } = section.fields;
  const router = useRouter();

  const path = router.pathname;

  return path === "/" ? (
    <section
      className="hero-section home"
      style={{
        background: backgroundImage
          ? `url(https:${backgroundImage.fields.imageFile.fields.file.url}) no-repeat right center`
          : "",
      }}
    >
      <div
        className={
          "hero-content d-flex align-items-center " +
          (fullWidth ? "container-fluid px-0" : "container wp-container")
        }
      >
        <div className="w-50 position-relative">
          <div className="content-left">
            <div className="hero-logo">
              <img
                src={
                  "/images/homepage/SelectQuote_Horiz_Logo-Tagline-Color700-05-2020.webp"
                }
                width={270}
                height={57}
                alt="logo-tagline"
              />
            </div>
            <h2>{title}</h2>
            <a className="free-quote-btn" href="/quote-form">
              {buttonText}
            </a>
            <RichTextRenderer text={content} />
          </div>
          <div className="content-right position-absolute">
            <p className="m-0 text-center">
              <strong>Jay, 35</strong>
              <br />
              $500,000 policy for under $19 a month*
            </p>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section
      className="hero-section"
      style={{
        backgroundPosition: "right 0px center",
        backgroundImage: backgroundImage
          ? `linear-gradient(90deg,${gradientStartingColor} 48%,${gradientEndColor} 55%), url(https:${backgroundImage.fields.imageFile.fields.file.url})`
          : "",
      }}
    >
      <div
        className={
          "hero-content d-flex align-items-center " +
          (fullWidth ? "container-fluid px-0" : "container wp-container")
        }
      >
        <div className="w-50 position-relative">
          <div className="content-left">
            <h3>{title} </h3>
            <RichTextRenderer text={content} />
            {buttonText && (<>
              <a className="free-quote-btn" href="/quote-form">
                {buttonText}
              </a>
            </>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
