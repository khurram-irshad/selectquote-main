import { partnershipSchema } from "@common/schema/schema";
import { Type_Form } from "@common/types/Type_Form";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UseFormTextField } from "@components/TextInput";
import { MyInputMask } from "@components/MyInputMask";
import { MOBILE_MASK } from "@common/constants/app.constant";
import { appService } from "@common/services/app.service";
import {
  buildBusinessTemplate,
  buildUserTemplate,
} from "@common/templates/partnership";
import { FileUploader } from "react-drag-drop-files";

const PartnershipFormSection = ({ section }: { section: Type_Form }) => {
  const [isEmailSentFund, setIsEmailSentFund] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const { title } = section.fields;

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(partnershipSchema),
  });
  const fileTypes = ["PNG", "JFIF", "JPEG", "PJP", "JPG", "PPT", "PPTX", "PDF", "JPE", "POT", "PPS"];
  const [uploadedFileName, setUploadedFileName] = useState<any>(null);

  const onSubmit = async (event: any) => {
    try {
      const userEmailResponse = await appService.sendPartnership({
        toEmail: event.email,
        fromEmail: "donotreply@selectquote.com",
        subject: "Thank you for contacting SelectQuote",
        body: buildUserTemplate(event),
        attachment: imagePath,
        ...event,
      });

      const businessEmailResponse = await appService.sendPartnership({
        toEmail: "partnerships@selectquoteventures.com",
        fromEmail: "donotreply@selectquoteventures.com",
        subject: "SelectQuote Partnerships Inquiry",
        attachment: imagePath,
        body: buildBusinessTemplate(event),
        ...event,
      });
      if (
        userEmailResponse.status === 200 &&
        businessEmailResponse.status === 200
      ) {
        setIsEmailSentFund(true);
      }
      await appService.deleteImg(imagePath);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadFile = async (e) => {
    const uploadedFile = e[0];
    if (uploadedFile.size <= 1500000) {
      setFile(uploadedFile);
    } else {
      alert("File size must be less than 1.5 MB");
      return;
    }
    const fileName = uploadedFile?.name;
    // Set the name of the uploaded file in state
    setUploadedFileName(fileName);
    setIsUploading(true);
    try {
      const formData = new FormData();
      if (imagePath.length) {
        await appService.deleteImg(imagePath);
        setImagePath("");
      }
      formData.append("img", e[0]);
      const {
        data: { filepath },
      } = await appService.uploadImg(formData);
      setImagePath(filepath);
    } catch (err) {
      console.log(err);
    }
    setIsUploading(false);
  };
  return (
    <div className="partnership-form">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="partnership-form-dekstop">
          <div>
            <RichTextRenderer text={title} />
            {isEmailSentFund ? (
              <p style={{ color: "#646464" }}>
                Thank you for sahring you interest in partnering with
                SelectQuote. A member of our team will be in touch shortly.
              </p>
            ) : (
              <div className="container">
                <div className="row mb-4">
                  <div className="col">
                    <label className="form-label">First Name *</label>
                    <UseFormTextField control={control} name="firstName"  width="100%"/>
                  </div>
                  <div className="col">
                    <label className="form-label">Last Name *</label>
                    <UseFormTextField control={control} name="lastName" width="100%" />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="form-label">Company Name *</label>
                    <UseFormTextField control={control} name="companyName" width="100%"/>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <label className="form-label">Your Title *</label>
                    <UseFormTextField control={control} name="title" width="100%"/>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <label className="form-label">Email *</label>
                    <UseFormTextField control={control} name="email" width="100%"/>
                  </div>
                  <div className="col">
                    <label className="form-label" >Phone Number *</label>
                    <MyInputMask
                      control={control}
                      defaultValue={""}
                      name="phoneNumber"
                      mask={MOBILE_MASK}
                      
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <label>Additional Comments</label>
                    <UseFormTextField
                      control={control}
                      type="textarea"
                      name="comments"
                      width="100%"
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <label>Add Attachments</label>
                    <div id="fileupload">
                      <FileUploader handleChange={uploadFile} name="file" types={fileTypes} multiple= "false" 
                      label={`Drop a file here or click to upload\nMaximum upload size: 1.5MB`} maxSize={1500000} style={{ whiteSpace: 'pre-line' }}/>
                      {uploadedFileName && <p>{uploadedFileName}</p>}
                    </div>
                    </div>
                  </div>
                <div className="mt-4 button-container">
                  <button
                    className="action-btn btn-border"
                    type="submit"
                    style={{
                      color: "#ffff",
                      backgroundColor: "rgb(244, 123, 32)",
                    }}
                    disabled={isUploading}
                  >
                    Connect with us
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="partnership-form-mobile">
          <div className="pb-5">
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
              <div className="col mt-4">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  id="lastname"
                  className="form-control"
                  aria-label="Last name"
                />
              </div>
            </div>

            <div className="row">
              <div className="col mt-3">
                <label className="form-label">Company Name *</label>
                <input
                  type="text"
                  id="company"
                  className="form-control"
                  aria-label="Company name"
                />
              </div>
            </div>
            <div className="row mt-2">
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
                <div id="fileupload">
                  <FileUploader handleChange={uploadFile} name="file" types={fileTypes} multiple= "false" 
                      label={`Drop a file here or click to upload\nMaximum upload size: 1.5MB`} maxSize={1500000} style={{ whiteSpace: 'pre-line' }}/>
                      {uploadedFileName && <p>{uploadedFileName}</p>}
                </div>
              </div>
            </div>
            <div className="mt-4 button-container">
                  <button
                    className="action-btn btn-border"
                    type="submit"
                    style={{
                      color: "#ffff",
                      backgroundColor: "rgb(244, 123, 32)",
                    }}
                    disabled={isUploading}
                  >
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
