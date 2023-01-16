import { Type_PartnershipForm } from "@common/types/Type_PartnershipForm";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";

const PartnershipFormSection = ({
  section,
}: {
  section: Type_PartnershipForm;
}) => {
  const { title } = section.fields;

  return (
    <div className="pt-5 pb-5">
      <RichTextRenderer text={title} />
      <div className="row">
        <div className="col">
          <label className="form-label">First Name *</label>
          <input
            type="text"
            id="firstaname"
            className="form-control"
            aria-label="First name"
          />
        </div>
        <div className="col">
          <label className="form-label">Last Name *</label>
          <input
            type="text"
            id="lastname"
            className="form-control"
            aria-label="Last name"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label className="form-label">Company Name *</label>
          <input
            type="text"
            id="company"
            className="form-control"
            aria-label="Company name"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label className="form-label">Your Title *</label>
          <input
            type="text"
            id="title"
            className="form-control"
            aria-label="Your Title"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label className="form-label">Email *</label>
          <input
            type="text"
            id="email"
            className="form-control"
            aria-label="Email"
          />
        </div>
        <div className="col">
          <label className="form-label">Phone Number *</label>
          <input
            type="text"
            id="phone"
            className="form-control"
            aria-label="Phone number"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label>Additional Comments</label>
          <textarea className="form-control mt-2" id="floatingTextarea" />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label>Add Attachments</label>
          <input className="form-control" type="file" id="formFile" />
        </div>
      </div>
      <div className="mt-4">
        <button className="action-btn btn-primary btn-border" type="submit">
          Connect with us
        </button>
      </div>
    </div>
  );
};

export default PartnershipFormSection;
