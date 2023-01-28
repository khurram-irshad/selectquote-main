import { Type_Form } from "@common/types/Type_Form";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormTextField } from "@components/TextInput";
import { MyInputMask } from "@components/MyInputMask";
import { MOBILE_MASK } from "@common/constants/app.constant";
import { appService } from "@common/services/app.service";
import { foundationSchema } from "@common/schema/schema";

const FundingFormSection = ({ section }: { section: Type_Form }) => {
  const { title } = section.fields;

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(foundationSchema),
  });

  const onSubmit = async (event: any) => {

    const userEmailResponse = await appService.sendFoundation({
      toEmail: event.email,
      fromEmail: 'donotreply@selectquote.com',
      subject: 'Thank you for contacting SelectQuote',
      ...event
    })
    const businessEmailResponse = await appService.sendFoundation({
      toEmail: 'sqcommunity@selectquote.com',
      fromEmail: 'donotreply@selectquote.com',
      subject: 'SelectQuote Partnerships Inquiry',
      ...event
    })
    debugger
  }

  return (
    <div className="pt-5 pb-5">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <RichTextRenderer text={title.fields.content} />
        <div className="row">
          <div className="col">
            <label className="form-label">First Name *</label>
            <UseFormTextField placeholder="" control={control} name='firstName' />
          </div>
          <div className="col">
            <label className="form-label">Last Name *</label>
            <UseFormTextField placeholder="" control={control} name='lastName' />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <label className="form-label">Email *</label>
            <UseFormTextField placeholder="" control={control} name='email' />
          </div>
          <div className="col">
            <label className="form-label">Phone Number *</label>
            <UseFormTextField placeholder="" control={control} name='phoneNumber' />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <label className="form-label">Organization Name *</label>
            <UseFormTextField placeholder="" control={control} name='organizationName' />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <label className="form-label">Organization Website *</label>
            <UseFormTextField placeholder="" control={control} name='organizationWesbsite' />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <label className="form-label">Organization Address *</label>
            <UseFormTextField placeholder="" control={control} name='organizationAddress' />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <label className="form-label">Organization Mission Statement *</label>
            <UseFormTextField placeholder="" control={control} name='organizationStatement' />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <label className="form-label">
              Please provide an overview of your organization, including history,
              current programs and activities, and any accomplishments from the
              last three years *
            </label>
            <UseFormTextField placeholder="" control={control} name='organizationOverview' />
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
          <UseFormTextField placeholder="" control={control} name='organizationDescription' />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <label className="form-label">
              Please specify the needs and/or program this grant will directly
              support. *
            </label>
            <UseFormTextField placeholder="" control={control} name='program' />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label className="form-label">
              Please list how much money you're requesting. *
            </label>
            <UseFormTextField placeholder="" control={control} name='amount' />
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
            <UseFormTextField placeholder="" control={control} name='IRS' />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label className="form-label">
              Please provide a third-party reference *
            </label>
            <UseFormTextField placeholder="" control={control} name='reference' />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label className="form-label">
              Please list your Board of Directors: *
            </label>
            <UseFormTextField placeholder="" control={control} name='boardOfDirector' />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label className="form-label">
              Please list name and title of any key staff involved with this
              project: *
            </label>
            <UseFormTextField placeholder="" control={control} name='staffInvolved' />
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
          <button type="submit" className="action-btn btn-border"  style={{ color: "#ffffff", backgroundColor: "#F47B20" }}> 
                Connect with us
              </button>
           
          </div>
        </div>
      </form>
    </div>
  );
};

export default FundingFormSection;
