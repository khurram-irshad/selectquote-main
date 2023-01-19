import { Type_Form } from "@common/types/Type_Form";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";

const FundingFormSection = ({ section }: { section: Type_Form }) => {
  const { title } = section.fields;

  return (
    <div className="pt-5 pb-5">
      <RichTextRenderer text={title.fields.content} />
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
          <label className="form-label">Organization Name *</label>
          <input
            type="text"
            id="orgname"
            className="form-control"
            aria-label="Company name"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label className="form-label">Organization Website *</label>
          <input
            type="text"
            id="orgwebsite"
            className="form-control"
            aria-label="Company name"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label className="form-label">Organization Address *</label>
          <input
            type="text"
            id="orgaddress"
            className="form-control"
            aria-label="Company name"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label className="form-label">Organization Address *</label>
          <input
            type="text"
            id="orgaddress"
            className="form-control"
            aria-label="Company name"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label className="form-label">Organization Mission Statement *</label>
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
          <label className="form-label">
            Please provide an overview of your organization, including history,
            current programs and activities, and any accomplishments from the
            last three years *
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            aria-label="Your Title"
          />
        </div>
      </div>
      <div className="row mt-4">
        <p>Please provide a brief description of your proposal, including:</p>
        <div className="col">
          <ul>
            <li>Problem or need which you seek to address</li>
            <li>Purpose, objectives, and key anticipated outcomes</li>
            <li>Individuals or communities served</li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <li>Budget/amount of funding requested</li>
            <li>Overview of how funds will be spent</li>
            <li>Timeline</li>
          </ul>
        </div>
        <div>
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
          <label className="form-label">
            Please specify the needs and/or program this grant will directly
            support. *
          </label>
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
          <label className="form-label">
            Please list how much money you're requesting. *
          </label>
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
          <label className="form-label">
            Will there be any partners in this proposal?
          </label>
          <ul className="custom-radio">
            <li>
              <input type="radio" id="yes" name="radio-option" />
              <label htmlFor="yes">Yes</label>
            </li>
            <li>
              <input type="radio" id="no" name="radio-option" />
              <label htmlFor="no">No</label>
            </li>
          </ul>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <label className="form-label">Organization IRS EIN Number *</label>
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
          <label className="form-label">
            Please provide a third-party reference *
          </label>
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
          <label className="form-label">
            Please list your Board of Directors: *
          </label>
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
          <label className="form-label">
            Please list name and title of any key staff involved with this
            project: *
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            aria-label="Your Title"
          />
        </div>
      </div>

      <div className="row mt-4">
        <label className="form-label">Please attach the following:</label>
        <div className="col">
          <ul>
            <li>Cash flow statement</li>
            <li>Audited financial statements</li>
            <li>Current operating budget</li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <li>Annual Report</li>
            <li>
              Any supplementary documents which you feel will be essential to
              the review committee
            </li>
          </ul>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <label>Add Attachments</label>
          <input className="form-control" type="file" id="formFile" />
        </div>
      </div>
      <div className="mt-4">
        <div className="button-container">
          <a
            className="action-btn btn-border"
            style={{ color: "#ffffff", backgroundColor: "#F47B20" }}
            type="submit"
          >
            Connect with us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FundingFormSection;
