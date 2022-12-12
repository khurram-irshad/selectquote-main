import { Type_Header } from "@common/types/Type_Header";
import Link from "next/link";

export default function ({ header }: { header: Type_Header }) {
  const { logoWithTag, contactNumber, bannerText } = header.fields;
  return (
    <header className="homepage-header w-100 sticky-top">
      <div className="header-logo align-items-center justify-content-center">
        <div className="logo">
          <Link href={"/"}>
            <a>
              <img
                src={logoWithTag?.fields?.imageFile?.fields?.file?.url}
                width={380}
                height={62}
                alt={logoWithTag?.fields?.imageName}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="header-banner d-flex align-items-center justify-content-center gap-2">
        <div className="phone d-flex align-items-center justify-content-center gap-2">
          <div className="phone-icon d-flex align-items-center">
            <img
              src="/images/homepage/phone-icon-mobile.webp"
              width={15}
              height={20}
              alt="phone"
            />
          </div>
          <a className="phone-cta" href={`tel:${contactNumber}`}>
            {contactNumber}
          </a>
        </div>
        <span className="header-text">{bannerText}</span>
      </div>
    </header>
  );
}
