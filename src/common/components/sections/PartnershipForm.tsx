import { partnershipSchema } from "@common/schema/schema";
import { Type_Form } from "@common/types/Type_Form";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormTextField } from "@components/TextInput";
import { MyInputMask } from "@components/MyInputMask";
import { MOBILE_MASK } from "@common/constants/app.constant";
import { appService } from "@common/services/app.service";

const PartnershipFormSection = ({ section }: { section: Type_Form }) => {
  const { title } = section.fields;

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(partnershipSchema),
  });

  const onSubmit = async (event: any) => {

    const userEmailResponse = await appService.sendPartnership({
      toEmail: event.email,
      fromEmail: 'donotreply@selectquote.com',
      subject: 'Thank you for contacting SelectQuote',
      ...event
    })
    const businessEmailResponse = await appService.sendPartnership({
      toEmail: 'partnerships@selectquoteventures.com',
      fromEmail: 'donotreply@selectquoteventures.com',
      subject: 'SelectQuote Partnerships Inquiry',
      ...event
    })
    debugger
  }
  return (
    <div className="partnership-form">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
        <div className="partnership-form-dekstop">
          <div className="pt-5 pb-5">
            <RichTextRenderer text={title} />
            <div className="row">
              <div className="col">
                <label className="form-label">First Name *</label>
                <UseFormTextField placeholder="First Name" control={control} name='firstName' />
              </div>
              <div className="col">
                <label className="form-label">Last Name *</label>
                <UseFormTextField placeholder="Last Name" control={control} name='lastName' />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <label className="form-label">Company Name *</label>
                <UseFormTextField placeholder="Company Name" control={control} name='companyName' />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <label className="form-label">Your Title *</label>
                <UseFormTextField placeholder="Title" control={control} name='title' />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <label className="form-label">Email *</label>
                <UseFormTextField placeholder="Email" control={control} name='email' />
              </div>
              <div className="col">
                <label className="form-label">Phone Number *</label>
                <MyInputMask control={control} defaultValue={''} name="phoneNumber" mask={MOBILE_MASK} placeholder="Phone Number" />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <label>Additional Comments</label>
                <UseFormTextField placeholder="Additional Comments" control={control} type="textarea" name='comments' />
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
        </div>
        <div className="partnership-form-mobile">
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
              <button type="submit" className="action-btn btn-primary btn-border">
                Connect with us
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PartnershipFormSection;
