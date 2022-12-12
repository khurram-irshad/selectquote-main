import { Type_Header } from "@common/types/Type_Header";

export default function LargeHeader({ header }: { header: Type_Header }) {
  const { logoWithTag, contactNumber, bannerText } = header.fields;
  return (
    <header className="form-header w-100 ">
      <div className="d-flex flex-column flex-lg-row justify-content-center">
        <div className="form-header-logo text-center">
          <a href="/">
            <img
              src={logoWithTag?.fields?.imageFile?.fields?.file?.url}
              width={267}
              height={57}
              alt={logoWithTag?.fields?.imageName}
            />
          </a>
        </div>

        <div className="form-header-details d-flex align-items-center justify-content-center">
          <div className="phone-icon d-none d-lg-block">
            <img
              src={"/images/form/form-phone-icon.webp"}
              width={30}
              alt="phone"
            />
          </div>
          <div className=" d-flex flex-column ms-1 py-2">
            <a className="phone-cta" href={`tel:${contactNumber}`}>
              {contactNumber}
            </a>
            <span className="header-text">{bannerText}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
